'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function uploadMedia(formData: FormData) {
  const file = formData.get('file') as File;
  const bucket = formData.get('bucket') as string || 'images';
  const folder = formData.get('folder') as string || 'general';

  if (!file || !(file instanceof File)) {
    return { error: 'No file provided' };
  }

  const supabase = await createClient();
  
  // Validate Admin
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized' };
  
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (profile?.role !== 'admin') return { error: 'Forbidden' };

  const fileExt = file.name.split('.').pop();
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

  // Upload file
  const { error, data } = await supabase.storage
    .from(bucket)
    .upload(fileName, file, { 
      upsert: false,
      contentType: file.type
    });

  if (error) {
    console.error("Storage upload error:", error);
    return { error: error.message };
  }

  const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(data.path);
  
  revalidatePath('/admin/media');
  return { success: true, url: publicUrlData.publicUrl, path: data.path };
}

export async function deleteMedia(bucket: string, path: string) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized' };
  
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (profile?.role !== 'admin') return { error: 'Forbidden' };

  const { error } = await supabase.storage.from(bucket).remove([path]);
  
  if (error) return { error: error.message };
  
  revalidatePath('/admin/media');
  return { success: true };
}

export async function listMedia(bucket: string = 'images', folder: string = '') {
  const supabase = await createClient();
  const { data, error } = await supabase.storage.from(bucket).list(folder, {
    limit: 100,
    offset: 0,
    sortBy: { column: 'created_at', order: 'desc' },
  });

  if (error) {
    console.error("Storage list error:", error);
    return { error: error.message, data: [] };
  }
  
  // Transform to include public URLs
  const files = data.filter(f => f.name !== '.emptyFolderPlaceholder').map(f => {
    const filePath = folder ? `${folder}/${f.name}` : f.name;
    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(filePath);
    return {
      name: f.name,
      id: f.id,
      created_at: f.created_at,
      metadata: f.metadata,
      path: filePath,
      url: urlData.publicUrl
    };
  });

  return { success: true, data: files };
}

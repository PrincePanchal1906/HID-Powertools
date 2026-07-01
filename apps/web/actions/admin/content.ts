'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getSiteContent(key: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('site_content')
    .select('content')
    .eq('section_key', key)
    .single()
    
  if (error) {
    console.error(`Error fetching site_content for ${key}:`, error)
    return null
  }
  
  return data.content
}

export async function updateSiteContent(key: string, content: any) {
  const supabase = await createClient()
  
  const userRes = await supabase.auth.getUser()
  const user = userRes.data?.user
  if (!user) return { error: 'Unauthorized' }
  
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') return { error: 'Forbidden' }

  const { error } = await supabase
    .from('site_content')
    .upsert({ 
      section_key: key, 
      content,
      updated_at: new Date().toISOString()
    }, { onConflict: 'section_key' })
    
  if (error) return { error: error.message }
  
  revalidatePath('/')
  revalidatePath('/admin/settings')
  return { success: true }
}

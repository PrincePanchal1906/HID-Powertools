'use server'

import { createClient } from '@/lib/supabase/server'
import { categorySchema } from '@/lib/validations/catalog'
import { revalidatePath } from 'next/cache'

export async function createCategory(_prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData.entries())
  const parsed = categorySchema.safeParse({
    ...data,
    is_active: formData.get('is_active') === 'on' || formData.get('is_active') === 'true'
  })

  if (!parsed.success) {
    return { error: parsed.error?.issues?.[0]?.message || 'Validation error' }
  }

  const supabase = createClient()
  
  // Verify slug uniqueness
  const { data: existing } = await supabase.from('categories').select('id').eq('slug', parsed.data.slug).single()
  if (existing) return { error: 'Slug must be unique' }

  const { error } = await supabase.from('categories').insert(parsed.data)
  
  if (error) return { error: error.message }
  
  revalidatePath('/admin/categories')
  return { success: true }
}

export async function updateCategory(id: string, _prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData.entries())
  const parsed = categorySchema.safeParse({
    ...data,
    is_active: formData.get('is_active') === 'on' || formData.get('is_active') === 'true'
  })

  if (!parsed.success) {
    return { error: parsed.error?.issues?.[0]?.message || 'Validation error' }
  }

  const supabase = createClient()
  
  const { data: existing } = await supabase.from('categories').select('id').eq('slug', parsed.data.slug).neq('id', id).maybeSingle()
  if (existing) return { error: 'Slug must be unique' }

  const { error } = await supabase.from('categories').update(parsed.data).eq('id', id)
  
  if (error) return { error: error.message }
  
  revalidatePath('/admin/categories')
  revalidatePath(`/admin/categories/${id}`)
  return { success: true }
}

export async function deleteCategory(id: string) {
  const supabase = createClient()
  const { error } = await supabase.from('categories').update({ deleted_at: new Date().toISOString() }).eq('id', id)
  
  if (error) return { error: error.message }
  
  revalidatePath('/admin/categories')
  return { success: true }
}

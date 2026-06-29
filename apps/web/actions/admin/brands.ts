'use server'

import { createClient } from '@/lib/supabase/server'
import { brandSchema } from '@/lib/validations/catalog'
import { revalidatePath } from 'next/cache'

export async function createBrand(_prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData.entries())
  const parsed = brandSchema.safeParse({
    ...data,
    is_active: formData.get('is_active') === 'on' || formData.get('is_active') === 'true'
  })

  if (!parsed.success) {
    return { error: parsed.error?.issues?.[0]?.message || 'Validation error' }
  }

  const supabase = createClient()
  
  const { data: existing } = await supabase.from('brands').select('id').eq('slug', parsed.data.slug).single()
  if (existing) return { error: 'Slug must be unique' }

  const { error } = await supabase.from('brands').insert(parsed.data)
  
  if (error) return { error: error.message }
  
  revalidatePath('/admin/brands')
  return { success: true }
}

export async function updateBrand(id: string, _prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData.entries())
  const parsed = brandSchema.safeParse({
    ...data,
    is_active: formData.get('is_active') === 'on' || formData.get('is_active') === 'true'
  })

  if (!parsed.success) {
    return { error: parsed.error?.issues?.[0]?.message || 'Validation error' }
  }

  const supabase = createClient()
  
  const { data: existing } = await supabase.from('brands').select('id').eq('slug', parsed.data.slug).neq('id', id).maybeSingle()
  if (existing) return { error: 'Slug must be unique' }

  const { error } = await supabase.from('brands').update(parsed.data).eq('id', id)
  
  if (error) return { error: error.message }
  
  revalidatePath('/admin/brands')
  revalidatePath(`/admin/brands/${id}`)
  return { success: true }
}

export async function deleteBrand(id: string) {
  const supabase = createClient()
  const { error } = await supabase.from('brands').update({ deleted_at: new Date().toISOString() }).eq('id', id)
  
  if (error) return { error: error.message }
  
  revalidatePath('/admin/brands')
  return { success: true }
}

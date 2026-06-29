'use server'

import { createClient } from '@/lib/supabase/server'
import { productSchema } from '@/lib/validations/catalog'
import { revalidatePath } from 'next/cache'

export async function createProduct(_prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData.entries())
  
  const parsed = productSchema.safeParse({
    ...data,
    price: data.price ? Number(data.price) : undefined,
    compare_price: data.compare_price ? Number(data.compare_price) : undefined,
    stock: data.stock ? Number(data.stock) : 0,
    gst_percentage: data.gst_percentage ? Number(data.gst_percentage) : 18,
    weight: data.weight ? Number(data.weight) : undefined,
    dimensions: data.dimensions_l && data.dimensions_w && data.dimensions_h ? {
      l: Number(data.dimensions_l),
      w: Number(data.dimensions_w),
      h: Number(data.dimensions_h)
    } : undefined,
    is_featured: formData.get('is_featured') === 'on' || formData.get('is_featured') === 'true',
    is_new_arrival: formData.get('is_new_arrival') === 'on' || formData.get('is_new_arrival') === 'true',
    is_bestseller: formData.get('is_bestseller') === 'on' || formData.get('is_bestseller') === 'true',
    show_on_homepage: formData.get('show_on_homepage') === 'on' || formData.get('show_on_homepage') === 'true',
    homepage_order: formData.get('homepage_order') ? Number(formData.get('homepage_order')) : 0,
    category_id: data.category_id === '' ? null : data.category_id,
    brand_id: null,
    specifications: data.specifications ? JSON.parse(data.specifications as string) : undefined,
  })

  if (!parsed.success) {
    return { error: parsed.error?.issues?.[0]?.message || 'Validation error' }
  }

  const supabase = createClient()
  
  const { data: existing } = await supabase.from('products').select('id').eq('slug', parsed.data.slug).maybeSingle()
  if (existing) return { error: 'Slug must be unique' }
  
  if (parsed.data.sku) {
    const { data: existingSku } = await supabase.from('products').select('id').eq('sku', parsed.data.sku).maybeSingle()
    if (existingSku) return { error: 'SKU must be unique' }
  }

  const { data: defaultBrand } = await supabase.from('brands').select('id').eq('slug', 'hid').single()
  const brandId = defaultBrand?.id || null

  const { error, data: created } = await supabase.from('products').insert({
    ...parsed.data,
    brand_id: brandId
  }).select('id').single()
  
  if (error) return { error: error.message }
  
  // Handle Gallery Images
  const galleryRaw = formData.get('gallery_images')
  if (galleryRaw) {
    try {
      const urls: string[] = JSON.parse(galleryRaw as string)
      if (urls.length > 0) {
        const imageInserts = urls.map((url, i) => ({
          product_id: created.id,
          image_url: url,
          display_order: i
        }))
        await supabase.from('product_images').insert(imageInserts)
      }
    } catch(e) {
      console.error("Failed to parse gallery images", e)
    }
  }
  
  revalidatePath('/admin/products')
  return { success: true, id: created.id }
}

export async function updateProduct(id: string, _prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData.entries())
  
  const parsed = productSchema.safeParse({
    ...data,
    price: data.price ? Number(data.price) : undefined,
    compare_price: data.compare_price ? Number(data.compare_price) : undefined,
    stock: data.stock ? Number(data.stock) : 0,
    gst_percentage: data.gst_percentage ? Number(data.gst_percentage) : 18,
    weight: data.weight ? Number(data.weight) : undefined,
    dimensions: data.dimensions_l && data.dimensions_w && data.dimensions_h ? {
      l: Number(data.dimensions_l),
      w: Number(data.dimensions_w),
      h: Number(data.dimensions_h)
    } : undefined,
    is_featured: formData.get('is_featured') === 'on' || formData.get('is_featured') === 'true',
    is_new_arrival: formData.get('is_new_arrival') === 'on' || formData.get('is_new_arrival') === 'true',
    is_bestseller: formData.get('is_bestseller') === 'on' || formData.get('is_bestseller') === 'true',
    show_on_homepage: formData.get('show_on_homepage') === 'on' || formData.get('show_on_homepage') === 'true',
    homepage_order: formData.get('homepage_order') ? Number(formData.get('homepage_order')) : 0,
    category_id: data.category_id === '' ? null : data.category_id,
    brand_id: null,
    specifications: data.specifications ? JSON.parse(data.specifications as string) : undefined,
  })

  if (!parsed.success) {
    return { error: parsed.error?.issues?.[0]?.message || 'Validation error' }
  }

  const supabase = createClient()
  
  const { data: existing } = await supabase.from('products').select('id').eq('slug', parsed.data.slug).neq('id', id).maybeSingle()
  if (existing) return { error: 'Slug must be unique' }

  if (parsed.data.sku) {
    const { data: existingSku } = await supabase.from('products').select('id').eq('sku', parsed.data.sku).neq('id', id).maybeSingle()
    if (existingSku) return { error: 'SKU must be unique' }
  }

  const { data: defaultBrand } = await supabase.from('brands').select('id').eq('slug', 'hid').single()
  const brandId = defaultBrand?.id || null

  const { error } = await supabase.from('products').update({
    ...parsed.data,
    brand_id: brandId
  }).eq('id', id)
  
  if (error) return { error: error.message }
  
  // Handle Gallery Images: delete existing and insert new
  const galleryRaw = formData.get('gallery_images')
  if (galleryRaw) {
    try {
      const urls: string[] = JSON.parse(galleryRaw as string)
      await supabase.from('product_images').delete().eq('product_id', id)
      
      if (urls.length > 0) {
        const imageInserts = urls.map((url, i) => ({
          product_id: id,
          image_url: url,
          display_order: i
        }))
        await supabase.from('product_images').insert(imageInserts)
      }
    } catch(e) {
      console.error("Failed to parse gallery images", e)
    }
  }
  
  revalidatePath('/admin/products')
  revalidatePath(`/admin/products/${id}`)
  return { success: true }
}

export async function deleteProduct(id: string) {
  const supabase = createClient()
  const { error } = await supabase.from('products').update({ deleted_at: new Date().toISOString() }).eq('id', id)
  
  if (error) return { error: error.message }
  
  revalidatePath('/admin/products')
  return { success: true }
}

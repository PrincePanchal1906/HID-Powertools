'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getListProducts(sectionKey: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('homepage_product_sections')
    .select(`
      id,
      product_id,
      display_order,
      products (
        id,
        name,
        slug,
        short_description,
        thumbnail_url,
        status,
        price,
        compare_price,
        category:categories ( name )
      )
    `)
    .eq('section_key', sectionKey)
    .order('display_order', { ascending: true })

  if (error) {
    console.error(`Failed to fetch products for section ${sectionKey}:`, error)
    return []
  }

  return data
}

export async function addProductToList(sectionKey: string, product_id: string) {
  const supabase = await createClient()
  
  // Get max display_order to put at the end
  const { data: existing } = await supabase
    .from('homepage_product_sections')
    .select('display_order')
    .eq('section_key', sectionKey)
    .order('display_order', { ascending: false })
    .limit(1)
    
  const nextOrder = existing && existing.length > 0 && existing[0] ? (existing[0].display_order || 0) + 1 : 0;

  const { error } = await supabase
    .from('homepage_product_sections')
    .insert({
      section_key: sectionKey,
      product_id,
      display_order: nextOrder
    })

  if (error) {
    if (error.code === '23505') { // unique violation
      return { error: 'Product is already in this section' }
    }
    return { error: error.message }
  }

  revalidatePath('/')
  return { success: true }
}

export async function removeProductFromList(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('homepage_product_sections').delete().eq('id', id)
  
  if (error) return { error: error.message }
  
  revalidatePath('/')
  return { success: true }
}

export async function moveListProductOrder(sectionKey: string, id: string, direction: 'up' | 'down') {
  const supabase = await createClient()
  
  // Get all items ordered for this section
  const { data: items } = await supabase
    .from('homepage_product_sections')
    .select('id, display_order')
    .eq('section_key', sectionKey)
    .order('display_order', { ascending: true })
    
  if (!items || items.length < 2) return { success: true }
  
  const currentIndex = items.findIndex(i => i.id === id)
  if (currentIndex === -1) return { error: 'Item not found' }
  
  if (direction === 'up' && currentIndex === 0) return { success: true }
  if (direction === 'down' && currentIndex === items.length - 1) return { success: true }
  
  const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
  const currentItem = items[currentIndex]
  const targetItem = items[targetIndex]
  
  if (!currentItem || !targetItem) return { error: 'Item not found' }

  // Swap display_order
  const tempOrder = currentItem.display_order
  const newTargetOrder = tempOrder
  const newCurrentOrder = targetItem.display_order
  
  // Update both
  await Promise.all([
    supabase.from('homepage_product_sections').update({ display_order: newCurrentOrder }).eq('id', currentItem.id),
    supabase.from('homepage_product_sections').update({ display_order: newTargetOrder }).eq('id', targetItem.id)
  ])
  
  revalidatePath('/')
  return { success: true }
}

export async function getAllProducts() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select('id, name, thumbnail_url, price')
    .eq('status', 'published')
    .order('name', { ascending: true })
    
  if (error) {
    console.error('Failed to fetch products:', error)
    return []
  }
  return data
}

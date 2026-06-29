import { createClient } from '../supabase/server'
import type { Product } from '../../types/catalog'

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = createClient()
  
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories(id, name, slug),
        images:product_images(id, image_url, alt_text, display_order),
        documents:product_documents(id, title, document_type, file_url),
        variants:product_variants(id, name, sku, price, stock, attributes)
      `)
      .eq('status', 'published')
      .eq('slug', slug)
      .maybeSingle()

    if (error) {
      console.error('Database error in getProductBySlug:', error)
      return null
    }

    if (!data) return null

    // Format output
    const formattedData = {
      ...data,
      category: data.categories ? { id: data.categories.id, name: data.categories.name, slug: data.categories.slug } : undefined,
      images: data.images?.sort((a: any, b: any) => a.display_order - b.display_order) || []
    }

    return formattedData as unknown as Product
  } catch (err) {
    console.error('Unexpected error in getProductBySlug:', err)
    return null
  }
}

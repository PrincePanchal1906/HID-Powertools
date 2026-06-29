import { createClient } from '../supabase/server'
import type { Product } from '../../types/catalog'

export interface GetProductsParams {
  q?: string;
  category?: string;
  sort?: string; // 'newest' | 'price_asc' | 'price_desc' | 'az' | 'za' | 'featured' | 'bestselling'
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestseller?: boolean;
  limit?: number;
}

export async function getProducts(params?: GetProductsParams): Promise<Product[]> {
  const supabase = createClient()
  
  try {
    const selectFields = params?.category
      ? `
        id, name, slug, sku, short_description, price, compare_price, stock, status, 
        is_featured, is_new_arrival, is_bestseller, thumbnail_url, created_at, show_on_homepage, homepage_order,
        categories!inner(id, name, slug)
      `
      : `
        id, name, slug, sku, short_description, price, compare_price, stock, status, 
        is_featured, is_new_arrival, is_bestseller, thumbnail_url, created_at, show_on_homepage, homepage_order,
        categories(id, name, slug)
      `;

    let query = supabase
      .from('products')
      .select(selectFields)
      .eq('status', 'published')

    // Search by Name or SKU
    if (params?.q) {
      // Supabase text search or ilike
      query = query.or(`name.ilike.%${params.q}%,sku.ilike.%${params.q}%`)
    }

    // Filters
    if (params?.category) {
      query = query.eq('categories.slug', params.category)
    }
    if (params?.minPrice !== undefined) {
      query = query.gte('price', params.minPrice)
    }
    if (params?.maxPrice !== undefined) {
      query = query.lte('price', params.maxPrice)
    }
    if (params?.inStock) {
      query = query.gt('stock', 0)
    }
    if (params?.isFeatured) {
      query = query.eq('is_featured', true)
    }
    if (params?.isNewArrival) {
      query = query.eq('is_new_arrival', true)
    }
    if (params?.isBestseller) {
      query = query.eq('is_bestseller', true)
    }

    // Sorting
    switch (params?.sort) {
      case 'price_asc':
        query = query.order('price', { ascending: true })
        break
      case 'price_desc':
        query = query.order('price', { ascending: false })
        break
      case 'az':
        query = query.order('name', { ascending: true })
        break
      case 'za':
        query = query.order('name', { ascending: false })
        break
      case 'featured':
        query = query.order('is_featured', { ascending: false }).order('created_at', { ascending: false })
        break
      case 'bestselling':
        query = query.order('is_bestseller', { ascending: false }).order('created_at', { ascending: false })
        break
      case 'newest':
      default:
        query = query.order('created_at', { ascending: false })
        break
    }

    if (params?.limit) {
      query = query.limit(params.limit)
    }

    const { data, error } = await query

    if (error) {
      console.error('Database error in getProducts:', error)
      return []
    }

    // Map categories output to match Product type
    const formattedData = data.map((item: any) => ({
      ...item,
      category: item.categories ? { id: item.categories.id, name: item.categories.name, slug: item.categories.slug } : undefined
    }))

    return formattedData as unknown as Product[]
  } catch (err) {
    console.error('Unexpected error in getProducts:', err)
    return []
  }
}

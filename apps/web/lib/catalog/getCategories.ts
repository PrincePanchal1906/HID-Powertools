import { createClient } from '../supabase/server'
import type { Category } from '../../types/catalog'

export async function getCategories(): Promise<Category[]> {
  const supabase = createClient()
  
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('id, name, slug')
      .order('name', { ascending: true })

    if (error) {
      console.error('Database error in getCategories:', error)
      return []
    }

    return data as Category[]
  } catch (err) {
    console.error('Unexpected error in getCategories:', err)
    return []
  }
}

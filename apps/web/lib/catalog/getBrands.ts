import { createClient } from '../supabase/server'
import type { Brand } from '../../types/catalog'

export async function getBrands(): Promise<Brand[]> {
  const supabase = createClient()
  
  try {
    const { data, error } = await supabase
      .from('brands')
      .select('id, name, slug')
      .order('name', { ascending: true })

    if (error) {
      console.error('Database error in getBrands:', error)
      return []
    }

    return data as Brand[]
  } catch (err) {
    console.error('Unexpected error in getBrands:', err)
    return []
  }
}

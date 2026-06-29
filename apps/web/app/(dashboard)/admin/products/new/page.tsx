import { createClient } from '@/lib/supabase/server'
import { ProductForm } from '@/components/admin/ProductForm'

export default async function NewProductPage() {
  const supabase = createClient()
  const { data: categories } = await supabase.from('categories').select('*').is('deleted_at', null).eq('is_active', true)


  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Create Product</h1>
      <ProductForm categories={categories || []} />
    </div>
  )
}

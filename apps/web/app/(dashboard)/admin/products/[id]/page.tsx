import { createClient } from '@/lib/supabase/server'
import { ProductForm } from '@/components/admin/ProductForm'
import { notFound } from 'next/navigation'

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const supabase = createClient()
  
  const [productRes, categoriesRes] = await Promise.all([
    supabase.from('products').select('*').eq('id', params.id).single(),
    supabase.from('categories').select('*').is('deleted_at', null).eq('is_active', true)
  ])

  if (!productRes.data) return notFound()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
      <ProductForm 
        product={productRes.data} 
        categories={categoriesRes.data || []} 
      />
    </div>
  )
}

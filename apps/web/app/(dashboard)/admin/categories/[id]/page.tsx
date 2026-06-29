import { createClient } from '@/lib/supabase/server'
import { CategoryForm } from '@/components/admin/CategoryForm'
import { notFound } from 'next/navigation'

export default async function EditCategoryPage({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: category } = await supabase.from('categories').select('*').eq('id', params.id).single()

  if (!category) return notFound()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Edit Category</h1>
      <CategoryForm category={category} />
    </div>
  )
}

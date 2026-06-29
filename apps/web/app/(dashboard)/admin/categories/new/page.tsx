
import { CategoryForm } from '@/components/admin/CategoryForm'

export default async function NewCategoryPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Create Category</h1>
      <CategoryForm />
    </div>
  )
}

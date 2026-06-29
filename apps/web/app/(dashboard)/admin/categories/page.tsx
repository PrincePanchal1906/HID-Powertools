import { createClient } from '@/lib/supabase/server'
import { DataTable } from '@/components/ui/DataTable'
import Link from 'next/link'
import { Plus, Edit } from 'lucide-react'

export default async function CategoriesPage() {
  const supabase = createClient()
  const { data: categories } = await supabase.from('categories').select('*').is('deleted_at', null).order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
        <Link 
          href="/admin/categories/new" 
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          New Category
        </Link>
      </div>

      <DataTable 
        data={categories || []}
        keyExtractor={(item) => item.id}
        columns={[
          { key: 'name', title: 'Name' },
          { key: 'slug', title: 'Slug' },
          { 
            key: 'is_active', 
            title: 'Status',
            render: (cat) => (
              <span className={`px-2 py-1 text-xs rounded-full font-medium ${cat.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                {cat.is_active ? 'Active' : 'Inactive'}
              </span>
            )
          },
          {
            key: 'actions',
            title: 'Actions',
            render: (cat) => (
              <Link href={`/admin/categories/${cat.id}`} className="text-blue-600 hover:text-blue-800">
                <Edit size={18} />
              </Link>
            )
          }
        ]}
      />
    </div>
  )
}

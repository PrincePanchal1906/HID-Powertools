import { createClient } from '@/lib/supabase/server'
import { DataTable } from '@/components/ui/DataTable'
import Link from 'next/link'
import { Plus, Edit } from 'lucide-react'
import Image from 'next/image'

export default async function ProductsPage() {
  const supabase = createClient()
  const { data: products } = await supabase
    .from('products')
    .select('*, category:categories(name)')
    .is('deleted_at', null)
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <Link 
          href="/admin/products/new" 
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          New Product
        </Link>
      </div>

      <DataTable 
        data={products || []}
        keyExtractor={(item) => item.id}
        columns={[
          {
            key: 'image',
            title: 'Image',
            render: (prod) => (
              <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden relative">
                {prod.thumbnail_url ? (
                  <Image src={prod.thumbnail_url} alt={prod.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No img</div>
                )}
              </div>
            )
          },
          { key: 'name', title: 'Name' },
          { 
            key: 'category', 
            title: 'Category',
            render: (prod) => <span className="text-gray-600">{prod.category?.name || '-'}</span>
          },

          { 
            key: 'price', 
            title: 'Price',
            render: (prod) => <span className="font-medium">${Number(prod.price).toFixed(2)}</span>
          },
          { 
            key: 'stock', 
            title: 'Stock',
            render: (prod) => (
              <span className={`px-2 py-1 text-xs rounded-full font-medium ${prod.stock > 10 ? 'bg-green-100 text-green-700' : prod.stock > 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                {prod.stock} in stock
              </span>
            )
          },
          { 
            key: 'status', 
            title: 'Status',
            render: (prod) => (
              <span className={`px-2 py-1 text-xs rounded-full font-medium ${prod.status === 'published' ? 'bg-blue-100 text-blue-700' : prod.status === 'archived' ? 'bg-gray-100 text-gray-700' : 'bg-orange-100 text-orange-700'}`}>
                {prod.status}
              </span>
            )
          },
          {
            key: 'actions',
            title: 'Actions',
            render: (prod) => (
              <Link href={`/admin/products/${prod.id}`} className="text-blue-600 hover:text-blue-800">
                <Edit size={18} />
              </Link>
            )
          }
        ]}
      />
    </div>
  )
}

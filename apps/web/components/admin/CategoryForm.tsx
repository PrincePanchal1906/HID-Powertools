'use client'

import React from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { createCategory, updateCategory, deleteCategory } from '@/actions/admin/categories'
import { Category } from '@/types/catalog'
import { Loader2, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

function SubmitButton({ isEditing }: { isEditing: boolean }) {
  const { pending } = useFormStatus()
  return (
    <button 
      type="submit" 
      disabled={pending}
      className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
    >
      {pending && <Loader2 className="w-4 h-4 animate-spin" />}
      {isEditing ? 'Update Category' : 'Create Category'}
    </button>
  )
}

export function CategoryForm({ category }: { category?: Category }) {
  const isEditing = !!category
  const action = isEditing ? updateCategory.bind(null, category.id) : createCategory
  const [state, formAction] = useFormState(action, null)
  const router = useRouter()
  const [isDeleting, setIsDeleting] = React.useState(false)

  const handleDelete = async () => {
    if (!category || !window.confirm("Are you sure you want to delete this category?")) return;
    setIsDeleting(true)
    try {
      const res = await deleteCategory(category.id)
      if (res.error) throw new Error(res.error)
      router.push('/admin/categories')
    } catch (err) {
      console.error(err)
      setIsDeleting(false)
    }
  }

  return (
    <form action={formAction} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6 max-w-2xl">
      {state?.error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm">{state.error}</div>
      )}
      {state?.success && (
        <div className="p-4 bg-green-50 text-green-600 rounded-lg text-sm">
          Successfully {isEditing ? 'updated' : 'created'} category!
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">Name *</label>
          <input 
            id="name" name="name" type="text" required defaultValue={category?.name}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none"
          />
        </div>
        
        <div className="space-y-1">
          <label htmlFor="slug" className="text-sm font-medium text-gray-700">Slug *</label>
          <input 
            id="slug" name="slug" type="text" required defaultValue={category?.slug}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none"
          />
        </div>

        <div className="space-y-1 md:col-span-2">
          <label htmlFor="meta_title" className="text-sm font-medium text-gray-700">Meta Title</label>
          <input 
            id="meta_title" name="meta_title" type="text" defaultValue={category?.meta_title || ''}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none"
          />
        </div>

        <div className="space-y-1 md:col-span-2">
          <label htmlFor="meta_description" className="text-sm font-medium text-gray-700">Meta Description</label>
          <textarea 
            id="meta_description" name="meta_description" rows={3} defaultValue={category?.meta_description || ''}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none"
          />
        </div>

        <div className="flex items-center gap-3">
          <input 
            type="checkbox" id="is_active" name="is_active" 
            defaultChecked={category ? category.is_active : true}
            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
          />
          <label htmlFor="is_active" className="text-sm font-medium text-gray-700">Active</label>
        </div>
      </div>

      <div className="pt-4 border-t flex justify-between items-center">
        {isEditing ? (
          <button 
            type="button" 
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium text-sm disabled:opacity-50"
          >
            {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
            Delete Category
          </button>
        ) : <div />}
        <SubmitButton isEditing={isEditing} />
      </div>
    </form>
  )
}

'use client'

import React, { useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { createProduct, updateProduct } from '@/actions/admin/products'
import { Product, Category } from '@/types/catalog'
import { Loader2, Plus, Trash2 } from 'lucide-react'
import { MediaPicker } from '@/components/admin/media/MediaPicker'

function SubmitButton({ isEditing }: { isEditing: boolean }) {
  const { pending } = useFormStatus()
  return (
    <button 
      type="submit" 
      disabled={pending}
      className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
    >
      {pending && <Loader2 className="w-4 h-4 animate-spin" />}
      {isEditing ? 'Update Product' : 'Create Product'}
    </button>
  )
}

interface ProductFormProps {
  product?: Product
  categories: Category[]
}

export function ProductForm({ product, categories }: ProductFormProps) {
  const isEditing = !!product
  const action = isEditing ? updateProduct.bind(null, product.id) : createProduct
  const [state, formAction] = useFormState(action, null)
  
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(product?.thumbnail_url || null)
  
  // Gallery images support
  const initialGallery = product?.images?.sort((a, b) => a.display_order - b.display_order).map(i => i.image_url) || []
  const [galleryUrls, setGalleryUrls] = useState<string[]>(initialGallery)

  const handleAddGalleryImage = (url: string | null) => {
    if (url && !galleryUrls.includes(url)) {
      setGalleryUrls([...galleryUrls, url])
    }
  }
  const handleRemoveGalleryImage = (index: number) => {
    setGalleryUrls(galleryUrls.filter((_, i) => i !== index))
  }

  // Handle Specifications as key-value pairs
  const initialSpecs = product?.specifications 
    ? Object.entries(product.specifications).map(([key, value]) => ({ key, value }))
    : [{ key: '', value: '' }]
  const [specs, setSpecs] = useState(initialSpecs)

  const handleAddSpec = () => setSpecs([...specs, { key: '', value: '' }])
  const handleRemoveSpec = (index: number) => setSpecs(specs.filter((_, i) => i !== index))
  const handleUpdateSpec = (index: number, field: 'key' | 'value', val: string) => {
    const newSpecs = [...specs]
    if (newSpecs[index]) {
      newSpecs[index][field] = val
      setSpecs(newSpecs)
    }
  }

  // Convert array back to object for hidden input
  const specsObject = specs.reduce((acc, curr) => {
    if (curr.key.trim() && curr.value.trim()) acc[curr.key.trim()] = curr.value.trim()
    return acc
  }, {} as Record<string, string>)

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm">{state.error}</div>
      )}
      {state?.success && (
        <div className="p-4 bg-green-50 text-green-600 rounded-lg text-sm">
          Successfully {isEditing ? 'updated' : 'created'} product!
        </div>
      )}
      
      {/* Hidden inputs to submit complex data to server action */}
      <input type="hidden" name="thumbnail_url" value={thumbnailUrl || ''} />
      <input type="hidden" name="specifications" value={JSON.stringify(specsObject)} />
      <input type="hidden" name="gallery_images" value={JSON.stringify(galleryUrls)} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
            <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Basic Info</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1 md:col-span-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-700">Product Name *</label>
                <input 
                  id="name" name="name" type="text" required defaultValue={product?.name}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="slug" className="text-sm font-medium text-gray-700">Slug *</label>
                <input 
                  id="slug" name="slug" type="text" required defaultValue={product?.slug}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="sku" className="text-sm font-medium text-gray-700">SKU</label>
                <input 
                  id="sku" name="sku" type="text" defaultValue={product?.sku || ''}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="short_description" className="text-sm font-medium text-gray-700">Short Description</label>
              <textarea 
                id="short_description" name="short_description" rows={2} defaultValue={product?.short_description || ''}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none"
              />
            </div>
            
            <div className="space-y-1">
              <label htmlFor="full_description" className="text-sm font-medium text-gray-700">Full Description</label>
              <textarea 
                id="full_description" name="full_description" rows={6} defaultValue={product?.full_description || ''}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none font-mono text-sm"
                placeholder="Supports HTML"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
            <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Physical Specs & Warranty</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label htmlFor="weight" className="text-sm font-medium text-gray-700">Weight (kg)</label>
                <input 
                  id="weight" name="weight" type="number" step="0.01" defaultValue={product?.weight || ''}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="warranty" className="text-sm font-medium text-gray-700">Warranty</label>
                <input 
                  id="warranty" name="warranty" type="text" defaultValue={product?.warranty || ''}
                  placeholder="e.g. 2-Year Official"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Dimensions (L x W x H in cm)</label>
              <div className="grid grid-cols-3 gap-4">
                <input 
                  id="dimensions_l" name="dimensions_l" type="number" step="0.1" defaultValue={product?.dimensions?.l || ''} placeholder="Length"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none"
                />
                <input 
                  id="dimensions_w" name="dimensions_w" type="number" step="0.1" defaultValue={product?.dimensions?.w || ''} placeholder="Width"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none"
                />
                <input 
                  id="dimensions_h" name="dimensions_h" type="number" step="0.1" defaultValue={product?.dimensions?.h || ''} placeholder="Height"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4">
            <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Technical Specifications</h3>
            <div className="space-y-3">
              {specs.map((spec, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input 
                    type="text" 
                    placeholder="e.g. Power Output"
                    value={spec.key}
                    onChange={(e) => handleUpdateSpec(index, 'key', e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none text-sm"
                  />
                  <input 
                    type="text" 
                    placeholder="e.g. 2000W"
                    value={spec.value}
                    onChange={(e) => handleUpdateSpec(index, 'value', e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none text-sm"
                  />
                  <button 
                    type="button" 
                    onClick={() => handleRemoveSpec(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button 
                type="button"
                onClick={handleAddSpec}
                className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                <Plus className="w-4 h-4" /> Add Specification
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
            <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Pricing & Inventory</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1">
                <label htmlFor="price" className="text-sm font-medium text-gray-700">Price *</label>
                <input 
                  id="price" name="price" type="number" step="0.01" required defaultValue={product?.price}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="compare_price" className="text-sm font-medium text-gray-700">Compare Price</label>
                <input 
                  id="compare_price" name="compare_price" type="number" step="0.01" defaultValue={product?.compare_price || ''}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="stock" className="text-sm font-medium text-gray-700">Stock</label>
                <input 
                  id="stock" name="stock" type="number" required defaultValue={product?.stock || 0}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Organization & Settings */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
            <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Organization</h3>
            
            <div className="space-y-1">
              <label htmlFor="status" className="text-sm font-medium text-gray-700">Status</label>
              <select 
                id="status" name="status" defaultValue={product?.status || 'draft'}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none bg-white"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div className="space-y-1">
              <label htmlFor="category_id" className="text-sm font-medium text-gray-700">Category</label>
              <select 
                id="category_id" name="category_id" defaultValue={product?.category_id || ''}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none bg-white"
              >
                <option value="">Select Category</option>
                {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
              </select>
            </div>


          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
            <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Thumbnail</h3>
            <MediaPicker value={thumbnailUrl} onChange={setThumbnailUrl} />
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
            <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Product Gallery</h3>
            <div className="grid grid-cols-3 gap-2">
              {galleryUrls.map((url, i) => (
                <div key={i} className="relative aspect-square border rounded-lg overflow-hidden group">
                  <img src={url} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
                  <button 
                    type="button" 
                    onClick={() => handleRemoveGalleryImage(i)}
                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded shadow opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
              <div className="aspect-square">
                <MediaPicker value={null} onChange={handleAddGalleryImage} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4">
            <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Homepage</h3>
            <div className="flex items-center gap-3">
              <input type="checkbox" id="show_on_homepage" name="show_on_homepage" defaultChecked={product?.show_on_homepage} className="w-4 h-4 text-blue-600 rounded" />
              <label htmlFor="show_on_homepage" className="text-sm font-medium text-gray-700">Show in Homepage Showcase</label>
            </div>
            <div className="space-y-1 mt-4">
              <label htmlFor="homepage_order" className="text-sm font-medium text-gray-700">Display Order (optional)</label>
              <input 
                id="homepage_order" name="homepage_order" type="number" defaultValue={product?.homepage_order || 0}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none bg-white"
                placeholder="e.g., 1"
              />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4">
            <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Tags</h3>
            <div className="flex items-center gap-3">
              <input type="checkbox" id="is_featured" name="is_featured" defaultChecked={product?.is_featured} className="w-4 h-4 text-blue-600 rounded" />
              <label htmlFor="is_featured" className="text-sm text-gray-700">Featured</label>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" id="is_new_arrival" name="is_new_arrival" defaultChecked={product?.is_new_arrival} className="w-4 h-4 text-blue-600 rounded" />
              <label htmlFor="is_new_arrival" className="text-sm text-gray-700">New Arrival</label>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" id="is_bestseller" name="is_bestseller" defaultChecked={product?.is_bestseller} className="w-4 h-4 text-blue-600 rounded" />
              <label htmlFor="is_bestseller" className="text-sm text-gray-700">Bestseller</label>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4">
            <h3 className="text-lg font-bold text-gray-900 border-b pb-2">SEO Search</h3>
            <div className="space-y-1">
              <label htmlFor="meta_title" className="text-sm font-medium text-gray-700">Meta Title</label>
              <input 
                id="meta_title" name="meta_title" type="text" defaultValue={product?.meta_title || ''}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none bg-white text-sm"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="meta_description" className="text-sm font-medium text-gray-700">Meta Description</label>
              <textarea 
                id="meta_description" name="meta_description" rows={3} defaultValue={product?.meta_description || ''}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none bg-white text-sm"
              />
            </div>
          </div>

        </div>
      </div>
      
      <div className="pt-6 flex justify-end">
        <SubmitButton isEditing={isEditing} />
      </div>
    </form>
  )
}

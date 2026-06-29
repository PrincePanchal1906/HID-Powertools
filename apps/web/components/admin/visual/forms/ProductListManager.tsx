'use client'

import React, { useState, useEffect } from 'react'
import { 
  getListProducts, 
  getAllProducts, 
  addProductToList, 
  removeProductFromList,
  moveListProductOrder
} from '@/actions/admin/productLists'
import { Loader2, Plus, Trash2, ArrowUp, ArrowDown, Search } from 'lucide-react'
import Image from 'next/image'

export interface ProductListManagerProps {
  sectionKey: string;
  title: string;
}

export function ProductListManager({ sectionKey, title }: ProductListManagerProps) {
  const [items, setItems] = useState<any[]>([])
  const [allProducts, setAllProducts] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setIsLoading(true)
    try {
      const [listData, productsData] = await Promise.all([
        getListProducts(sectionKey),
        getAllProducts()
      ])
      setItems(listData || [])
      setAllProducts(productsData || [])
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddProduct = async () => {
    if (!selectedProductId) return
    setIsProcessing(true)
    try {
      const res = await addProductToList(sectionKey, selectedProductId)
      if (res.error) {
        alert(res.error)
      } else {
        await loadData()
        setSelectedProductId('')
        setSearchQuery('')
      }
    } finally {
      setIsProcessing(false)
    }
  }

  const handleRemove = async (id: string) => {
    if (!window.confirm("Remove this product from the list?")) return
    setIsProcessing(true)
    await removeProductFromList(id)
    await loadData()
    setIsProcessing(false)
  }

  const handleMove = async (id: string, direction: 'up' | 'down') => {
    setIsProcessing(true)
    await moveListProductOrder(sectionKey, id, direction)
    await loadData()
    setIsProcessing(false)
  }


  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }

  // Filter out products that are already in the list
  const activeProductIds = new Set(items.map(i => i.product_id))
  const availableProducts = allProducts.filter(p => !activeProductIds.has(p.id))
  
  // Apply search
  const filteredProducts = availableProducts.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="p-6 flex flex-col h-full bg-gray-50/50">
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">{title}</h3>

      {/* Add New Product Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <h4 className="text-sm font-semibold text-gray-900 mb-4">Add Product</h4>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input 
              type="text"
              placeholder="Search products to add..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex-1 flex gap-4">
            <select
              className="flex-1 bg-gray-50 border border-gray-200 rounded-lg text-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
            >
              <option value="">Select a product...</option>
              {filteredProducts.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} - ${p.price}
                </option>
              ))}
            </select>
            <button
              onClick={handleAddProduct}
              disabled={!selectedProductId || isProcessing}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Current Products List */}
      <div className="flex-1 flex flex-col min-h-0 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
          <h4 className="text-sm font-semibold text-gray-900">Current Order</h4>
          <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded-md">{items.length} items</span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-gray-500 text-sm">No products in this section yet.</p>
              <p className="text-gray-400 text-xs mt-1">Search and add products above.</p>
            </div>
          ) : (
            items.map((item, idx) => (
              <div 
                key={item.id} 
                className="flex items-center gap-4 bg-white border border-gray-100 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden"
              >
                {/* Visual Order Number */}
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-xs font-bold text-gray-400 border border-gray-100 shrink-0">
                  {idx + 1}
                </div>

                {/* Thumbnail */}
                <div className="w-16 h-16 rounded-md bg-gray-50 overflow-hidden relative shrink-0 border border-gray-100">
                  {item.products?.thumbnail_url ? (
                    <Image 
                      src={item.products.thumbnail_url} 
                      alt={item.products?.name || ''} 
                      fill 
                      className="object-cover" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">No Img</div>
                  )}
                </div>
                
                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 text-sm truncate pr-4">{item.products?.name}</h4>
                  <div className="flex items-center gap-3 mt-1 text-xs">
                    <span className="text-gray-500">
                      ID: <span className="font-mono text-[10px] bg-gray-50 px-1 rounded">{item.products?.id.split('-')[0]}</span>
                    </span>
                    <span className={`px-2 py-0.5 rounded-full font-medium text-[10px] uppercase tracking-wider ${
                      item.products?.status === 'published' ? 'bg-green-100 text-green-700' : 
                      item.products?.status === 'draft' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {item.products?.status || 'Unknown'}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pr-2">
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => handleMove(item.id, 'up')}
                      disabled={idx === 0 || isProcessing}
                      className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400 transition-colors"
                      title="Move Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleMove(item.id, 'down')}
                      disabled={idx === items.length - 1 || isProcessing}
                      className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400 transition-colors"
                      title="Move Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="w-px h-8 bg-gray-100 mx-1"></div>
                  <button
                    onClick={() => handleRemove(item.id)}
                    disabled={isProcessing}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    title="Remove from List"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

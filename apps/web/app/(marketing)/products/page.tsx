import React from 'react'
import { Metadata } from 'next'
import { getProducts } from '@/lib/catalog/getProducts'
import { getCategories } from '@/lib/catalog/getCategories'
import ProductGrid from '@/components/products/ProductGrid'
import ProductFilters from '@/components/products/ProductFilters'
import ProductSort from '@/components/products/ProductSort'
import { SearchBar } from '@/components/products/SearchBar'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
// import removed
import { MobilePLPWrapper } from '@/components/products/MobilePLPWrapper'

export const metadata: Metadata = {
  title: 'All Products — HID PowerTools',
  description: 'Browse our complete catalog of industrial grade power tools, accessories, and replacement parts.',
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const q = typeof searchParams.q === 'string' ? searchParams.q : undefined
  const category = typeof searchParams.category === 'string' ? searchParams.category : undefined
  const sort = typeof searchParams.sort === 'string' ? searchParams.sort : 'newest'
  
  // Parse boolean filters
  const inStock = searchParams.inStock === 'true'
  const isFeatured = searchParams.isFeatured === 'true'
  const isNewArrival = searchParams.isNewArrival === 'true'
  const isBestseller = searchParams.isBestseller === 'true'

  // Parse price
  const minPrice = typeof searchParams.minPrice === 'string' ? parseInt(searchParams.minPrice, 10) : undefined
  const maxPrice = typeof searchParams.maxPrice === 'string' ? parseInt(searchParams.maxPrice, 10) : undefined

  const queryParams: any = { sort }
  if (q) queryParams.q = q
  if (category) queryParams.category = category
  if (minPrice !== undefined) queryParams.minPrice = minPrice
  if (maxPrice !== undefined) queryParams.maxPrice = maxPrice
  if (inStock) queryParams.inStock = true
  if (isFeatured) queryParams.isFeatured = true
  if (isNewArrival) queryParams.isNewArrival = true
  if (isBestseller) queryParams.isBestseller = true

  // Fetch data in parallel
  const [products, categories] = await Promise.all([
    getProducts(queryParams),
    getCategories()
  ])

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      
      {/* Mobile Sticky Header and Bottom Sheet Manager */}
      <MobilePLPWrapper 
        categories={categories}
        {...(category !== undefined ? { currentCategory: category } : {})}
        {...(q !== undefined ? { initialQuery: q } : {})}
        currentSort={sort}
        currentFilters={{ 
          inStock, 
          isFeatured, 
          isNewArrival, 
          isBestseller, 
          ...(minPrice !== undefined && { minPrice }),
          ...(maxPrice !== undefined && { maxPrice })
        }}
      />

      {/* Desktop Header Section (Hidden on Mobile) */}
      <div className="hidden lg:block bg-white border-b border-gray-100 py-8">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' }
          ]} />
          
          <div className="mt-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
                {category ? categories.find(c => c.slug === category)?.name || 'Products' : 'All Products'}
              </h1>
              <p className="text-gray-500 mt-2">
                Showing {products.length} result{products.length === 1 ? '' : 's'}
              </p>
            </div>
            
            <div className="w-full md:w-96">
              <SearchBar initialQuery={q || ""} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="container mx-auto max-w-7xl px-4 md:px-6 py-4 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block w-72 shrink-0">
            <ProductFilters 
              categories={categories} 
              currentCategory={category || ""}
              currentFilters={{ 
                inStock, 
                isFeatured, 
                isNewArrival, 
                isBestseller, 
                ...(minPrice !== undefined && { minPrice }),
                ...(maxPrice !== undefined && { maxPrice })
              }}
            />
          </div>

          {/* Main Grid Area */}
          <div className="flex-1 flex flex-col">
            
            {/* Desktop Toolbar (Hidden on Mobile) */}
            <div className="hidden lg:flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6">
              <div className="ml-auto flex items-center gap-3">
                <span className="text-sm font-medium text-gray-500 hidden sm:inline-block">Sort by:</span>
                <ProductSort currentSort={sort} />
              </div>
            </div>

            {/* Grid */}
            <ProductGrid products={products} />

          </div>
        </div>
      </div>
    </div>
  )
}

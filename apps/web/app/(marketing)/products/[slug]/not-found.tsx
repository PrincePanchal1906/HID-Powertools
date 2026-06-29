import React from 'react'
import Link from 'next/link'
import { PackageX } from 'lucide-react'

export default function ProductNotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center py-20 px-4 bg-[#f8f9fc]">
      <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-8 shadow-sm border border-gray-100">
        <PackageX className="w-12 h-12 text-[#D42B2B]" />
      </div>
      <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
        Product Not Found
      </h1>
      <p className="text-gray-500 text-center max-w-md mb-10 text-lg">
        The tool or accessory you're looking for doesn't exist or has been removed from our catalog.
      </p>
      <Link href="/products">
        <button className="bg-[#D42B2B] text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-red-500/20 hover:bg-[#b82323] hover:shadow-xl hover:-translate-y-0.5 transition-all">
          Browse All Products
        </button>
      </Link>
    </div>
  )
}

import React from 'react'
import Link from 'next/link'
import { getListProducts } from '@/actions/admin/productLists'
import { OffersCarousel } from './OffersCarousel'
import { ArrowRight } from 'lucide-react'
import dynamic from 'next/dynamic'

const AdminSectionWrapper = dynamic(() => import('../admin/visual/AdminSectionWrapper').then(m => m.AdminSectionWrapper), { ssr: false })

interface FeaturedProductsProps {
  isAdmin?: boolean;
}

export default async function FeaturedProducts({ isAdmin = false }: FeaturedProductsProps) {
  const listItems = await getListProducts('offers')
  
  if ((!listItems || !listItems.length) && !isAdmin) return null

  const displayProducts = listItems?.map((item: any) => ({
    ...item.products
  })) || [];

  const InnerSection = (
    <section className="w-full bg-white py-10 lg:py-20 lg:bg-[#f8f9fc] relative z-10 overflow-hidden border-b border-gray-100 lg:border-none">
      <div className="container mx-auto max-w-7xl relative z-10 px-4">
        
        {/* =========================================
            MOBILE ONLY (lg:hidden) - BEST SELLERS
        ========================================= */}
        <div className="lg:hidden w-full flex flex-col">
          <div className="flex flex-col mb-[24px] px-[16px]">
            <div className="flex items-center gap-[16px] mb-[8px]">
              <span className="text-[11px] font-black text-[#D42B2B] tracking-widest uppercase bg-red-50 px-[8px] py-[4px] rounded-[4px]">
                /// JOB-SITE TESTED
              </span>
            </div>
            <h2 className="text-[28px] font-black text-gray-900 tracking-tight uppercase font-['var(--font-barlow-condensed)']">
              PROVEN ARSENAL
            </h2>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory px-[16px] gap-[16px] pb-[40px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" style={{ WebkitOverflowScrolling: 'touch' }}>
            {displayProducts.map((product: any) => {
              const priceInr = product.price < 500 ? (product.price * 82).toLocaleString('en-IN') : product.price.toLocaleString('en-IN');
              return (
                <Link 
                  href={`/products/${product.slug}`} 
                  key={product.id} 
                  className="snap-start shrink-0 w-[85vw] flex items-center bg-[#f8f9fc] rounded-[4px] p-[16px] border border-gray-200 group hover:border-[#D42B2B] transition-colors"
                >
                  <div className="w-[100px] h-[100px] bg-white rounded-[4px] flex items-center justify-center shrink-0 border border-gray-100 p-2 relative">
                    <img 
                      src={product.thumbnail_url || "/images/hero-tool-light.png"}
                      alt={product.name}
                      className="w-full h-full object-contain mix-blend-multiply drop-shadow-sm group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="ml-[16px] flex-1 flex flex-col justify-center">
                    <h3 className="text-[16px] font-bold text-gray-900 leading-tight mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="font-black text-gray-900 text-[16px] mb-2">
                      ₹{priceInr}
                    </div>
                    <span className="text-[11px] font-bold text-[#D42B2B] uppercase tracking-wide">
                      Explore &rarr;
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* =========================================
            DESKTOP ONLY (hidden lg:block) - OFFERS
        ========================================= */}
        <div className="hidden lg:block">
          <div className="text-center mb-10">
            <h2 className="text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight uppercase font-['var(--font-barlow-condensed)']">
              <span className="text-[#D42B2B]">Offers</span> of the Week
            </h2>
          </div>
          <OffersCarousel products={displayProducts} />
        </div>
      </div>
    </section>
  );

  if (isAdmin) {
    return (
      <AdminSectionWrapper 
        drawerId="offers_manager" 
        buttonText="Manage Best Sellers"
        className="block"
      >
        {InnerSection}
      </AdminSectionWrapper>
    )
  }

  return InnerSection;
}

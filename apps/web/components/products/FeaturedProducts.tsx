import React from 'react'
import Link from 'next/link'
import { getListProducts } from '@/actions/admin/productLists'
// import removed
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
    <section className="w-full bg-white py-[64px] lg:py-[120px] relative z-10 overflow-hidden">
      <div className="w-full max-w-[1920px] mx-auto px-0 lg:px-[5%] xl:px-[8%]">
        
        {/* Section Header */}
        <div className="flex flex-col mb-[32px] lg:mb-[64px] px-[16px] lg:px-0 lg:items-center lg:text-center">
          <div className="flex items-center gap-[16px] mb-[12px] lg:mb-[16px]">
            <span className="text-[11px] lg:text-[13px] font-black text-[#D42B2B] tracking-widest uppercase border border-[#D42B2B]/20 bg-red-50 px-[12px] py-[6px] rounded-[4px]">
              /// THE HID STANDARD
            </span>
          </div>
          <h2 className="text-[32px] lg:text-[56px] font-black text-gray-900 tracking-tight uppercase font-['var(--font-barlow-condensed)'] leading-none">
            PROFESSIONAL PICKS
          </h2>
        </div>

        {/* =========================================
            MOBILE ONLY (lg:hidden) - SNAP SCROLL
        ========================================= */}
        <div className="lg:hidden w-full">
          <div className="flex overflow-x-auto snap-x snap-mandatory px-[16px] gap-[16px] pb-[40px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" style={{ WebkitOverflowScrolling: 'touch' }}>
            {displayProducts.slice(0, 8).map((product: any) => {
              const priceInr = product.price < 500 ? (product.price * 82).toLocaleString('en-IN') : product.price.toLocaleString('en-IN');
              return (
                <Link 
                  href={`/products/${product.slug}`} 
                  key={product.id} 
                  className="snap-start shrink-0 w-[85vw] flex flex-col bg-[#f4f5f7] rounded-[8px] overflow-hidden border border-gray-200"
                >
                  <div className="w-full aspect-[4/3] bg-white flex items-center justify-center p-8 relative border-b border-gray-100">
                    <img 
                      src={product.thumbnail_url || "/images/hero-tool-light.png"}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-contain mix-blend-normal"
                    />
                  </div>
                  <div className="p-[20px] flex flex-col">
                    <h3 className="text-[18px] font-black text-gray-900 leading-tight mb-[8px] line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="font-bold text-gray-600 text-[16px] mb-[24px]">
                      ₹{priceInr}
                    </div>
                    <div className="flex items-center text-[13px] font-black text-gray-900 uppercase tracking-widest border-t border-gray-200 pt-[16px]">
                      View Product <span className="ml-2 text-[#D42B2B]">→</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* =========================================
            DESKTOP ONLY (hidden lg:block) - GRID
        ========================================= */}
        <div className="hidden lg:block w-full">
          <div className="grid grid-cols-4 gap-[32px]">
            {displayProducts.slice(0, 4).map((product: any) => {
              const priceInr = product.price < 500 ? (product.price * 82).toLocaleString('en-IN') : product.price.toLocaleString('en-IN');
              return (
                <Link 
                  href={`/products/${product.slug}`} 
                  key={product.id} 
                  className="flex flex-col bg-white rounded-[8px] group transition-all"
                >
                  <div className="w-full aspect-[4/4] bg-[#f4f5f7] rounded-[8px] flex items-center justify-center mb-[24px] overflow-hidden p-8 relative border border-gray-100 group-hover:border-[#D42B2B]/50 transition-colors">
                    <img 
                      src={product.thumbnail_url || "/images/hero-tool-light.png"}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-contain mix-blend-normal group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  </div>
                  <h3 className="text-[20px] font-black text-gray-900 leading-tight mb-[12px] line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="font-bold text-gray-600 text-[18px] mb-[24px]">
                    ₹{priceInr}
                  </div>
                  <div className="flex items-center text-[14px] font-black text-gray-900 uppercase tracking-widest group-hover:text-[#D42B2B] transition-colors">
                    View Product <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </Link>
              );
            })}
          </div>
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

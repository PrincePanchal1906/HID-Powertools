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
    <section className="w-full bg-white py-[24px] lg:py-[120px] relative z-10 overflow-hidden">
      <div className="w-full max-w-[1920px] mx-auto px-0 lg:px-[5%] xl:px-[8%]">
        
        {/* Section Header (Desktop Only) */}
        <div className="hidden lg:flex flex-col mb-[16px] lg:mb-[64px] px-[16px] lg:px-0 lg:items-center lg:text-center">
          <div className="flex items-center gap-[16px] mb-[16px] lg:mb-[16px]">
            <span className="text-[12px] lg:text-[14px] font-black text-[#D42B2B] tracking-widest uppercase border border-[#D42B2B]/20 bg-red-50 px-[12px] py-[6px] rounded-[4px]">
              /// THE HID STANDARD
            </span>
          </div>
          <h2 className="text-[28px] lg:text-[56px] font-black text-gray-900 tracking-tight uppercase font-['var(--font-barlow-condensed)'] leading-none">
            PROFESSIONAL PICKS
          </h2>
        </div>

        {/* =========================================
            MOBILE ONLY (lg:hidden) - GRID
        ========================================= */}
        <div className="lg:hidden w-full px-[12px]">
          <div className="flex justify-between items-end mb-[16px]">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-[#D42B2B] tracking-widest uppercase bg-red-50 px-[8px] py-[4px] rounded-[4px] inline-block mb-[8px] border border-[#D42B2B]/20 w-fit">
                /// THE HID STANDARD
              </span>
              <h2 className="text-[24px] font-black text-gray-900 tracking-tight uppercase font-['var(--font-barlow-condensed)'] leading-none">
                PROFESSIONAL PICKS
              </h2>
            </div>
            <Link href="/products" className="text-[12px] font-bold text-gray-900 uppercase tracking-wider flex items-center mb-[2px]">
              VIEW ALL <span className="text-[#D42B2B] ml-1">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-[6px] bg-gray-50 p-[8px] rounded-[12px] border border-gray-100">
            {/* Pad the array so we always show 6 boxes for layout visualization */}
            {Array.from({ length: 6 }).map((_, index) => {
              const product = displayProducts[index % displayProducts.length] || displayProducts[0];
              if (!product) return null; // Fallback if absolutely no products
              
              const priceInr = product.price < 500 ? (product.price * 82).toLocaleString('en-IN') : product.price.toLocaleString('en-IN');
              
              // Split name to match screenshot style
              const nameParts = product.name.split(' ');
              const lastWord = nameParts.length > 1 ? nameParts.pop() : '';
              const firstPart = nameParts.join(' ');

              return (
                <Link 
                  href={`/products/${product.slug}`} 
                  key={`${product.id}-${index}`} 
                  className="flex flex-col bg-white rounded-[6px] overflow-hidden border border-gray-100 h-full relative shadow-sm"
                >
                  <div className="absolute top-[4px] right-[4px] bg-red-50 text-[#D42B2B] text-[7px] font-black px-[4px] py-[2px] rounded-[4px] z-10">
                    NEW
                  </div>
                  <div className="w-full aspect-square bg-white flex items-center justify-center p-2 relative">
                    <img 
                      src={product.thumbnail_url || "/images/hero-tool-light.png"}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-contain mix-blend-normal hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-[6px] flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="text-[10px] font-bold text-gray-900 leading-tight mb-[1px] line-clamp-1">
                        {firstPart || product.name}
                      </h3>
                      {firstPart && (
                        <div className="text-[10px] font-bold text-gray-900 mb-[4px] line-clamp-1">
                          {lastWord}
                        </div>
                      )}
                      <div className="font-medium text-gray-500 text-[9px] mb-[6px]">
                        ₹{priceInr}
                      </div>
                    </div>
                    <div className="flex items-center text-[9px] font-bold text-gray-900 uppercase tracking-wider mt-auto">
                      VIEW <span className="ml-[2px] text-[#D42B2B]">→</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          
          <div className="flex justify-center items-center gap-[6px] mt-[20px]">
            <div className="w-[6px] h-[6px] rounded-full bg-[#D42B2B]"></div>
            <div className="w-[6px] h-[6px] rounded-full bg-gray-200"></div>
            <div className="w-[6px] h-[6px] rounded-full bg-gray-200"></div>
            <div className="w-[6px] h-[6px] rounded-full bg-gray-200"></div>
            <div className="w-[6px] h-[6px] rounded-full bg-gray-200"></div>
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

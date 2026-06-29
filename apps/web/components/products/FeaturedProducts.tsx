import React from 'react'
import Link from 'next/link'
import { getListProducts } from '@/actions/admin/productLists'
import { OffersCarousel } from './OffersCarousel'
import { Gift, Tag, ShieldCheck, Truck, Headphones, ArrowRight } from 'lucide-react'
import dynamic from 'next/dynamic'

const AdminSectionWrapper = dynamic(() => import('../admin/visual/AdminSectionWrapper').then(m => m.AdminSectionWrapper), { ssr: false })

interface FeaturedProductsProps {
  isAdmin?: boolean;
}

export default async function FeaturedProducts({ isAdmin = false }: FeaturedProductsProps) {
  const listItems = await getListProducts('offers')
  
  // If no items and not an admin, hide it completely.
  if ((!listItems || !listItems.length) && !isAdmin) return null

  // Extract products and format them correctly
  const displayProducts = listItems?.map((item: any) => ({
    ...item.products
  })) || [];

  const InnerSection = (
    <section className="py-10 md:py-20 px-4 bg-[#f8f9fc] relative z-10 overflow-hidden">
      
      {/* Background Subtle Elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-white to-transparent pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-6 md:mb-10">
          <div className="flex items-center justify-center gap-2 text-[#D42B2B] text-[10px] md:text-xs font-bold tracking-widest uppercase mb-3 md:mb-4">
            <div className="w-8 md:w-12 h-[1px] bg-red-200" />
            <Gift className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span>LIMITED TIME</span>
            <div className="w-8 md:w-12 h-[1px] bg-red-200" />
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
            <span className="text-[#D42B2B]">Offers</span> of the Week
          </h2>
          
          <p className="text-gray-500 mt-2 md:mt-4 max-w-2xl mx-auto text-[13px] md:text-lg leading-snug px-4">
            Unbeatable deals on top quality power tools. Upgrade your toolkit for less.
          </p>
        </div>
        
        {displayProducts.length === 0 && isAdmin ? (
          <div className="w-full flex items-center justify-center py-20">
            <div className="bg-white/80 backdrop-blur px-8 py-6 rounded-2xl border-2 border-dashed border-gray-300 text-center shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Offers Selected</h3>
              <p className="text-gray-500">Click "Manage Offers of the Week" in the top right to feature products here.</p>
            </div>
          </div>
        ) : (
          <>
            {/* =========================================
                MOBILE ONLY (lg:hidden)
            ========================================= */}
            <div className="lg:hidden w-full bg-white py-8 flex flex-col border-b border-gray-100">
              <div className="flex items-center justify-between px-5 mb-5">
                <h2 className="text-[16px] font-black text-gray-900 tracking-tight uppercase flex items-center gap-1">
                  BEST <span className="text-[#D42B2B]">SELLERS</span>
                </h2>
                <Link href="/products" className="text-gray-600 text-[11px] font-bold flex items-center gap-1 hover:text-[#D42B2B]">
                  View all <span className="text-lg leading-none">&rarr;</span>
                </Link>
              </div>

              <div 
                className="flex overflow-x-auto hide-scrollbar px-5 gap-3 pb-2"
                style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
              >
                {displayProducts.map((product: any) => {
                  // Hardcode INR conversion for UI mockup matching if price is low
                  const priceInr = product.price < 500 ? (product.price * 82).toLocaleString('en-IN') : product.price.toLocaleString('en-IN');
                  return (
                    <Link href={`/products/${product.slug}`} key={product.id} className="snap-start shrink-0 w-[150px] flex flex-col bg-white rounded-xl border border-gray-100 p-3 relative shadow-sm">
                      <div className="w-full h-[110px] relative mb-3 bg-[#f8f9fc] rounded-lg">
                        <img 
                          src={product.thumbnail_url || "/images/hero-tool-light.png"}
                          alt={product.name}
                          className="w-full h-full object-contain mix-blend-multiply p-2 drop-shadow-md"
                        />
                      </div>
                      <h3 className="text-[12px] font-bold text-gray-900 leading-tight mb-1 h-[34px] line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex text-[#f5a623] text-[10px]">
                          ★★★★<span className="text-gray-300">★</span>
                        </div>
                        <span className="text-[9px] text-gray-400 font-medium">4.8 (114)</span>
                      </div>
                      <div className="font-black text-gray-900 text-[14px]">
                        ₹{priceInr}
                      </div>
                      
                      <div className="absolute bottom-2.5 right-2.5 w-7 h-7 bg-red-50 border border-red-100 text-[#D42B2B] rounded-full flex items-center justify-center hover:bg-[#D42B2B] hover:text-white transition-colors">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                      </div>
                    </Link>
                  );
                })}
              </div>
              <style dangerouslySetInnerHTML={{__html: `
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
              `}} />
            </div>

            {/* =========================================
                DESKTOP ONLY (hidden lg:block) - OFFERS
            ========================================= */}
            <div className="hidden lg:block">
              {/* Carousel Component */}
              <OffersCarousel products={displayProducts} />

              {/* Trust Bar */}
              <div className="max-w-6xl mx-auto mt-12 bg-[#fffcfc] border border-red-50 rounded-2xl p-6 md:p-8 flex justify-between items-center shadow-sm">
                
                <div className="flex items-center gap-4 flex-1 justify-center">
                  <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-[#D42B2B]">
                    <Tag className="w-6 h-6 fill-current opacity-80" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-base">Best Prices</p>
                    <p className="text-gray-500 text-sm">Guaranteed</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-1 justify-center border-l border-gray-100 pl-4">
                  <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-[#D42B2B]">
                    <ShieldCheck className="w-6 h-6 fill-current opacity-80" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-base">2 Year</p>
                    <p className="text-gray-500 text-sm">Warranty</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-1 justify-center border-l border-gray-100 pl-4">
                  <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-[#D42B2B]">
                    <Truck className="w-6 h-6 fill-current opacity-80" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-base">Fast & Free</p>
                    <p className="text-gray-500 text-sm">Delivery</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-1 justify-center border-l border-gray-100 pl-4">
                  <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-[#D42B2B]">
                    <Headphones className="w-6 h-6 fill-current opacity-80" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-base">Expert</p>
                    <p className="text-gray-500 text-sm">Support</p>
                  </div>
                </div>

              </div>

              {/* View All Button */}
              <div className="mt-14 text-center">
                <Link href="/products">
                  <button className="inline-flex items-center justify-center gap-2 bg-[#D42B2B] text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-red-500/30 hover:bg-[#b82323] transition-all">
                    <Tag className="w-5 h-5 fill-current" />
                    View All Offers
                    <ArrowRight className="w-5 h-5 ml-1" />
                  </button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );

  if (isAdmin) {
    return (
      <AdminSectionWrapper 
        drawerId="offers_manager" 
        buttonText="Manage Offers of the Week"
        className="block"
      >
        {InnerSection}
      </AdminSectionWrapper>
    )
  }

  return InnerSection;
}

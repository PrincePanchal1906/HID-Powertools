import React from 'react'
import { Star, ShieldCheck, Users, Wrench } from 'lucide-react'

export default function TrustBanner() {
  return (
    <section className="w-full bg-white border-y border-gray-100 py-12 relative z-10 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        
        {/* =========================================
            MOBILE ONLY TRUST BAR (lg:hidden)
        ========================================= */}
        <div className="grid grid-cols-4 gap-2 px-2 py-6 lg:hidden w-full overflow-hidden bg-white border-b border-gray-100 rounded-t-3xl mt-[-20px] relative z-20 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
          
          {/* Stat 1 */}
          <div className="flex flex-col items-center justify-start text-center">
            <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-[#D42B2B] mb-2">
              <Star className="w-4 h-4 fill-current" />
            </div>
            <div className="text-[14px] font-black text-gray-900 tracking-tight leading-none mb-1">50,000+</div>
            <div className="text-[8px] font-bold text-gray-500 uppercase tracking-widest leading-tight">Pros Trust Us</div>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col items-center justify-start text-center border-l border-gray-100">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-2">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="text-[14px] font-black text-gray-900 tracking-tight leading-none mb-1">10 Years</div>
            <div className="text-[8px] font-bold text-gray-500 uppercase tracking-widest leading-tight">Warranty</div>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col items-center justify-start text-center border-l border-gray-100">
            <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600 mb-2">
              <Wrench className="w-4 h-4" />
            </div>
            <div className="text-[14px] font-black text-gray-900 tracking-tight leading-none mb-1">Zero</div>
            <div className="text-[8px] font-bold text-gray-500 uppercase tracking-widest leading-tight">Maintenance</div>
          </div>

          {/* Stat 4 */}
          <div className="flex flex-col items-center justify-start text-center border-l border-gray-100">
            <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>
            </div>
            <div className="text-[14px] font-black text-gray-900 tracking-tight leading-none mb-1">24/7</div>
            <div className="text-[8px] font-bold text-gray-500 uppercase tracking-widest leading-tight">Expert Support</div>
          </div>
        </div>

        {/* =========================================
            DESKTOP ONLY TRUST BAR (hidden lg:flex)
        ========================================= */}
        <div className="hidden lg:flex items-center justify-between gap-12 px-6">
          
          {/* Stat 1 */}
          <div className="flex items-center space-x-4">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-6 h-6 fill-[#D42B2B] text-[#D42B2B]" />
              ))}
            </div>
            <div className="flex flex-col">
              <div className="text-3xl font-black text-gray-900 tracking-tight">50,000+</div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-widest">Professionals Trust Us</div>
            </div>
          </div>

          <div className="w-px h-16 bg-gray-200" />

          {/* Stat 2 */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <div className="text-2xl font-black text-gray-900 tracking-tight">10 Years</div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-widest">Extended Warranty</div>
            </div>
          </div>

          <div className="w-px h-16 bg-gray-200" />

          {/* Stat 3 */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600 shrink-0">
              <Wrench className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <div className="text-2xl font-black text-gray-900 tracking-tight">Zero</div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-widest">Maintenance Needed</div>
            </div>
          </div>

          <div className="w-px h-16 bg-gray-200" />

          {/* Stat 4 */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <div className="text-2xl font-black text-gray-900 tracking-tight">24/7</div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-widest">Expert Support</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

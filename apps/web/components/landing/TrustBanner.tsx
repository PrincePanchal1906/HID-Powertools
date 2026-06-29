import React from 'react'
import { Star, ShieldCheck, Users, Wrench } from 'lucide-react'

export default function TrustBanner() {
  return (
    <section className="w-full bg-white border-y border-gray-100 py-12 relative z-10 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        


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

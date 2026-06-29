import React from 'react';
import { Star, ShieldCheck, Wrench, Headset } from 'lucide-react';

export default function MobileTrustBar() {
  return (
    <section className="w-full bg-white border-b border-gray-100 py-4 lg:hidden relative z-20 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
      <div className="w-full px-2 max-w-[430px] mx-auto">
        <div className="flex items-start justify-between gap-1">
          {/* Stat 1 */}
          <div className="flex flex-col items-center flex-1 text-center">
            <Star className="w-4 h-4 text-[#D42B2B] mb-1.5" strokeWidth={2.5} />
            <span className="text-[13px] font-black text-gray-900 leading-none mb-1 tracking-tight">50k+</span>
            <span className="text-[8px] font-bold text-gray-500 uppercase tracking-[0.05em] leading-tight">Professionals</span>
          </div>

          <div className="w-[1px] h-8 bg-gray-100 mt-1" />

          {/* Stat 2 */}
          <div className="flex flex-col items-center flex-1 text-center">
            <ShieldCheck className="w-4 h-4 text-blue-600 mb-1.5" strokeWidth={2.5} />
            <span className="text-[13px] font-black text-gray-900 leading-none mb-1 tracking-tight">10 Years</span>
            <span className="text-[8px] font-bold text-gray-500 uppercase tracking-[0.05em] leading-tight">Warranty</span>
          </div>

          <div className="w-[1px] h-8 bg-gray-100 mt-1" />

          {/* Stat 3 */}
          <div className="flex flex-col items-center flex-1 text-center">
            <Wrench className="w-4 h-4 text-green-600 mb-1.5" strokeWidth={2.5} />
            <span className="text-[13px] font-black text-gray-900 leading-none mb-1 tracking-tight">Zero</span>
            <span className="text-[8px] font-bold text-gray-500 uppercase tracking-[0.05em] leading-tight">Maintenance</span>
          </div>

          <div className="w-[1px] h-8 bg-gray-100 mt-1" />

          {/* Stat 4 */}
          <div className="flex flex-col items-center flex-1 text-center">
            <Headset className="w-4 h-4 text-purple-600 mb-1.5" strokeWidth={2.5} />
            <span className="text-[13px] font-black text-gray-900 leading-none mb-1 tracking-tight">24/7</span>
            <span className="text-[8px] font-bold text-gray-500 uppercase tracking-[0.05em] leading-tight">Expert Support</span>
          </div>
        </div>
      </div>
    </section>
  );
}

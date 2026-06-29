import React from 'react';
import { ShieldCheck, Truck, RefreshCw, Headset } from 'lucide-react';

export default function MobileTrustBar() {
  return (
    <section className="w-full px-4 -mt-8 relative z-20 lg:hidden">
      <div className="bg-white rounded-[12px] shadow-[0_8px_30px_rgba(0,0,0,0.08)] py-3 px-2 flex justify-between items-center max-w-[430px] mx-auto border border-gray-50">
        {/* Stat 1 */}
        <div className="flex flex-col items-center flex-1 text-center">
          <div className="mb-1">
            <ShieldCheck className="w-[22px] h-[22px] text-[#D42B2B]" strokeWidth={1.5} />
          </div>
          <span className="text-[9px] font-black text-gray-900 uppercase leading-tight tracking-tight">1 Year<br/>Warranty</span>
        </div>

        <div className="w-[1px] h-8 bg-gray-100" />

        {/* Stat 2 */}
        <div className="flex flex-col items-center flex-1 text-center">
          <div className="mb-1">
            <Truck className="w-[22px] h-[22px] text-[#D42B2B]" strokeWidth={1.5} />
          </div>
          <span className="text-[9px] font-black text-gray-900 uppercase leading-tight tracking-tight">Fast<br/>Delivery</span>
        </div>

        <div className="w-[1px] h-8 bg-gray-100" />

        {/* Stat 3 */}
        <div className="flex flex-col items-center flex-1 text-center">
          <div className="mb-1">
            <RefreshCw className="w-[22px] h-[22px] text-[#D42B2B]" strokeWidth={1.5} />
          </div>
          <span className="text-[9px] font-black text-gray-900 uppercase leading-tight tracking-tight">Easy<br/>Returns</span>
        </div>

        <div className="w-[1px] h-8 bg-gray-100" />

        {/* Stat 4 */}
        <div className="flex flex-col items-center flex-1 text-center">
          <div className="mb-1">
            <Headset className="w-[22px] h-[22px] text-[#D42B2B]" strokeWidth={1.5} />
          </div>
          <span className="text-[9px] font-black text-gray-900 uppercase leading-tight tracking-tight">Expert<br/>Support</span>
        </div>
      </div>
    </section>
  );
}

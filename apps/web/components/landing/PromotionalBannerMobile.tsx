import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PromotionalBannerMobile() {
  return (
    <section className="w-full px-5 py-6 flex gap-3">
      {/* Left Banner: Summer Offer */}
      <div className="flex-1 bg-gradient-to-br from-gray-900 to-black rounded-2xl p-4 relative overflow-hidden flex flex-col justify-between min-h-[200px] border border-gray-800">
        <div className="z-10 flex flex-col">
          <div className="flex items-center gap-1.5 mb-2">
            <div className="w-[2px] h-2 bg-[#D42B2B]"></div>
            <span className="text-[9px] font-bold text-white tracking-widest uppercase">
              SUMMER OFFER
            </span>
          </div>
          
          <h3 className="text-white font-black uppercase text-[18px] leading-tight mb-1">
            UP TO <br/> <span className="text-[22px]">20% OFF</span>
          </h3>
          
          <p className="text-gray-400 text-[9px] max-w-[100px] mb-4 font-medium">
            On Selected Power Tools
          </p>
        </div>

        <div className="z-10 mt-auto">
          <Link href="/products?sale=true" className="bg-[#D42B2B] text-white text-[10px] font-bold px-3 py-1.5 rounded flex items-center justify-center gap-1 w-fit hover:bg-red-700 transition-colors">
            Shop Now <ArrowRight size={10} />
          </Link>
        </div>

        {/* Absolute Image */}
        <div className="absolute right-[-20px] bottom-[-10px] w-[130px] h-[130px] z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#D42B2B]/20 blur-[20px] rounded-full"></div>
          <Image 
            src="/images/grinder-transparent.png" 
            alt="Grinder" 
            fill 
            className="object-contain drop-shadow-2xl"
          />
        </div>
      </div>

      {/* Right Banner: New Arrival */}
      <div className="flex-1 bg-gradient-to-br from-[#D42B2B] to-[#991A1A] rounded-2xl p-4 relative overflow-hidden flex flex-col justify-between min-h-[200px]">
        <div className="z-10 flex flex-col">
          <div className="flex items-center gap-1.5 mb-2">
            <div className="w-[2px] h-2 bg-white"></div>
            <span className="text-[9px] font-bold text-white tracking-widest uppercase">
              NEW ARRIVAL
            </span>
          </div>
          
          <h3 className="text-white font-black uppercase text-[18px] leading-tight mb-1">
            HID X7 <br/> <span className="text-[12px] opacity-90">ROTARY HAMMER</span>
          </h3>
          
          <p className="text-white/80 text-[9px] max-w-[100px] mb-4 font-medium">
            Power. Precision. Performance.
          </p>
        </div>

        <div className="z-10 mt-auto">
          <Link href="/products/hid-x7" className="bg-white text-gray-900 text-[10px] font-bold px-3 py-1.5 rounded flex items-center justify-center gap-1 w-fit hover:bg-gray-100 transition-colors">
            Explore Now <ArrowRight size={10} />
          </Link>
        </div>

        {/* Absolute Image */}
        <div className="absolute right-[-25px] bottom-[-10px] w-[140px] h-[140px] z-0 pointer-events-none">
          <Image 
            src="/images/hammer-transparent.png" 
            alt="Rotary Hammer" 
            fill 
            className="object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}

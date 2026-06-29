"use client";

import React from "react";
import { ArrowRight, Gift, Bell, Lightbulb } from "lucide-react";

export default function NewsletterMobile() {
  return (
    <section className="w-full bg-[#D42B2B] px-[20px] lg:px-[5%] xl:px-[8%] py-[16px] lg:py-[80px] flex flex-col lg:flex-row lg:items-center lg:justify-between mt-[24px] lg:mt-0">
      <div className="flex flex-col lg:w-[40%]">
        <h2 className="text-white font-black text-[22px] lg:text-[40px] uppercase tracking-tight mb-0 lg:mb-[16px] font-['var(--font-barlow-condensed)']">
          STAY UPDATED
        </h2>
        <p className="text-white/90 text-[13px] lg:text-[16px] mb-[16px] lg:mb-0 max-w-[280px] lg:max-w-none">
          Get the latest updates on new products, offers and expert tips.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row lg:w-[60%] lg:items-center lg:justify-end gap-[32px] lg:gap-[64px] w-full">
        {/* Input Form */}
        <form className="w-full lg:w-[400px] flex items-center bg-[#b82323] rounded-[4px] overflow-hidden border border-white/10 shadow-inner mb-[32px] lg:mb-0" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="flex-1 bg-transparent text-white placeholder-white/60 px-[16px] py-[12px] lg:py-[16px] text-[14px] lg:text-[16px] focus:outline-none"
          />
          <button 
            type="submit" 
            className="bg-black text-white px-[20px] lg:px-[32px] py-[12px] lg:py-[16px] hover:bg-gray-900 transition-colors flex items-center justify-center font-bold"
          >
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Features List */}
        <div className="hidden lg:flex w-full lg:w-auto gap-[32px] pt-0">
          <div className="flex flex-col lg:flex-row items-center text-center lg:text-left gap-[8px] lg:gap-[16px]">
            <div className="w-[40px] h-[40px] lg:w-[48px] lg:h-[48px] rounded-full border border-white/30 flex items-center justify-center text-white bg-white/5 flex-shrink-0">
              <Gift size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-[10px] lg:text-[12px] uppercase tracking-wide">Exclusive Offers</span>
              <span className="text-white/70 text-[9px] lg:text-[11px] uppercase tracking-wider">For Subscribers</span>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row items-center text-center lg:text-left gap-[8px] lg:gap-[16px]">
            <div className="w-[40px] h-[40px] lg:w-[48px] lg:h-[48px] rounded-full border border-white/30 flex items-center justify-center text-white bg-white/5 flex-shrink-0">
              <Bell size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-[10px] lg:text-[12px] uppercase tracking-wide">New Product</span>
              <span className="text-white/70 text-[9px] lg:text-[11px] uppercase tracking-wider">Notifications</span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-center text-center lg:text-left gap-[8px] lg:gap-[16px]">
            <div className="w-[40px] h-[40px] lg:w-[48px] lg:h-[48px] rounded-full border border-white/30 flex items-center justify-center text-white bg-white/5 flex-shrink-0">
              <Lightbulb size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-[10px] lg:text-[12px] uppercase tracking-wide">Expert Tips</span>
              <span className="text-white/70 text-[9px] lg:text-[11px] uppercase tracking-wider">And Guides</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

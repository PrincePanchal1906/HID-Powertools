"use client";

import React from "react";
import { ArrowRight, Gift, Bell, Lightbulb } from "lucide-react";

export default function NewsletterMobile() {
  return (
    <section className="w-full bg-[#D42B2B] px-5 py-8 flex flex-col items-start mt-8">
      <h2 className="text-white font-black text-[22px] uppercase tracking-tight mb-1">
        STAY UPDATED
      </h2>
      <p className="text-white/90 text-[13px] mb-6 max-w-[280px]">
        Get the latest updates on new products, offers and expert tips.
      </p>

      {/* Input Form */}
      <form className="w-full flex items-center bg-[#b82323] rounded-lg overflow-hidden border border-white/10 shadow-inner mb-8" onSubmit={(e) => e.preventDefault()}>
        <input 
          type="email" 
          placeholder="Enter your email" 
          className="flex-1 bg-transparent text-white placeholder-white/60 px-4 py-3 text-[14px] focus:outline-none"
        />
        <button 
          type="submit" 
          className="bg-black text-white px-5 py-3 hover:bg-gray-900 transition-colors flex items-center justify-center"
        >
          <ArrowRight size={18} />
        </button>
      </form>

      {/* Features List */}
      <div className="w-full grid grid-cols-3 gap-2 border-t border-white/20 pt-6">
        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white bg-white/5">
            <Gift size={18} />
          </div>
          <div>
            <div className="text-white font-bold text-[10px]">Exclusive Offers</div>
            <div className="text-white/70 text-[9px]">For Subscribers</div>
          </div>
        </div>
        
        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white bg-white/5">
            <Bell size={18} />
          </div>
          <div>
            <div className="text-white font-bold text-[10px]">New Product</div>
            <div className="text-white/70 text-[9px]">Notifications</div>
          </div>
        </div>

        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white bg-white/5">
            <Lightbulb size={18} />
          </div>
          <div>
            <div className="text-white font-bold text-[10px]">Expert Tips</div>
            <div className="text-white/70 text-[9px]">And Guides</div>
          </div>
        </div>
      </div>
    </section>
  );
}

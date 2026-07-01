"use client";

import React from "react";
import { ShieldCheck, Wrench, Truck, Headphones } from "lucide-react";

export const ValueProp: React.FC = () => {
  const benefits = [
    { 
      icon: <Wrench size={18} strokeWidth={2.5} />, 
      title: "Industrial Grade",
      desc: "Built for demanding jobsites"
    },
    { 
      icon: <Truck size={18} strokeWidth={2.5} />, 
      title: "Fast Delivery",
      desc: "Quick dispatch nationwide"
    },
    { 
      icon: <Headphones size={18} strokeWidth={2.5} />, 
      title: "Dedicated Support",
      desc: "Experts ready to help"
    },
    { 
      icon: <ShieldCheck size={18} strokeWidth={2.5} />, 
      title: "Reliable Warranty",
      desc: "Peace of mind guaranteed"
    },
  ];

  return (
    <section className="w-full bg-[#0D0D0D] py-[24px] lg:py-[64px] relative overflow-hidden border-t border-white/5">
      <div className="relative z-20 max-w-[1920px] mx-auto px-[16px] lg:px-[5%] xl:px-[8%]">
        
        <h2 className="text-[20px] lg:text-[32px] font-black text-white leading-tight uppercase font-['var(--font-barlow-condensed)'] tracking-tight mb-[20px] lg:mb-[32px] text-center">
          WHY CHOOSE HID?
        </h2>

        {/* 2x2 Grid, Highly Compact */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-[12px] lg:gap-[24px]">
          {benefits.map((benefit, idx) => (
            <div 
              key={idx} 
              className="flex flex-col bg-white/5 rounded-[8px] p-[16px] lg:p-[24px] border border-white/5"
            >
              <div className="text-[#D42B2B] mb-[12px]">
                {benefit.icon}
              </div>
              <h3 className="text-white font-bold text-[14px] lg:text-[16px] uppercase tracking-wide font-['var(--font-barlow-condensed)'] leading-tight mb-[4px] flex items-center gap-1.5">
                <span className="text-[#D42B2B] text-[12px]">✓</span> {benefit.title}
              </h3>
              <p className="text-gray-400 text-[12px] lg:text-[14px] leading-snug">
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProp;

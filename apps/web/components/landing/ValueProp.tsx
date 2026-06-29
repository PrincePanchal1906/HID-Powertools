"use client";

import React from "react";
import { ShieldCheck, Wrench, Truck, Award } from "lucide-react";

export const ValueProp: React.FC = () => {
  const benefits = [
    { 
      icon: <Wrench size={20} />, 
      title: "Industrial Grade",
      desc: "Built for demanding professional environments."
    },
    { 
      icon: <ShieldCheck size={20} />, 
      title: "Warranty Support",
      desc: "Reliable support and product coverage."
    },
    { 
      icon: <Truck size={20} />, 
      title: "Fast Delivery",
      desc: "Quick dispatch across supported regions."
    },
    { 
      icon: <Award size={20} />, 
      title: "Trusted Quality",
      desc: "Tools trusted by professionals every day."
    },
  ];

  return (
    <section className="w-full bg-[#0D0D0D] py-[32px] lg:py-[120px] relative overflow-hidden">
      <div className="relative z-20 max-w-[1920px] mx-auto px-[16px] lg:px-[5%] xl:px-[8%]">
        
        {/* Header Content */}
        <div className="flex flex-col mb-[16px] lg:mb-[48px] items-center text-center">
          <div className="flex items-center gap-[16px] mb-[16px]">
            <span className="text-[12px] font-black text-[#D42B2B] tracking-widest uppercase bg-white/5 border border-white/10 px-[12px] py-[6px] rounded-[4px]">
              /// THE HID DIFFERENCE
            </span>
          </div>
          <h2 className="text-[28px] lg:text-[48px] font-black text-white leading-tight uppercase font-['var(--font-barlow-condensed)'] tracking-tight">
            WHY CHOOSE <span className="text-[#D42B2B]">HID</span>
          </h2>
        </div>

        {/* 2x2 Mobile / 4-Col Desktop Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-[12px] lg:gap-[48px]">
          {benefits.map((benefit, idx) => (
            <div 
              key={idx} 
              className="flex flex-col items-start lg:items-center lg:text-center gap-[12px]"
            >
              <div className="w-[32px] h-[32px] lg:w-[48px] lg:h-[48px] rounded-[4px] bg-white/5 border border-white/10 flex items-center justify-center text-[#D42B2B] shrink-0">
                {benefit.icon}
              </div>
              
              <div className="flex flex-col gap-[8px]">
                <h3 className="text-white font-bold text-[16px] lg:text-[18px] uppercase tracking-wide font-['var(--font-barlow-condensed)']">
                  {benefit.title}
                </h3>
                <p className="text-gray-400 text-[14px] lg:text-[14px] leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProp;

"use client";

import React from "react";
import { Users, ShieldCheck, Headphones, Truck } from "lucide-react";

export const TrustStrip: React.FC = () => {
  const metrics = [
    { icon: <Users size={18} strokeWidth={2} />, text: "50,000+ Professionals" },
    { icon: <ShieldCheck size={18} strokeWidth={2} />, text: "10 Years Warranty" },
    { icon: <Headphones size={18} strokeWidth={2} />, text: "24/7 Support" },
    { icon: <Truck size={18} strokeWidth={2} />, text: "Fast Delivery" },
  ];

  return (
    <section className="w-full bg-[#0D0D0D] text-white border-b border-white/5 py-4 lg:py-0 lg:h-[80px] flex items-center justify-center relative z-20">
      <div className="max-w-[1920px] w-full mx-auto px-[16px] lg:px-[5%] xl:px-[8%]">
        
        {/* Mobile: 2x2 Grid, Desktop: 1x4 Row */}
        <div className="grid grid-cols-2 gap-y-4 gap-x-2 lg:flex lg:flex-row lg:justify-between lg:items-center">
          {metrics.map((metric, idx) => (
            <React.Fragment key={idx}>
              <div className="flex items-center gap-2.5 justify-start lg:justify-center">
                <div className="text-[#D42B2B]">
                  {metric.icon}
                </div>
                <span className="text-[12px] lg:text-[14px] font-bold uppercase tracking-wide font-['var(--font-barlow-condensed)']">
                  {metric.text}
                </span>
              </div>
              
              {/* Divider (Hidden on Mobile) */}
              {idx < metrics.length - 1 && (
                <div className="hidden lg:block w-px h-6 bg-white/10" />
              )}
            </React.Fragment>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TrustStrip;

"use client";

import React from "react";
import { Truck } from "lucide-react";

export const PromotionalBanner = () => {
  return (
    <div className="w-full bg-gray-900 text-white py-3 px-4 flex items-center justify-center gap-3">
      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
        <Truck className="w-4 h-4 text-white" />
      </div>
      <div className="flex flex-col">
        <span className="text-[12px] font-black tracking-widest uppercase leading-tight">
          Get Free Delivery
        </span>
        <span className="text-[10px] text-gray-300 font-medium leading-tight">
          On all orders over ₹5,000
        </span>
      </div>
    </div>
  );
};

export default PromotionalBanner;

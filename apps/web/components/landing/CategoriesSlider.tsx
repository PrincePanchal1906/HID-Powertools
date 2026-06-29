"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Category } from "@/types/catalog";

export const CategoriesSlider = ({ categories }: { categories: Category[] }) => {
  if (!categories || categories.length === 0) return null;

  return (
    <section className="w-full bg-white py-8 lg:hidden border-b border-gray-100">
      <div className="flex items-center justify-between px-5 mb-5">
        <h2 className="text-[16px] font-black text-gray-900 tracking-tight uppercase flex items-center gap-1">
          CHOOSE YOUR <span className="text-[#D42B2B]">TOOL</span>
        </h2>
        <Link 
          href="/categories"
          className="text-gray-600 text-[11px] font-bold flex items-center gap-1 hover:text-[#D42B2B]"
        >
          View all <span className="text-lg leading-none">&rarr;</span>
        </Link>
      </div>

      <div 
        className="flex overflow-x-auto hide-scrollbar px-5 gap-3 pb-2"
        style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
      >
        {categories.map((category) => (
          <Link 
            key={category.id} 
            href={`/categories/${category.slug}`}
            className="relative flex flex-col items-center justify-center snap-start shrink-0 group w-[90px] min-h-[110px]"
          >
            {/* Image Container */}
            <div className="w-full h-[80px] bg-[#f8f9fc] rounded-[14px] flex items-center justify-center mb-2 overflow-hidden border border-gray-100 group-hover:border-red-200 transition-colors">
              <div className="relative w-[80%] h-[80%] mix-blend-multiply">
                <Image
                  src={`/images/categories/${category.slug}.png`}
                  alt={category.name}
                  fill
                  sizes="80px"
                  className="object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = "/images/hero-tool-light.png";
                  }}
                />
              </div>
            </div>

            {/* Label and Icon */}
            <div className="w-full flex items-center justify-between px-1">
              <span className="text-[10px] font-bold text-gray-900 uppercase truncate pr-1">
                {category.name}
              </span>
              <div className="w-3.5 h-3.5 rounded-full bg-[#D42B2B] text-white flex items-center justify-center shrink-0">
                <span className="text-[8px]">&rarr;</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );
};

export default CategoriesSlider;

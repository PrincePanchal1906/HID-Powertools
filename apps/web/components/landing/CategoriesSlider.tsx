import React from "react";
import Link from "next/link";
import type { Category } from "@/types/catalog";

export const CategoriesSlider = ({ categories }: { categories: Category[] }) => {
  if (!categories || categories.length === 0) return null;

  // The user explicitly requested these examples. We'll map the fetched categories 
  // or fall back to them if needed, but since we receive 'categories', we just render them.
  // We'll limit it to standard tools to keep it clean if we wanted, but rendering all is fine.
  
  return (
    <section className="w-full bg-[#f4f5f7] border-b border-gray-200 py-[12px] lg:py-[16px] z-20 relative">
      <div className="w-full max-w-[1920px] mx-auto">
        <div className="flex overflow-x-auto snap-x snap-mandatory px-[16px] lg:px-[5%] xl:px-[8%] gap-[8px] lg:gap-[12px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" style={{ WebkitOverflowScrolling: 'touch' }}>
          {categories.map((category) => (
            <Link 
              key={category.id} 
              href={`/products?category=${category.slug}`}
              className="snap-start shrink-0 px-[16px] lg:px-[20px] py-[6px] lg:py-[8px] bg-white border border-gray-200 hover:border-[#D42B2B] text-gray-900 rounded-full text-[13px] lg:text-[14px] font-bold transition-colors whitespace-nowrap shadow-sm hover:shadow"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSlider;

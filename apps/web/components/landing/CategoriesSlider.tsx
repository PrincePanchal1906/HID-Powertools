import React from "react";
import Link from "next/link";
import type { Category } from "@/types/catalog";

export const CategoriesSlider = ({ categories }: { categories: Category[] }) => {
  if (!categories || categories.length === 0) return null;

  return (
    <section className="w-full bg-white pt-[40px] pb-[40px] lg:hidden border-b border-gray-100">
      <div className="px-[16px] mb-[24px]">
        <div className="flex items-center gap-[16px] mb-[8px]">
          <span className="text-[11px] font-black text-[#D42B2B] tracking-widest uppercase bg-red-50 px-[8px] py-[4px] rounded-[4px]">
            /// LOADOUT
          </span>
        </div>
        <h2 className="text-[28px] font-black text-gray-900 tracking-tight uppercase font-['var(--font-barlow-condensed)']">
          TOOL ARSENAL
        </h2>
      </div>

      <div className="flex overflow-x-auto snap-x snap-mandatory px-[16px] gap-[16px] pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" style={{ WebkitOverflowScrolling: 'touch' }}>
        {categories.map((category) => (
          <Link 
            key={category.id} 
            href={`/categories/${category.slug}`}
            className="snap-start shrink-0 px-[24px] py-[12px] bg-[#f8f9fc] border border-gray-200 text-gray-900 rounded-[4px] text-[15px] font-bold hover:bg-gray-100 transition-colors tracking-tight uppercase"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSlider;

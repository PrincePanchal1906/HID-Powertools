import React from "react";
import Link from "next/link";
import { ImageWithFallback } from "../ui/ImageWithFallback";
import type { Category } from "@/types/catalog";
import { ArrowRight } from "lucide-react";

export const CategoriesSlider = ({ categories }: { categories: Category[] }) => {
  if (!categories || categories.length === 0) return null;

  return (
    <section className="w-full bg-white pt-8 pb-10 lg:hidden border-b border-gray-100">
      <div className="flex items-center justify-between px-4 mb-6">
        <h2 className="text-[15px] font-black text-gray-900 tracking-tight uppercase flex items-center gap-1">
          Top Categories
        </h2>
        <Link 
          href="/categories"
          className="text-gray-500 text-[10px] font-bold flex items-center gap-1 hover:text-[#D42B2B] uppercase tracking-[0.1em]"
        >
          View all <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="flex overflow-x-auto snap-x snap-mandatory px-4 gap-4 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {categories.map((category) => (
          <Link 
            key={category.id} 
            href={`/categories/${category.slug}`}
            className="flex flex-col snap-start shrink-0 group w-[42vw] max-w-[160px]"
          >
            {/* Image Container */}
            <div className="w-full aspect-square bg-[#f8f9fc] rounded-2xl flex items-center justify-center mb-3 overflow-hidden border border-gray-100 transition-colors">
              <div className="relative w-[75%] h-[75%] mix-blend-multiply">
                <ImageWithFallback
                  src={`/images/categories/${category.slug}.png`}
                  fallbackSrc="/images/hero-tool-light.png"
                  alt={category.name}
                  fill
                  sizes="160px"
                  className="object-contain drop-shadow-sm transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Label */}
            <div className="w-full flex items-center justify-between px-1">
              <span className="text-[13px] font-black text-gray-900 tracking-tight truncate pr-2">
                {category.name}
              </span>
              <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100 transition-colors group-hover:bg-[#D42B2B] group-hover:border-[#D42B2B] group-hover:text-white text-gray-400">
                <ArrowRight className="w-3 h-3" strokeWidth={3} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSlider;

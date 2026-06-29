import React from "react";
import Link from "next/link";
import { ImageWithFallback } from "../ui/ImageWithFallback";
import type { Category } from "@/types/catalog";
import { ArrowRight } from "lucide-react";

export const CategoriesSlider = ({ categories }: { categories: Category[] }) => {
  if (!categories || categories.length === 0) return null;

  return (
    <section className="w-full bg-[#f4f5f7] pt-6 pb-8 lg:hidden">
      <div className="flex items-center justify-between px-4 mb-4">
        <h2 className="text-[14px] font-black text-gray-900 tracking-tight uppercase">
          Popular Categories
        </h2>
        <Link 
          href="/categories"
          className="text-[#D42B2B] text-[12px] font-bold flex items-center gap-1 hover:text-[#b82323] transition-colors"
        >
          View All <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="flex overflow-x-auto snap-x snap-mandatory px-4 gap-3 pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {categories.map((category) => (
          <Link 
            key={category.id} 
            href={`/categories/${category.slug}`}
            className="flex flex-col snap-start shrink-0 group w-[38vw] max-w-[150px] aspect-square bg-[#f0f1f3] rounded-[12px] p-3 relative shadow-sm border border-black/5"
          >
            {/* Image */}
            <div className="absolute inset-0 pb-8 flex items-center justify-center">
              <div className="relative w-[75%] h-[75%] mix-blend-multiply">
                <ImageWithFallback
                  src={`/images/categories/${category.slug}.png`}
                  fallbackSrc="/images/hero-tool-light.png"
                  alt={category.name}
                  fill
                  sizes="160px"
                  className="object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)] transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Bottom Content (Inside Card) */}
            <div className="mt-auto flex items-end justify-between z-10 w-full relative">
              <span className="text-[10px] font-black text-gray-900 leading-[1.1] uppercase max-w-[70%]">
                {category.name}
              </span>
              <div className="w-5 h-5 rounded-[4px] bg-[#D42B2B] text-white flex items-center justify-center shrink-0 shadow-sm transition-colors group-hover:bg-[#b82323]">
                <ArrowRight className="w-3 h-3" strokeWidth={2.5} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSlider;

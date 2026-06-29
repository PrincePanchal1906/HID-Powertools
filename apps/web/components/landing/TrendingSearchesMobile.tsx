import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const TrendingSearchesMobile = () => {
  const trendingSearches = [
    "Impact Driver 18V",
    "Brushless Grinder",
    "Rotary Hammer Pro",
    "Circular Saw Blade",
  ];

  return (
    <div className="w-full bg-white px-4 py-8 lg:hidden border-b border-gray-100">
      <h2 className="text-[14px] font-black text-gray-900 tracking-tight uppercase mb-4">
        Trending Searches
      </h2>
      <div className="flex flex-col gap-0">
        {trendingSearches.map((term, i) => (
          <Link
            key={term}
            href={`/products?q=${encodeURIComponent(term)}`}
            className="flex items-center justify-between py-3.5 border-b border-gray-100 last:border-b-0 group active:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-gray-300 font-black text-sm w-4">{i + 1}</span>
              <span className="text-[15px] font-semibold text-gray-800">{term}</span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-[#D42B2B] transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
};

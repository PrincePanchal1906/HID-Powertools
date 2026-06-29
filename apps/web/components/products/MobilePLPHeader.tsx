"use client";

import React, { useCallback, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import type { Category } from "@/types/catalog";

interface MobilePLPHeaderProps {
  categories: Category[];
  currentCategory?: string;
  initialQuery?: string;
  currentFilters: {
    inStock: boolean;
    isFeatured: boolean;
    isNewArrival: boolean;
    isBestseller: boolean;
  };
  onOpenFilters: () => void;
}

export function MobilePLPHeader({ 
  categories, 
  currentCategory, 
  initialQuery = "", 
  currentFilters,
  onOpenFilters 
}: MobilePLPHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery);

  const createQueryString = useCallback(
    (name: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === null) {
        params.delete(name);
      } else {
        params.set(name, value);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(pathname + "?" + createQueryString("q", query.trim() || null), { scroll: false });
  };

  const toggleCategory = (slug: string) => {
    const isCurrent = currentCategory === slug;
    router.push(pathname + "?" + createQueryString("category", isCurrent ? null : slug), { scroll: false });
  };

  const toggleFilter = (key: string, value: boolean) => {
    router.push(pathname + "?" + createQueryString(key, value ? null : "true"), { scroll: false });
  };

  return (
    <div className="lg:hidden sticky top-[60px] sm:top-[72px] z-40 bg-white border-b border-gray-100 flex flex-col pt-3 pb-2 shadow-sm -mx-4 px-4 md:-mx-6 md:px-6 mb-4">
      {/* Top Row: Search & Filter Trigger */}
      <div className="flex items-center gap-3 mb-3">
        <form onSubmit={handleSearch} className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-4 h-4 text-gray-400" />
          </div>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="block w-full py-2.5 pl-9 pr-3 text-[14px] text-gray-900 bg-[#f4f5f7] border-none rounded-[4px] focus:ring-1 focus:ring-[#D42B2B] outline-none"
            placeholder="Search tools..."
          />
        </form>
        <button 
          onClick={onOpenFilters}
          className="flex items-center justify-center w-[40px] h-[40px] bg-[#f4f5f7] rounded-[4px] text-gray-700 hover:text-[#D42B2B] transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Category Chips */}
      <div className="w-full overflow-x-auto no-scrollbar mb-2 pb-1 -mx-4 px-4 md:-mx-6 md:px-6">
        <div className="flex items-center gap-2 w-max">
          <button
            onClick={() => toggleCategory("")}
            className={`px-4 py-[6px] text-[13px] font-bold rounded-full border transition-colors ${
              !currentCategory 
                ? "bg-gray-900 text-white border-gray-900" 
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
            }`}
          >
            All Tools
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => toggleCategory(cat.slug)}
              className={`px-4 py-[6px] text-[13px] font-bold rounded-full border whitespace-nowrap transition-colors ${
                currentCategory === cat.slug
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Filter Chips */}
      <div className="w-full overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 md:-mx-6 md:px-6">
        <div className="flex items-center gap-2 w-max">
          <button
            onClick={() => toggleFilter("inStock", currentFilters.inStock)}
            className={`px-3 py-1.5 text-[11px] font-black uppercase tracking-widest rounded-[4px] border transition-colors ${
              currentFilters.inStock 
                ? "bg-[#D42B2B] text-white border-[#D42B2B]" 
                : "bg-white text-gray-500 border-gray-200"
            }`}
          >
            In Stock
          </button>
          <button
            onClick={() => toggleFilter("isNewArrival", currentFilters.isNewArrival)}
            className={`px-3 py-1.5 text-[11px] font-black uppercase tracking-widest rounded-[4px] border transition-colors ${
              currentFilters.isNewArrival 
                ? "bg-blue-600 text-white border-blue-600" 
                : "bg-white text-gray-500 border-gray-200"
            }`}
          >
            New
          </button>
          <button
            onClick={() => toggleFilter("isBestseller", currentFilters.isBestseller)}
            className={`px-3 py-1.5 text-[11px] font-black uppercase tracking-widest rounded-[4px] border transition-colors ${
              currentFilters.isBestseller 
                ? "bg-[#f59e0b] text-white border-[#f59e0b]" 
                : "bg-white text-gray-500 border-gray-200"
            }`}
          >
            Bestsellers
          </button>
        </div>
      </div>
    </div>
  );
}

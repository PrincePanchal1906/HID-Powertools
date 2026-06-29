"use client";

import React, { useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import type { Category } from "@/types/catalog";
import { Check } from "lucide-react";

interface ProductFiltersProps {
  categories: Category[];
  currentCategory?: string;
  currentFilters: {
    inStock: boolean;
    isFeatured: boolean;
    isNewArrival: boolean;
    isBestseller: boolean;
    minPrice?: number;
    maxPrice?: number;
  };
}

export default function ProductFilters({ categories, currentCategory, currentFilters }: ProductFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Helper to update URL params without refreshing the page fully (Next.js Link/router behavior)
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

  const toggleCategory = (slug: string) => {
    const isCurrent = currentCategory === slug;
    router.push(pathname + "?" + createQueryString("category", isCurrent ? null : slug), { scroll: false });
  };

  const toggleBooleanFilter = (key: string, value: boolean) => {
    router.push(pathname + "?" + createQueryString(key, value ? "true" : null), { scroll: false });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-8 sticky top-24">
      
      {/* Categories */}
      <div>
        <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-4">Categories</h3>
        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200">
          <button
            onClick={() => toggleCategory("")}
            className={`flex items-center justify-between w-full text-left text-sm py-1.5 transition-colors ${
              !currentCategory ? "text-[#D42B2B] font-bold" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <span>All Categories</span>
            {!currentCategory && <Check className="w-4 h-4" />}
          </button>
          
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => toggleCategory(cat.slug)}
              className={`flex items-center justify-between w-full text-left text-sm py-1.5 transition-colors ${
                currentCategory === cat.slug ? "text-[#D42B2B] font-bold" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <span>{cat.name}</span>
              {currentCategory === cat.slug && <Check className="w-4 h-4" />}
            </button>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-4">Availability</h3>
        <label className="flex items-center gap-3 cursor-pointer group">
          <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
            currentFilters.inStock ? "bg-[#D42B2B] border-[#D42B2B]" : "border-gray-300 group-hover:border-gray-400"
          }`}>
            {currentFilters.inStock && <Check className="w-3.5 h-3.5 text-white" />}
          </div>
          <span className="text-sm text-gray-700 group-hover:text-gray-900">In Stock Only</span>
          <input 
            type="checkbox" 
            className="hidden" 
            checked={currentFilters.inStock} 
            onChange={(e) => toggleBooleanFilter("inStock", e.target.checked)} 
          />
        </label>
      </div>

      {/* Badges */}
      <div>
        <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-4">Collections</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
              currentFilters.isFeatured ? "bg-[#D42B2B] border-[#D42B2B]" : "border-gray-300 group-hover:border-gray-400"
            }`}>
              {currentFilters.isFeatured && <Check className="w-3.5 h-3.5 text-white" />}
            </div>
            <span className="text-sm text-gray-700 group-hover:text-gray-900">Featured</span>
            <input 
              type="checkbox" 
              className="hidden" 
              checked={currentFilters.isFeatured} 
              onChange={(e) => toggleBooleanFilter("isFeatured", e.target.checked)} 
            />
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
              currentFilters.isNewArrival ? "bg-[#D42B2B] border-[#D42B2B]" : "border-gray-300 group-hover:border-gray-400"
            }`}>
              {currentFilters.isNewArrival && <Check className="w-3.5 h-3.5 text-white" />}
            </div>
            <span className="text-sm text-gray-700 group-hover:text-gray-900">New Arrivals</span>
            <input 
              type="checkbox" 
              className="hidden" 
              checked={currentFilters.isNewArrival} 
              onChange={(e) => toggleBooleanFilter("isNewArrival", e.target.checked)} 
            />
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
              currentFilters.isBestseller ? "bg-[#D42B2B] border-[#D42B2B]" : "border-gray-300 group-hover:border-gray-400"
            }`}>
              {currentFilters.isBestseller && <Check className="w-3.5 h-3.5 text-white" />}
            </div>
            <span className="text-sm text-gray-700 group-hover:text-gray-900">Best Sellers</span>
            <input 
              type="checkbox" 
              className="hidden" 
              checked={currentFilters.isBestseller} 
              onChange={(e) => toggleBooleanFilter("isBestseller", e.target.checked)} 
            />
          </label>
        </div>
      </div>
      
    </div>
  );
}

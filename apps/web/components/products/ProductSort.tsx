"use client";

import React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface ProductSortProps {
  currentSort: string;
}

export default function ProductSort({ currentSort }: ProductSortProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    
    if (value === 'newest') {
      params.delete('sort'); // Default
    } else {
      params.set('sort', value);
    }
    
    router.push(pathname + "?" + params.toString(), { scroll: false });
  };

  return (
    <select 
      value={currentSort} 
      onChange={handleSortChange}
      className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-[#D42B2B] focus:border-[#D42B2B] block w-[160px] p-2.5 outline-none font-medium cursor-pointer transition-colors"
    >
      <option value="newest">Newest Arrivals</option>
      <option value="featured">Featured</option>
      <option value="bestselling">Best Selling</option>
      <option value="price_asc">Price: Low to High</option>
      <option value="price_desc">Price: High to Low</option>
      <option value="az">Alphabetical: A-Z</option>
      <option value="za">Alphabetical: Z-A</option>
    </select>
  );
}

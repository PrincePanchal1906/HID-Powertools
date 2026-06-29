"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

interface SearchBarProps {
  initialQuery?: string;
}

export function SearchBar({ initialQuery = "" }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    
    if (query.trim()) {
      params.set("q", query.trim());
    } else {
      params.delete("q");
    }
    
    // Always redirect to /products in case this is used in the Navbar globally
    router.push(`/products?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
        <Search className="w-5 h-5 text-gray-400" />
      </div>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="block w-full p-4 pl-12 text-sm text-gray-900 bg-white border border-gray-200 rounded-2xl focus:ring-[#D42B2B] focus:border-[#D42B2B] shadow-sm outline-none transition-shadow hover:shadow-md"
        placeholder="Search for tools, accessories, or SKU..."
        required
      />
      <button
        type="submit"
        className="text-white absolute right-2.5 bottom-2.5 bg-[#D42B2B] hover:bg-[#b82323] focus:ring-4 focus:outline-none focus:ring-red-300 font-bold rounded-xl text-sm px-4 py-2 transition-colors shadow-sm"
      >
        Search
      </button>
    </form>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, ArrowUpRight, TrendingUp, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const MobileSearchOverlay = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-mobile-search", handleOpen);
    return () => window.removeEventListener("open-mobile-search", handleOpen);
  }, []);

  // Also lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?q=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
    }
  };

  const trendingSearches = [
    "Impact Driver 18V",
    "Brushless Grinder",
    "Rotary Hammer Pro",
    "Circular Saw Blade",
  ];

  const recentSearches = [
    "Battery 5Ah",
    "Drill bits set",
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-[100] bg-white flex flex-col lg:hidden"
        >
          {/* Header */}
          <div className="flex items-center px-4 py-4 border-b border-gray-100 safe-area-top bg-white">
            <form onSubmit={handleSubmit} className="flex-1 relative flex items-center">
              <Search className="absolute left-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tools, parts, categories..."
                className="w-full bg-gray-100 text-gray-900 rounded-full py-2.5 pl-10 pr-4 text-base focus:outline-none focus:ring-2 focus:ring-[#D42B2B]/20"
              />
            </form>
            <button 
              onClick={() => setIsOpen(false)}
              className="ml-3 p-2 text-gray-500 hover:text-gray-900"
            >
              <span className="text-[15px] font-bold">Cancel</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-8 bg-[#fdfdfd]">
            
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div>
                <h3 className="text-[13px] font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Clock className="w-4 h-4" /> Recent
                </h3>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        setQuery(term);
                        router.push(`/products?q=${encodeURIComponent(term)}`);
                        setIsOpen(false);
                      }}
                      className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 shadow-sm active:scale-95 transition-transform"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Trending Products */}
            <div>
              <h3 className="text-[13px] font-bold text-[#D42B2B] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" /> Trending Now
              </h3>
              <div className="flex flex-col gap-0">
                {trendingSearches.map((term, i) => (
                  <button
                    key={term}
                    onClick={() => {
                      setQuery(term);
                      router.push(`/products?q=${encodeURIComponent(term)}`);
                      setIsOpen(false);
                    }}
                    className="flex items-center justify-between py-3.5 border-b border-gray-100 group active:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-gray-300 font-black text-sm w-4">{i + 1}</span>
                      <span className="text-[15px] font-semibold text-gray-800">{term}</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-[#D42B2B] transition-colors" />
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Categories */}
            <div>
              <h3 className="text-[13px] font-bold text-gray-400 uppercase tracking-wider mb-3">
                Categories
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {["Drills", "Grinders", "Saws", "Batteries"].map((cat) => (
                  <Link
                    href={`/categories`}
                    key={cat}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center py-3 bg-white border border-gray-200 rounded-xl font-bold text-gray-700 shadow-sm active:scale-95 transition-transform"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

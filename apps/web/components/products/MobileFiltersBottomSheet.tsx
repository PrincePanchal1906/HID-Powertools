"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import ProductFilters from "./ProductFilters";
import ProductSort from "./ProductSort";
import type { Category } from "@/types/catalog";

interface MobileFiltersBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  currentCategory?: string;
  currentSort: string;
  currentFilters: {
    inStock: boolean;
    isFeatured: boolean;
    isNewArrival: boolean;
    isBestseller: boolean;
    minPrice?: number;
    maxPrice?: number;
  };
}

export function MobileFiltersBottomSheet({ 
  isOpen, 
  onClose,
  categories,
  currentCategory,
  currentSort,
  currentFilters
}: MobileFiltersBottomSheetProps) {
  
  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 z-50 transition-opacity lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Bottom Sheet */}
      <div 
        className="fixed inset-x-0 bottom-0 z-[60] bg-white rounded-t-2xl shadow-2xl lg:hidden transform transition-transform duration-300 flex flex-col max-h-[85vh]"
      >
        {/* Handle */}
        <div className="w-full flex justify-center py-3" onClick={onClose}>
          <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
        </div>
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 pb-4 border-b border-gray-100">
          <h2 className="text-xl font-black uppercase font-['var(--font-barlow-condensed)'] tracking-tight">
            Filters & Sort
          </h2>
          <button 
            onClick={onClose}
            className="p-2 -mr-2 text-gray-500 hover:text-gray-900 bg-gray-50 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8 no-scrollbar">
          
          <div>
            <h3 className="text-[12px] font-black text-gray-900 uppercase tracking-widest mb-4">Sort By</h3>
            <div className="w-full">
              <ProductSort currentSort={currentSort} />
            </div>
          </div>

          <div className="w-full h-px bg-gray-100" />

          {/* Re-using the desktop ProductFilters but adapting it */}
          <div className="[&>div]:border-none [&>div]:shadow-none [&>div]:p-0 [&>div]:static">
            <ProductFilters 
              categories={categories}
              {...(currentCategory !== undefined ? { currentCategory } : {})}
              currentFilters={currentFilters}
            />
          </div>
          
        </div>
        
        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-100 bg-white shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
          <button 
            onClick={onClose}
            className="w-full bg-[#D42B2B] text-white font-bold py-4 rounded-[4px] uppercase tracking-wide text-sm"
          >
            Show Results
          </button>
        </div>
      </div>
    </>
  );
}

"use client";

import React, { useState } from "react";
import { MobilePLPHeader } from "./MobilePLPHeader";
import { MobileFiltersBottomSheet } from "./MobileFiltersBottomSheet";
import type { Category } from "@/types/catalog";

interface MobilePLPWrapperProps {
  categories: Category[];
  currentCategory?: string;
  initialQuery?: string;
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

export function MobilePLPWrapper({ 
  categories, 
  currentCategory, 
  initialQuery, 
  currentSort,
  currentFilters 
}: MobilePLPWrapperProps) {
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);

  return (
    <>
      <MobilePLPHeader 
        categories={categories}
        currentCategory={currentCategory}
        initialQuery={initialQuery}
        currentFilters={currentFilters}
        onOpenFilters={() => setIsFilterSheetOpen(true)}
      />
      
      <MobileFiltersBottomSheet 
        isOpen={isFilterSheetOpen}
        onClose={() => setIsFilterSheetOpen(false)}
        categories={categories}
        currentCategory={currentCategory}
        currentSort={currentSort}
        currentFilters={currentFilters}
      />
    </>
  );
}

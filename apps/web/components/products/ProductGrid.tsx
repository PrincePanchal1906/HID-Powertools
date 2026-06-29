import React from "react";
import type { Product } from "@/types/catalog";
import { ProductCard } from "./ProductCard";
import { SearchX } from "lucide-react";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <SearchX className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">No Products Found</h3>
        <p className="text-gray-500 text-center max-w-sm">
          We couldn't find any products matching your current filters. Try adjusting your search criteria or clearing your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

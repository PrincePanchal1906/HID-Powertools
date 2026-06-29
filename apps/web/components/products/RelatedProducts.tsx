import React from "react";
import { getProducts } from "@/lib/catalog/getProducts";
import ProductGrid from "./ProductGrid";
import { ProductCard } from "./ProductCard";

interface RelatedProductsProps {
  categoryId?: string;
  categorySlug?: string;
  currentProductId: string;
}

export default async function RelatedProducts({ categoryId, categorySlug, currentProductId }: RelatedProductsProps) {
  if (!categoryId && !categorySlug) return null;

  const queryParams: any = { limit: 5 };
  if (categorySlug) queryParams.category = categorySlug;

  // Fetch products in the same category
  const products = await getProducts(queryParams);

  const relatedProducts = products
    .filter(p => p.id !== currentProductId)
    .slice(0, 4);

  if (relatedProducts.length === 0) return null;

  return (
    <div className="mt-16 lg:mt-24 mb-32 lg:mb-12">
      <div className="flex items-center justify-between mb-6 lg:mb-8">
        <h2 className="text-2xl lg:text-3xl font-black text-gray-900 tracking-tight">
          Related Products
        </h2>
      </div>
      
      {/* Desktop Grid */}
      <div className="hidden md:block">
        <ProductGrid products={relatedProducts} />
      </div>

      {/* Mobile Horizontal Scroll */}
      <div className="md:hidden flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory no-scrollbar -mx-4 px-4">
        {relatedProducts.map(product => (
          <div key={product.id} className="w-[75vw] shrink-0 snap-center">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

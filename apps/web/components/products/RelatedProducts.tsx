import React from "react";
import { getProducts } from "@/lib/catalog/getProducts";
import ProductGrid from "./ProductGrid";

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
    <div className="mt-24 mb-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">
          Related Products
        </h2>
      </div>
      <ProductGrid products={relatedProducts} />
    </div>
  );
}

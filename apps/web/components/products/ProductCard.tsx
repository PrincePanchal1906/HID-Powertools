import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingCart } from "lucide-react";
import type { Product } from "@/types/catalog";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const discount = product.compare_price 
    ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100)
    : 0;

  // Deterministic rating for mockup purposes to prevent hydration error
  const reviewCount = (product.name.length * 2) + 15;

  return (
    <Link href={`/products/${product.slug}`} className="group relative block h-full">
      <div className="relative flex flex-col h-full bg-white rounded-2xl border border-gray-100 hover:border-[#D42B2B]/50 hover:shadow-xl hover:shadow-[#D42B2B]/5 transition-all duration-300 overflow-hidden">
        
        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
          {discount > 0 && (
            <div className="bg-[#D42B2B] text-white text-[10px] font-black tracking-wider px-2 py-1 rounded shadow-sm uppercase">
              {discount}% OFF
            </div>
          )}
          {product.is_new_arrival && (
            <div className="bg-blue-600 text-white text-[10px] font-black tracking-wider px-2 py-1 rounded shadow-sm uppercase">
              NEW
            </div>
          )}
        </div>

        {/* Image Area */}
        <div className="relative w-full aspect-[4/5] sm:aspect-square flex items-center justify-center p-6 bg-[#f8f9fc] overflow-hidden group-hover:bg-[#fceded]/30 transition-colors duration-500">
          <div className="relative z-10 w-full h-full">
            <Image
              src={product.thumbnail_url || "/images/placeholder.png"}
              alt={product.name}
              fill
              className="object-contain mix-blend-multiply drop-shadow-sm transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4 flex flex-col flex-1 relative bg-white border-t border-gray-50">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-gray-400 font-medium tracking-wide uppercase">
              {product.category?.name || "Tool"}
            </p>
            {/* Stock Indicator */}
            {product.stock <= 5 && product.stock > 0 ? (
              <span className="text-[10px] font-bold text-orange-500">Only {product.stock} left</span>
            ) : product.stock === 0 ? (
              <span className="text-[10px] font-bold text-red-500">Out of Stock</span>
            ) : null}
          </div>

          <h3 className="font-bold text-base text-gray-900 line-clamp-2 leading-snug group-hover:text-[#D42B2B] transition-colors">
            {product.name}
          </h3>

          <div className="flex items-center gap-1 mt-2">
            <div className="flex text-[#FFC107]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-current" />
              ))}
            </div>
            <span className="text-[10px] text-gray-400 font-medium ml-1">({reviewCount})</span>
          </div>

          {/* Pricing */}
          <div className="mt-auto pt-4 flex items-end gap-2">
            <span className="text-gray-900 font-black text-xl leading-none">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.compare_price && (
              <span className="text-gray-400 text-xs font-semibold line-through decoration-gray-300 mb-0.5">
                ₹{product.compare_price.toLocaleString("en-IN")}
              </span>
            )}
          </div>

          {/* Action Button (Slide Up on Hover on desktop, static on mobile) */}
          <div className="absolute bottom-0 left-0 w-full p-3 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-30 hidden lg:block bg-white/90 backdrop-blur-sm">
            <button className="w-full bg-gray-900 text-white font-bold text-sm py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-[#D42B2B] transition-colors">
              <ShoppingCart className="w-4 h-4" />
              View Details
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

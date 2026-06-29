"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Flame, Star, Plus, ShoppingCart } from "lucide-react";
import type { Product } from "@/types/catalog";

interface OfferCardProps {
  product: Product;
  isCompactGrid?: boolean;
}

export const OfferCard: React.FC<OfferCardProps> = ({ product, isCompactGrid = false }) => {
  // Calculate discount percentage
  const discount = product.compare_price 
    ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100)
    : 0;

  const reviewCount = (product.name.length * 3) + 42;

  // Conditional classes based on compact mode
  const wrapperClass = isCompactGrid
    ? "group relative block w-full h-full"
    : "group relative block w-[180px] sm:w-[220px] md:w-[320px] shrink-0 snap-start h-full";

  const imgPaddingClass = isCompactGrid ? "p-3" : "p-4 md:p-8";
  const titleClass = isCompactGrid ? "text-[12px] md:text-sm" : "text-[13px] md:text-lg";
  const priceClass = isCompactGrid ? "text-[15px] md:text-lg" : "text-lg md:text-2xl";
  const contentPaddingClass = isCompactGrid ? "p-3" : "p-3 md:p-5";

  return (
    <Link 
      href={`/products/${product.slug}`} 
      className={wrapperClass}
    >
      <div className="relative flex flex-col h-full bg-white rounded-xl md:rounded-2xl border border-gray-100 hover:border-[#D42B2B] shadow-sm hover:shadow-[0_8px_30px_rgb(212,43,43,0.12)] transition-all duration-300 overflow-hidden">
        
        {/* Top Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-2 left-2 md:top-4 md:left-4 z-20 flex items-center gap-0.5 md:gap-1 bg-[#D42B2B] text-white text-[9px] md:text-xs font-bold px-1.5 md:px-2 py-0.5 md:py-1 rounded">
            <Flame className="w-2.5 h-2.5 md:w-3 md:h-3 fill-current" />
            <span>{discount}% OFF</span>
          </div>
        )}

        {/* Image Area with Circular Backdrop */}
        <div className={`relative w-full aspect-square flex items-center justify-center ${imgPaddingClass} bg-[#fdfdfd] overflow-hidden`}>
          {/* Subtle Circle Background */}
          <div className="absolute inset-2 md:inset-4 bg-[#fceded] rounded-full opacity-60 pointer-events-none transform transition-transform duration-500 group-hover:scale-105" />
          
          <div className="relative z-10 w-full h-full">
            <Image
              src={product.thumbnail_url || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-contain mix-blend-multiply drop-shadow-md md:drop-shadow-lg transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 180px, 320px"
            />
          </div>

          {/* Hot Deal Text */}
          <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 z-20 flex items-center gap-0.5 md:gap-1 bg-white/90 backdrop-blur-sm text-[#D42B2B] text-[8px] md:text-[10px] font-black tracking-widest uppercase px-1.5 md:px-2 py-0.5 md:py-1 rounded-sm shadow-sm">
            <Star className="w-2 h-2 md:w-3 md:h-3 fill-current" />
            {isCompactGrid ? "HOT" : "HOT DEAL"}
          </div>
        </div>

        {/* Content Area */}
        <div className={`${contentPaddingClass} flex flex-col flex-1 relative bg-white`}>
          <h3 className={`font-bold text-gray-900 line-clamp-2 group-hover:text-[#D42B2B] transition-colors leading-tight ${titleClass}`}>
            {product.name}
          </h3>
          
          {/* Category / Subtitle */}
          {!isCompactGrid && (
            <p className="text-[10px] md:text-sm text-gray-500 mt-0.5 md:mt-1">
              {product.category?.name || "Professional Series"}
            </p>
          )}

          {/* Star Rating */}
          <div className="flex items-center gap-0.5 md:gap-1 mt-1.5 md:mt-2">
            <div className="flex text-[#FFC107]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 fill-current" />
              ))}
            </div>
            {!isCompactGrid && (
              <span className="text-[10px] md:text-xs text-gray-400 font-medium ml-1">({reviewCount})</span>
            )}
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Price */}
          <div className="flex items-end gap-1.5 md:gap-2 mt-2 md:mt-4 mb-1 md:mb-2">
            <span className={`text-[#D42B2B] font-black leading-none ${priceClass}`}>
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.compare_price && !isCompactGrid && (
              <span className="text-gray-400 text-[11px] md:text-sm font-semibold line-through decoration-gray-300 decoration-[1.5px] md:decoration-2 mb-px md:mb-0.5">
                ₹{product.compare_price.toLocaleString("en-IN")}
              </span>
            )}
          </div>

          {/* Desktop Plus Button (Default State) */}
          <div className="hidden lg:flex absolute bottom-5 right-5 w-10 h-10 bg-white border border-gray-100 shadow-sm rounded-xl items-center justify-center text-[#D42B2B] transition-all duration-300 group-hover:opacity-0 group-hover:scale-75 group-hover:translate-y-4">
            <Plus className="w-5 h-5" />
          </div>

          {/* Desktop Add to Cart Button (Hover State) */}
          <div className="hidden lg:block absolute bottom-0 left-0 w-full p-4 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-30">
            <button className="w-full bg-[#D42B2B] text-white font-bold text-sm py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-[#b82323] transition-colors shadow-lg shadow-red-500/20">
              <ShoppingCart className="w-4 h-4 fill-current" />
              Add to Cart
            </button>
          </div>

          {/* Mobile Always-Visible Cart Button */}
          <div className="lg:hidden absolute bottom-2 right-2 md:bottom-4 md:right-4 w-7 h-7 md:w-9 md:h-9 bg-[#D42B2B] rounded-lg flex items-center justify-center text-white shadow-sm md:shadow-md active:scale-95 transition-transform">
            <ShoppingCart className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current" />
          </div>
          
        </div>
      </div>
    </Link>
  );
};

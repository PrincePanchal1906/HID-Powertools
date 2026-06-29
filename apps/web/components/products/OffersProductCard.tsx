import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../ui/ImageWithFallback';
import type { Product } from '@/types/catalog';

export const OffersProductCard = ({ product }: { product: Product }) => {
  const discount = product.compare_price 
    ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100)
    : 0;

  return (
    <Link href={`/products/${product.slug}`} className="flex flex-col group w-full h-full bg-[#f8f9fc] rounded-2xl border border-gray-100 p-3 transition-colors hover:border-gray-200">
      <div className="relative w-full aspect-[4/3] bg-white rounded-xl flex items-center justify-center mb-3 overflow-hidden border border-gray-50">
        {discount > 0 && (
          <div className="absolute top-1.5 left-1.5 z-10 bg-[#D42B2B] text-white text-[8px] font-black uppercase tracking-[0.05em] px-1.5 py-0.5 rounded shadow-sm">
            {discount}% OFF
          </div>
        )}
        <div className="relative w-[75%] h-[75%] mix-blend-multiply">
          <ImageWithFallback
            src={product.thumbnail_url || "/images/hero-tool-light.png"}
            fallbackSrc="/images/hero-tool-light.png"
            alt={product.name}
            fill
            sizes="160px"
            className="object-contain drop-shadow-sm transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>

      <div className="flex flex-col flex-1 px-0.5">
        <h3 className="text-[12px] font-bold text-gray-900 leading-snug mb-1.5 line-clamp-2">
          {product.name}
        </h3>
        
        <div className="flex-1" />

        <div className="flex flex-col items-start justify-end mb-2">
          {product.compare_price && (
            <span className="text-gray-400 text-[9px] font-bold line-through decoration-gray-300 decoration-[1.5px] leading-none mb-0.5">
              ₹{product.compare_price.toLocaleString("en-IN")}
            </span>
          )}
          <span className="text-[#D42B2B] font-black text-[14px] leading-none tracking-tight">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="flex items-center text-[9px] font-bold text-gray-500 uppercase tracking-[0.1em] group-hover:text-[#D42B2B] transition-colors mt-1">
          View Details <ArrowRight className="w-2.5 h-2.5 ml-1" />
        </div>
      </div>
    </Link>
  );
};

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductImage {
  id: string;
  image_url: string;
  alt_text?: string;
  display_order: number;
}

interface ProductGalleryProps {
  images: ProductImage[];
  thumbnailUrl?: string;
  productName: string;
}

export default function ProductGallery({ images, thumbnailUrl, productName }: ProductGalleryProps) {
  // If no images exist in relations, fallback to thumbnail or placeholder
  const allImages = images.length > 0 
    ? images.map(img => img.image_url)
    : [thumbnailUrl || "/images/placeholder.png"];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % allImages.length);
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-0 md:gap-6 sticky top-24 -mx-4 md:mx-0 bg-white md:bg-transparent">
      
      {/* Thumbnails Column (Desktop) / Row (Mobile) */}
      {allImages.length > 1 && (
        <div className="hidden md:flex flex-col gap-3 overflow-y-auto max-h-[500px] scrollbar-hide py-1 w-24 shrink-0">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative w-24 h-24 rounded-xl border-2 overflow-hidden flex-shrink-0 transition-all ${
                currentIndex === idx ? "border-[#D42B2B] shadow-md" : "border-gray-100 hover:border-gray-300 opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                fill
                className="object-contain p-2 mix-blend-multiply bg-white"
                sizes="96px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Image Area (Edge-to-edge on mobile, CSS zoom on desktop) */}
      <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square bg-white md:rounded-3xl md:border md:border-gray-100 md:shadow-sm overflow-hidden group">
        
        {/* Desktop View: State-based single image with CSS Zoom */}
        <div className="hidden md:block relative w-full h-full transition-transform duration-500 origin-center group-hover:scale-[1.3] cursor-crosshair">
          <Image
            src={allImages[currentIndex] || "/images/placeholder.png"}
            alt={productName}
            fill
            priority
            className="object-contain p-8 mix-blend-multiply drop-shadow-lg"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Mobile View: Native CSS Snap Scroll Gallery */}
        <div className="md:hidden flex w-full h-full overflow-x-auto snap-x snap-mandatory no-scrollbar" onScroll={(e) => {
          const scrollLeft = e.currentTarget.scrollLeft;
          const width = e.currentTarget.clientWidth;
          const newIndex = Math.round(scrollLeft / width);
          if (newIndex !== currentIndex) setCurrentIndex(newIndex);
        }}>
          {allImages.map((img, idx) => (
            <div key={idx} className="relative w-full h-full shrink-0 snap-center">
              <Image
                src={img || "/images/placeholder.png"}
                alt={`${productName} image ${idx + 1}`}
                fill
                priority={idx === 0}
                className="object-contain mix-blend-multiply drop-shadow-sm p-8"
                sizes="100vw"
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows if > 1 image (Desktop Only) */}
        {allImages.length > 1 && (
          <div className="hidden md:block">
            <button 
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur rounded-full shadow border border-gray-100 flex items-center justify-center text-gray-700 hover:text-[#D42B2B] opacity-0 group-hover:opacity-100 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur rounded-full shadow border border-gray-100 flex items-center justify-center text-gray-700 hover:text-[#D42B2B] opacity-0 group-hover:opacity-100 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
        {/* Pagination Dots (Mobile Only) */}
        {allImages.length > 1 && (
          <div className="absolute bottom-4 left-0 w-full flex justify-center gap-2 md:hidden">
            {allImages.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-1.5 rounded-full transition-all ${
                  currentIndex === idx ? "bg-[#D42B2B] w-6" : "bg-gray-300 w-1.5"
                }`}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

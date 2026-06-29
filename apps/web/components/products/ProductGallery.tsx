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
    <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-6 sticky top-24">
      
      {/* Thumbnails Column (Desktop) / Row (Mobile) */}
      {allImages.length > 1 && (
        <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[500px] scrollbar-hide py-1 md:w-24 shrink-0">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative w-20 h-20 md:w-24 md:h-24 rounded-xl border-2 overflow-hidden flex-shrink-0 transition-all ${
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

      {/* Main Image Area with lightweight CSS zoom */}
      <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden group">
        
        {/* CSS Zoom Effect: group-hover triggers scale, cursor changes */}
        <div className="relative w-full h-full transition-transform duration-500 origin-center group-hover:scale-[1.3] cursor-crosshair">
          <Image
            src={allImages[currentIndex] || "/images/placeholder.png"}
            alt={productName}
            fill
            priority
            className="object-contain p-8 mix-blend-multiply drop-shadow-lg"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Navigation Arrows if > 1 image */}
        {allImages.length > 1 && (
          <>
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
          </>
        )}
      </div>

    </div>
  );
}

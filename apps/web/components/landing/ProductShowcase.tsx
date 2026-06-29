"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface ProductShowcaseItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  image: string;
  price?: number;
}

export interface ProductShowcaseProps {
  items: ProductShowcaseItem[];
  isPreview?: boolean;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({ items, isPreview = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // If no items are passed, we shouldn't render anything
  if (!items || items.length === 0) return null;

  // Duplicate items for the infinite marquee
  const marqueeItems = [...items, ...items];

  // For pausing the marquee when it's out of viewport
  useEffect(() => {
    if (isPreview || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsPaused(!entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isPreview]);

  return (
    <section 
      ref={containerRef}
      className="w-full bg-[#FAFAFA] py-24 overflow-hidden relative"
    >
      <div className="container mx-auto px-6 mb-16 text-center">
        <h2 className="text-sm font-bold tracking-[0.25em] text-gray-500 uppercase mb-4">
          Explore HID Powertools
        </h2>
        <p className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
          Professional tools engineered for every job.
        </p>
      </div>

      <div 
        className="flex w-full overflow-hidden py-8 px-4"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
        }}
      >
        <div 
          className={`flex w-max motion-reduce:animate-none hover:[animation-play-state:paused] ${
            isPaused ? "[animation-play-state:paused]" : "animate-showcase-marquee"
          } will-change-transform gap-6 md:gap-8 pr-6 md:pr-8`}
        >
          {marqueeItems.map((item, index) => (
            <ShowcaseCard 
              key={`${item.id}-${index}`} 
              item={item} 
              isPriority={index < 4 && !isPreview} 
            />
          ))}
        </div>
      </div>

      {/* Embedded CSS for infinite marquee to guarantee 60fps and portability */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes showcase-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-50% - ${items.length > 0 ? (items.length * 1.5) : 0}rem)); } /* Accounts for gap */
        }
        .animate-showcase-marquee {
          animation: showcase-marquee 35s linear infinite;
        }
      `}} />
    </section>
  );
};

const ShowcaseCard = ({ item, isPriority }: { item: ProductShowcaseItem, isPriority: boolean }) => {
  return (
    <Link 
      href={`/products/${item.slug}`}
      className="group relative flex flex-col shrink-0 w-[280px] md:w-[340px] aspect-[4/5] bg-white rounded-[24px] border border-gray-100 shadow-[0_8px_30px_-15px_rgba(0,0,0,0.06)] overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(212,43,43,0.15)] hover:border-[#D42B2B]/30"
    >
      {/* Category Badge */}
      <div className="absolute top-5 left-5 z-20 bg-gray-900 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md">
        {item.category}
      </div>

      {/* Image Container */}
      <div className="relative w-full flex-1 min-h-[55%] bg-[#f8f9fa] flex items-center justify-center p-8 overflow-hidden">
        <Image
          src={item.image || "/images/placeholder.png"}
          alt={item.name}
          fill
          priority={isPriority}
          loading={isPriority ? "eager" : "lazy"}
          sizes="(max-width: 768px) 280px, 340px"
          className="object-contain p-8 mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      {/* Content Area */}
      <div className="relative bg-white z-20 p-6 flex flex-col justify-end border-t border-gray-50 mt-auto">
        <h3 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight group-hover:text-[#D42B2B] transition-colors duration-300 line-clamp-1">
          {item.name}
        </h3>
        
        <p className="text-sm text-gray-500 mt-2 font-medium line-clamp-2 min-h-[40px]">
          {item.description}
        </p>
        
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-900 uppercase tracking-widest transition-colors duration-300 group-hover:text-[#D42B2B]">
            Explore Product
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
          {item.price && (
            <div className="font-bold text-gray-900 text-lg">
              ${item.price.toFixed(2)}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductShowcase;

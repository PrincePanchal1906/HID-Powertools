"use client";

import type { Product } from "@/types/catalog";
import { OfferCard } from "./OfferCard";
import { HorizontalScroll } from "../ui/HorizontalScroll";

interface OffersCarouselProps {
  products: Product[];
}

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

export const OffersCarousel: React.FC<OffersCarouselProps> = ({ products }) => {
  const mobileChunks = chunkArray(products, 4);

  return (
    <>
      {/* MOBILE 2x2 GRID CAROUSEL */}
      <div className="w-full lg:hidden pb-2">
        <HorizontalScroll className="gap-4 px-4 pb-8 pt-4">
          {mobileChunks.map((chunk, chunkIdx) => (
            <div 
              key={`chunk-${chunkIdx}`} 
              className="flex-none w-[88vw] sm:w-[340px] snap-start"
            >
              <div className="grid grid-cols-2 gap-3">
                {chunk.map((product) => (
                  <div key={product.id} className="h-[260px] sm:h-[280px]">
                    <OfferCard product={product} isCompactGrid={true} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </HorizontalScroll>
      </div>

      {/* DESKTOP ROW CAROUSEL */}
      <div className="hidden lg:block w-full max-w-7xl mx-auto mt-12 mb-8">
        <HorizontalScroll className="gap-6 px-4 md:px-12 pb-10 pt-4">
          {products.map((product) => (
            <div key={product.id} className="flex-none snap-start h-full">
              <OfferCard product={product} />
            </div>
          ))}
        </HorizontalScroll>
      </div>
    </>
  );
};

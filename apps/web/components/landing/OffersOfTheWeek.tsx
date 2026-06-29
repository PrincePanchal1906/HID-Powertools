import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/types/catalog';
import { OffersProductCard } from '../products/OffersProductCard';

export default function OffersOfTheWeek({ products }: { products: Product[] }) {
  if (!products || products.length === 0) return null;

  return (
    <section className="w-full bg-white pt-8 pb-10 lg:hidden border-b border-gray-100">
      <div className="flex items-center justify-between px-4 mb-6">
        <h2 className="text-[15px] font-black text-gray-900 tracking-tight uppercase flex items-center gap-1">
          Offers of the Week
        </h2>
        <Link 
          href="/products"
          className="text-gray-500 text-[10px] font-bold flex items-center gap-1 hover:text-[#D42B2B] uppercase tracking-[0.1em]"
        >
          View all <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="flex overflow-x-auto snap-x snap-mandatory px-4 gap-4 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {products.map((product) => (
          <div key={product.id} className="snap-start shrink-0 w-[42vw] min-w-[160px] max-w-[180px] h-full flex">
            <OffersProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}

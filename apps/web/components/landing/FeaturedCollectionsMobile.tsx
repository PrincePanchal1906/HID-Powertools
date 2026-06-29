import React from "react";
import Link from "next/link";
import Image from "next/image";

export const FeaturedCollectionsMobile = () => {
  const collections = [
    { title: "Heavy Duty Drills", image: "/images/hero-tool-light.png", link: "/categories" },
    { title: "Grinders & Saws", image: "/placeholder.svg", link: "/categories" },
  ];

  return (
    <div className="w-full bg-[#f8f9fc] px-4 py-10 lg:hidden">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[14px] font-black text-gray-900 tracking-tight uppercase">
          Featured Collections
        </h2>
      </div>
      
      <div className="flex flex-col gap-4">
        {collections.map((item, idx) => (
          <Link 
            key={idx} 
            href={item.link}
            className="relative w-full h-[140px] rounded-2xl bg-white overflow-hidden shadow-sm active:scale-95 transition-transform border border-gray-100 flex items-center p-4"
          >
            <div className="flex-1 z-10">
              <h3 className="text-lg font-black text-gray-900 leading-tight w-[70%] uppercase">{item.title}</h3>
              <span className="text-[11px] font-bold text-[#D42B2B] mt-2 inline-block tracking-wider uppercase">Shop Now &rarr;</span>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-center p-2 opacity-90 mix-blend-multiply">
              <div className="relative w-full h-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain translate-x-4 scale-110"
                />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none" />
          </Link>
        ))}
      </div>
    </div>
  );
};

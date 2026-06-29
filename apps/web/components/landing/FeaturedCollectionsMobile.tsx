import React from "react";
import Link from "next/link";
import Image from "next/image";

export const FeaturedCollectionsMobile = () => {
  const collections = [
    { 
      title: "Heavy Duty Drills", 
      subtitle: "Power through any material",
      image: "/images/hero-tool-light.png", 
      link: "/categories" 
    },
    { 
      title: "Grinders & Saws", 
      subtitle: "Precision cutting tools",
      image: "/images/grinder-transparent.png", 
      link: "/categories" 
    },
  ];

  return (
    <div className="w-full bg-white lg:hidden">
      <div className="flex flex-col">
        {collections.map((item, idx) => (
          <Link 
            key={idx} 
            href={item.link}
            className="relative w-full h-[220px] bg-[#f4f5f7] overflow-hidden group border-b border-gray-100 block"
          >
            {/* Dark overlay for contrast if we had real photos, but we use tool renders so we keep it light */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/60 to-transparent z-10" />
            
            <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[70%] h-[120%] z-0 pointer-events-none opacity-80 mix-blend-multiply">
              <div className="relative w-full h-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <div className="absolute inset-0 p-[24px] flex flex-col justify-center z-20 w-[75%]">
              <div className="flex items-center gap-[16px] mb-[8px]">
                <span className="text-[10px] font-black text-[#D42B2B] tracking-widest uppercase bg-black/40 px-[8px] py-[4px] rounded-[4px]">
                  /// EQUIPMENT
                </span>
              </div>
              <h3 className="text-[28px] font-black text-white leading-[1.05] uppercase mb-[8px] font-['var(--font-barlow-condensed)'] tracking-tight">{item.title}</h3>
              <p className="text-[15px] text-gray-300 mb-[16px] leading-tight font-medium">{item.subtitle}</p>
              <span className="text-[11px] font-bold text-[#D42B2B] uppercase tracking-widest w-fit hover:text-white transition-colors">
                View Loadout &rarr;
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

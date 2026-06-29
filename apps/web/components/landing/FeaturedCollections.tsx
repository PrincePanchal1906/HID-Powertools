import React from "react";
import Link from "next/link";
import Image from "next/image";

export const FeaturedCollections = () => {
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
    <section className="w-full bg-white lg:py-[120px] lg:px-[5%] xl:px-[8%] max-w-[1920px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-[32px]">
        {collections.map((item, idx) => (
          <Link 
            key={idx} 
            href={item.link}
            className="relative w-full h-[220px] lg:h-[450px] bg-[#f4f5f7] lg:rounded-[4px] overflow-hidden group border-b border-gray-100 lg:border-none block"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/60 to-transparent z-10 transition-opacity group-hover:from-gray-900/95" />
            
            <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[70%] h-[120%] lg:w-[80%] lg:right-[-5%] lg:scale-[1.05] z-0 pointer-events-none opacity-80 mix-blend-multiply transition-transform duration-700 group-hover:scale-[1.1]">
              <div className="relative w-full h-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain lg:object-right"
                />
              </div>
            </div>

            <div className="absolute inset-0 p-[24px] lg:p-[56px] flex flex-col justify-center z-20 w-[75%] lg:w-[65%]">
              <div className="flex items-center gap-[16px] mb-[8px] lg:mb-[16px]">
                <span className="text-[10px] lg:text-[12px] font-black text-[#D42B2B] tracking-widest uppercase bg-black/40 px-[8px] py-[4px] rounded-[4px]">
                  /// EQUIPMENT
                </span>
              </div>
              <h3 className="text-[28px] lg:text-[48px] font-black text-white leading-[1.05] uppercase mb-[8px] lg:mb-[16px] font-['var(--font-barlow-condensed)'] tracking-tight">{item.title}</h3>
              <p className="text-[15px] lg:text-[18px] text-gray-300 mb-[16px] lg:mb-[32px] leading-tight font-medium">{item.subtitle}</p>
              <span className="text-[11px] lg:text-[14px] font-bold text-[#D42B2B] uppercase tracking-widest w-fit hover:text-white transition-colors flex items-center gap-2">
                View Loadout <span className="text-[16px]">&rarr;</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

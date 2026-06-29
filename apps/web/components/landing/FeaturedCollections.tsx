import React from "react";
import Link from "next/link";
import Image from "next/image";

export const FeaturedCollections = () => {
  const collections = [
    { 
      title: "DRILL COLLECTION",
      image: "/images/hero-tool-light.png", 
      link: "/products?category=drills",
      theme: "light",
      size: "large"
    },
    { 
      title: "ANGLE GRINDER COLLECTION", 
      image: "/images/hero-grinder.png", 
      link: "/products?category=grinders",
      theme: "dark",
      size: "small"
    },
    { 
      title: "ROTARY HAMMER COLLECTION", 
      image: "/images/hero-hammer-light.png", 
      link: "/products?category=hammers",
      theme: "light",
      size: "small"
    },
    { 
      title: "PROFESSIONAL SERIES", 
      subtitle: "BUILT TO OUTLAST.",
      image: "/images/hero-tool.png", 
      link: "/products?category=professional",
      theme: "dark",
      size: "large"
    },
  ];

  return (
    <section className="w-full bg-white lg:py-24">
      {/* Container removing px constraints on mobile for full bleed, keeping it on desktop */}
      <div className="w-full max-w-[1920px] mx-auto px-0 lg:px-[5%] xl:px-[8%]">
        
        {/* Magazine Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-[24px] xl:gap-[32px]">
          
          {collections.map((item, idx) => {
            const isLight = item.theme === "light";
            const isLarge = item.size === "large";

            return (
              <Link 
                key={idx} 
                href={item.link}
                className={`
                  relative block overflow-hidden group 
                  transition-transform duration-500 ease-out 
                  lg:hover:-translate-y-1 lg:hover:scale-[1.02]
                  ${isLarge ? "col-span-1 lg:col-span-2" : "col-span-1"}
                  ${isLight ? "bg-[#f4f5f7] text-gray-900" : "bg-[#0D0D0D] text-white"}
                  ${isLarge ? "h-[220px] sm:h-[350px] lg:h-[550px]" : "h-[200px] sm:h-[350px] lg:h-[550px]"}
                `}
              >
                
                {/* Content */}
                <div className="absolute inset-0 p-[16px] sm:p-[48px] lg:p-[64px] flex flex-col justify-center z-20 w-[65%] sm:w-[60%] lg:w-[50%]">
                  <h3 className="text-[28px] sm:text-[48px] lg:text-[64px] font-black leading-[0.9] uppercase font-['var(--font-barlow-condensed)'] tracking-tight mb-[12px] lg:mb-[16px]">
                    {item.title}
                  </h3>
                  
                  {item.subtitle && (
                    <p className={`text-[12px] lg:text-[20px] font-bold tracking-widest uppercase mb-[16px] lg:mb-[24px] ${isLight ? "text-gray-600" : "text-gray-400"}`}>
                      {item.subtitle}
                    </p>
                  )}

                  <span className={`text-[12px] lg:text-[16px] font-bold uppercase tracking-widest flex items-center gap-2 mt-2 lg:mt-8 transition-colors ${isLight ? "text-gray-900 group-hover:text-[#D42B2B]" : "text-white group-hover:text-[#D42B2B]"}`}>
                    View Collection <span className="text-[14px] lg:text-[18px]">&rarr;</span>
                  </span>
                </div>

                {/* Product Image */}
                <div className={`
                  absolute top-1/2 -translate-y-1/2 pointer-events-none z-10
                  ${isLarge 
                    ? "right-[-15%] sm:right-0 w-[80%] sm:w-[55%] lg:w-[50%] h-[120%] sm:h-[130%]" 
                    : "right-[-25%] sm:right-[-10%] w-[90%] sm:w-[80%] h-[120%]"}
                `}>
                  <div className="relative w-full h-full">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className={`object-contain ${isLarge ? "lg:object-right" : "lg:object-center"} drop-shadow-2xl mix-blend-normal`}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>

              </Link>
            )
          })}

        </div>
      </div>
    </section>
  );
};

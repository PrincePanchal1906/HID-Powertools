"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Gauge } from "lucide-react";
import dynamic from 'next/dynamic'

const AdminSectionWrapper = dynamic(() => import('../admin/visual/AdminSectionWrapper').then(m => m.AdminSectionWrapper), { ssr: false })

export interface CarouselItem {
  id: string | number;
  slug?: string;
  category: string;
  name: string;
  description?: string;
  price?: number;
  compare_price?: number;
  image: string;
}

export interface HeroSectionProps {
  initialItems?: CarouselItem[];
  isAdmin?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ isAdmin }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Hardcoded premium brand hero slides, NOT products.
  const heroSlides = [
    {
      id: "slide-1",
      eyebrow: "PROFESSIONAL GRADE",
      titleLine1: "BUILT TO",
      titleLine2: "OUTLAST",
      description: "Powerful. Reliable. Tough.\nEngineered for professionals\nwho demand more.",
      image: "/images/hero-tool-light.png",
      primaryButton: "Shop Tools",
      primaryLink: "/products",
      secondaryButton: "Explore Solutions",
      secondaryLink: "/categories"
    },
    {
      id: "slide-2",
      eyebrow: "HEAVY DUTY",
      titleLine1: "UNLEASH",
      titleLine2: "POWER",
      description: "Industrial grade performance\nfor the most demanding\nconstruction sites.",
      image: "/images/hero-tool-light.png",
      primaryButton: "View Collection",
      primaryLink: "/categories",
      secondaryButton: "Learn More",
      secondaryLink: "/about"
    },
    {
      id: "slide-3",
      eyebrow: "PRECISION",
      titleLine1: "ENGINEERED",
      titleLine2: "EXCELLENCE",
      description: "Flawless accuracy combined\nwith extreme durability.\nMaster your craft.",
      image: "/images/hero-tool-light.png",
      primaryButton: "Discover Series",
      primaryLink: "/products",
      secondaryButton: "Watch Video",
      secondaryLink: "#video"
    }
  ];

  // Auto-scroll every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const width = container.clientWidth;
        let nextIndex = activeIndex + 1;
        
        if (nextIndex >= heroSlides.length) {
          nextIndex = 0;
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollTo({ left: nextIndex * width, behavior: 'smooth' });
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [activeIndex, heroSlides.length]);

  // Update active dot on manual scroll
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const index = Math.round(container.scrollLeft / container.clientWidth);
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  const HeroInner = (
    <section id="hero-section" className="relative w-full bg-[#0a0a0a] h-[100dvh] min-h-[600px] max-h-[850px] flex flex-col overflow-hidden text-white">
      
      {/* Dark Industrial Background with Red Accents */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] opacity-20" />
        <div className="absolute top-[10%] -left-[20%] w-[60%] h-[50%] bg-[#D42B2B] rounded-full mix-blend-screen blur-[120px] opacity-[0.15]" />
        <div className="absolute bottom-[20%] -right-[20%] w-[70%] h-[60%] bg-[#111111] rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/30 via-transparent to-[#0a0a0a] z-0" />
      </div>

      {/* Snap Container */}
      <div 
        ref={scrollContainerRef}
        className="w-full h-full flex overflow-x-auto snap-x snap-mandatory hide-scrollbar z-10 relative pt-[90px] pb-6"
        style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
        onScroll={handleScroll}
      >
        {heroSlides.map((slide, idx) => (
          <div key={slide.id} className="w-full h-full shrink-0 snap-center snap-always flex flex-col justify-between relative px-6">
            
            {/* Top Content (Eyebrow, Headline, Subtitle) */}
            <div className="flex flex-col relative z-20 mt-2">
              {/* Eyebrow */}
              <div className="flex items-center mb-5">
                <div className="border border-[#D42B2B]/40 bg-[#D42B2B]/10 px-3 py-1.5 rounded-full flex items-center gap-2 backdrop-blur-sm shadow-[0_0_15px_rgba(212,43,43,0.15)]">
                  <div className="w-1.5 h-1.5 bg-[#D42B2B] rounded-full shadow-[0_0_8px_#D42B2B]" />
                  <span className="text-[#D42B2B] font-black tracking-[0.2em] text-[10px] uppercase">
                    {slide.eyebrow}
                  </span>
                </div>
              </div>

              {/* Headline */}
              <h1 className="font-black uppercase font-['var(--font-barlow-condensed)'] text-[56px] sm:text-[68px] leading-[0.9] tracking-tight mb-4 drop-shadow-2xl">
                <span className="block text-white">{slide.titleLine1}</span>
                <span className="block text-[#D42B2B]">{slide.titleLine2}</span>
              </h1>

              {/* Subtitle */}
              <p className="text-gray-400 text-[13px] leading-[1.6] max-w-[260px] font-medium">
                {slide.description.replace(/\n/g, ' ')}
              </p>
            </div>

            {/* Product Image (Absolute positioning, ~45% visual area) */}
            <div className="absolute right-[-20px] top-[26%] sm:top-[22%] w-[80%] max-w-[340px] aspect-square pointer-events-none z-10">
              <Image 
                src={slide.image} 
                alt={slide.titleLine1 + " " + slide.titleLine2} 
                fill 
                priority={idx === 0}
                className="object-contain drop-shadow-[0_40px_50px_rgba(0,0,0,0.9)] mix-blend-normal"
                sizes="(max-width: 768px) 80vw"
              />
            </div>
            
            {/* Bottom Content (Trust Features, CTAs) */}
            <div className="flex flex-col w-full relative z-20 mt-auto pb-4">
              {/* Trust Features (Max 2 compact items) */}
              <div className="flex items-center gap-8 mb-7 pt-7 border-t border-white/10 w-max">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-gray-400" />
                  <span className="text-white/80 text-[10px] font-bold uppercase tracking-[0.1em] leading-tight">Built<br/>Tough</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Gauge className="w-5 h-5 text-gray-400" />
                  <span className="text-white/80 text-[10px] font-bold uppercase tracking-[0.1em] leading-tight">Max<br/>Power</span>
                </div>
              </div>

              {/* CTAs (Centered, premium) */}
              <div className="flex flex-col gap-3 w-full max-w-[320px] mx-auto">
                <Link 
                  href={slide.primaryLink}
                  className="bg-[#D42B2B] hover:bg-[#b82323] text-white py-3.5 rounded-[12px] font-bold transition-all flex items-center justify-center gap-2 text-[14px] active:scale-[0.98] shadow-[0_8px_25px_rgba(212,43,43,0.35)] w-full"
                >
                  {slide.primaryButton} <ArrowRight size={16} />
                </Link>
                <Link 
                  href={slide.secondaryLink}
                  className="bg-transparent border border-white/20 hover:bg-white/5 text-white py-3.5 rounded-[12px] font-bold transition-all flex items-center justify-center gap-2 text-[14px] active:scale-[0.98] w-full"
                >
                  {slide.secondaryButton}
                </Link>
              </div>
            </div>
            
          </div>
        ))}
      </div>

      {/* Pagination Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2.5 z-20 pointer-events-none">
        {heroSlides.map((_, i) => (
          <div 
            key={i} 
            className={`h-[3px] rounded-full transition-all duration-300 ${
              i === activeIndex ? 'bg-[#D42B2B] w-8 shadow-[0_0_8px_#D42B2B]' : 'bg-white/30 w-2'
            }`}
          />
        ))}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );

  if (isAdmin) {
    return (
      <AdminSectionWrapper 
        drawerId="hero_manager" 
        buttonText="Manage Hero Products"
        className="block"
      >
        {HeroInner}
      </AdminSectionWrapper>
    )
  }

  return HeroInner;
};

export default HeroSection;

"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import dynamic from 'next/dynamic'
import { useVisualCMS } from "../admin/visual/VisualCMSProvider";

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
    <section className="relative w-full bg-[#f8f9fc] min-h-[450px] h-[100dvh] max-h-[600px] flex flex-col overflow-hidden">
      
      {/* Background with subtle grid/texture for premium feel */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#D42B2B]/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-blue-500/5 rounded-full blur-[80px]" />
      </div>

      {/* Snap Container */}
      <div 
        ref={scrollContainerRef}
        className="w-full h-full flex overflow-x-auto snap-x snap-mandatory hide-scrollbar z-10 relative pt-[70px]"
        style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
        onScroll={handleScroll}
      >
        {heroSlides.map((slide, idx) => (
          <div key={slide.id} className="w-full h-full shrink-0 snap-center snap-always flex relative items-center pb-12">
            
            {/* Right: Absolute Image Section (Creative placement) */}
            <div className="absolute right-[-60px] top-1/2 -translate-y-[55%] w-[320px] h-[320px] pointer-events-none z-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] bg-white rounded-full blur-[40px]" />
              <Image 
                src={slide.image} 
                alt={slide.titleLine1 + " " + slide.titleLine2} 
                fill 
                priority={idx === 0}
                className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)] mix-blend-darken scale-110"
                sizes="(max-width: 768px) 100vw"
              />
            </div>

            {/* Left: Content Section */}
            <div className="flex flex-col px-5 z-10 w-[65%] mt-[-40px]">
              {/* Eyebrow */}
              <div className="flex items-center mb-2">
                <div className="w-1 h-3.5 bg-[#D42B2B] mr-2 shadow-[0_0_8px_rgba(212,43,43,0.3)] rounded-full" />
                <span className="text-[#D42B2B] font-bold tracking-[0.15em] text-[9px] uppercase">
                  {slide.eyebrow}
                </span>
              </div>

              {/* Slogan */}
              <h1 className="font-black uppercase font-['var(--font-barlow-condensed)'] text-[46px] leading-[0.85] tracking-tight mb-3">
                <span className="block text-gray-900 drop-shadow-sm">{slide.titleLine1}</span>
                <span className="block text-[#D42B2B] drop-shadow-sm">{slide.titleLine2}</span>
              </h1>

              {/* Subtitle */}
              <p className="text-gray-500 text-[11px] leading-[1.5] max-w-[160px] font-medium mb-6">
                {slide.description.replace(/\n/g, ' ')}
              </p>

              {/* 2 CTA Buttons */}
              <div className="flex flex-col gap-2 w-max">
                <Link 
                  href={slide.primaryLink}
                  className="bg-[#D42B2B] text-white px-5 py-2.5 rounded-[8px] font-bold transition-transform flex items-center justify-center gap-2 text-[12px] active:scale-[0.98] shadow-[0_6px_15px_rgba(212,43,43,0.25)]"
                >
                  {slide.primaryButton} <ArrowRight size={14} />
                </Link>
                <Link 
                  href={slide.secondaryLink}
                  className="bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-[8px] font-bold transition-colors flex items-center justify-center text-[12px] active:bg-gray-50 shadow-sm"
                >
                  {slide.secondaryButton}
                </Link>
              </div>
            </div>
            
          </div>
        ))}
      </div>

      {/* Pagination Indicators */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20 pointer-events-none">
        {heroSlides.map((_, i) => (
          <div 
            key={i} 
            className={`h-[4px] rounded-full transition-all duration-300 ${
              i === activeIndex ? 'bg-[#D42B2B] w-6' : 'bg-gray-300 w-1.5'
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

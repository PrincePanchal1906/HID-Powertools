"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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

export const HeroSection: React.FC<HeroSectionProps> = ({ initialItems, isAdmin }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const defaultSlides = [
    {
      id: "slide-1",
      eyebrow: "/// HEAVY DUTY",
      titleLine1: "CIRCULAR",
      titleLine2: "SAW",
      highlight: "1500W",
      description: "Precision cutting for woodworking professionals.",
      image: "/images/hero-tool-light.png",
      primaryButton: "View Collection",
      primaryLink: "/products",
      secondaryButton: "Learn More",
      secondaryLink: "/about"
    }
  ];

  const slides = initialItems && initialItems.length > 0 
    ? initialItems.map((item, idx) => {
        const words = item.name.split(' ');
        const highlight = words.length > 1 ? words.pop() : "";
        const mainTitle = words.join(' ');
        
        const mainWords = mainTitle.split(' ');
        const mid = Math.ceil(mainWords.length / 2);
        const line1 = mainWords.length === 1 ? mainWords[0] : mainWords.slice(0, mid).join(' ');
        const line2 = mainWords.length === 1 ? "" : mainWords.slice(mid).join(' ');

        return {
          id: item.id || `slide-${idx}`,
          eyebrow: "/// HEAVY DUTY",
          titleLine1: (line1 || "").toUpperCase(),
          titleLine2: (line2 || "").toUpperCase(),
          highlight: highlight?.toUpperCase(),
          description: item.description || "Precision cutting for woodworking professionals.",
          image: item.image,
          primaryButton: "View Collection",
          primaryLink: `/products/${item.slug || ''}`,
          secondaryButton: "Learn More",
          secondaryLink: `/products/${item.slug || ''}`
        };
      })
    : defaultSlides;

  // Auto-scroll every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const width = container.clientWidth;
        let nextIndex = activeIndex + 1;
        
        if (nextIndex >= slides.length) {
          nextIndex = 0;
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollTo({ left: nextIndex * width, behavior: 'smooth' });
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [activeIndex, slides.length]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const index = Math.round(container.scrollLeft / container.clientWidth);
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  const HeroInner = (
    <section id="hero-section" className="relative w-full bg-[#f4f5f7] h-[100dvh] min-h-[650px] max-h-[850px] flex flex-col overflow-hidden text-gray-900 pb-12">
      
      {/* Light Background with Lightning Accent */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        {/* Abstract Lightning Bolt Shape */}
        <div className="absolute top-[10%] right-[-10%] w-[80%] h-[90%] opacity-[0.12] text-[#D42B2B]">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full fill-current">
            <polygon points="60,0 100,0 40,60 70,60 20,100 50,40 20,40" />
          </svg>
        </div>
      </div>

      {/* Snap Container */}
      <div 
        ref={scrollContainerRef}
        className="w-full h-full flex overflow-x-auto snap-x snap-mandatory hide-scrollbar z-10 relative pt-[100px]"
        style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
        onScroll={handleScroll}
      >
        {slides.map((slide, idx) => (
          <div key={slide.id} className="w-full h-full shrink-0 snap-center snap-always flex flex-col justify-start relative px-5">
            
            {/* Top Content */}
            <div className="flex flex-col relative z-20 mt-4 max-w-[65%] md:max-w-[50%]">
              {/* Eyebrow */}
              <div className="mb-2">
                <span className="text-[#D42B2B] font-black tracking-widest text-[12px] uppercase">
                  {slide.eyebrow}
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-black uppercase font-['var(--font-barlow-condensed)'] text-[52px] sm:text-[68px] leading-[0.85] tracking-tight mb-4 text-[#0F172A]">
                <span className="block">{slide.titleLine1}</span>
                <span className="block">{slide.titleLine2}</span>
                {slide.highlight && <span className="block text-[#D42B2B]">{slide.highlight}</span>}
              </h1>

              {/* Subtitle */}
              <p className="text-gray-600 text-[13px] leading-snug font-medium mb-6">
                {slide.description}
              </p>
              
              {/* CTAs */}
              <div className="flex flex-col gap-3 w-[150px]">
                <Link 
                  href={slide.primaryLink}
                  className="bg-[#D42B2B] hover:bg-[#b82323] text-white py-3 rounded-[6px] font-bold transition-all flex items-center justify-between px-4 text-[13px] shadow-sm w-full"
                >
                  {slide.primaryButton} <ArrowRight size={16} />
                </Link>
                <Link 
                  href={slide.secondaryLink}
                  className="bg-white border-[1.5px] border-gray-900 text-gray-900 hover:bg-gray-50 py-[10px] rounded-[6px] font-bold transition-all flex items-center justify-between px-4 text-[13px] w-full"
                >
                  {slide.secondaryButton} <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Product Image */}
            <div className="absolute right-[-15%] top-[18%] w-[85%] max-w-[400px] aspect-square pointer-events-none z-10 flex items-center justify-center">
              <div className="relative w-full h-full">
                <Image 
                  src={slide.image} 
                  alt={slide.titleLine1 + " " + slide.titleLine2} 
                  fill 
                  priority={idx === 0}
                  className="object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.2)] z-20 mix-blend-multiply"
                  sizes="(max-width: 768px) 85vw, 400px"
                />
              </div>
            </div>
            
          </div>
        ))}
      </div>

      {/* Pagination Indicators */}
      <div className="absolute bottom-[8%] left-0 right-0 flex justify-center gap-2 z-20 pointer-events-none">
        {slides.map((_, i) => (
          <div 
            key={i} 
            className={`h-[4px] rounded-full transition-all duration-300 ${
              i === activeIndex ? 'bg-[#D42B2B] w-8' : 'bg-gray-300 w-2'
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

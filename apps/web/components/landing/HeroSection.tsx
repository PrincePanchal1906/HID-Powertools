"use client";

import React, { useState, useEffect } from "react";
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
  
  const defaultImages = ["/images/hero-tool-light.png"];
  
  const images = initialItems && initialItems.length > 0 
    ? initialItems.map(item => item.image)
    : defaultImages;

  // Auto-scroll every 4 seconds
  useEffect(() => {
    if (images.length <= 1) return;
    
    const interval = setInterval(() => {
      setActiveIndex(current => (current + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

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

      {/* Main Container */}
      <div className="w-full h-full flex flex-col justify-start relative px-[16px] pt-[100px] z-10">
        
        {/* Top Content (Static Brand Statement) */}
        <div className="flex flex-col relative z-20 mt-4 max-w-[65%] md:max-w-[50%]">
          {/* Eyebrow */}
          <div className="mb-[16px]">
            <span className="text-[#D42B2B] font-black tracking-widest text-[12px] uppercase">
              /// HEAVY DUTY
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-black uppercase font-['var(--font-barlow-condensed)'] text-[56px] sm:text-[68px] leading-[0.85] tracking-tight mb-[16px] text-[#0F172A]">
            <span className="block">UNLEASH</span>
            <span className="block">POWER</span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-600 text-[16px] leading-snug font-medium mb-[24px]">
            Industrial grade performance for the most demanding construction sites.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col gap-[16px] w-[150px]">
            <Link 
              href="/products"
              className="bg-[#D42B2B] hover:bg-[#b82323] text-white py-3 rounded-[6px] font-bold transition-all flex items-center justify-between px-4 text-[15px] shadow-sm w-full"
            >
              View Collection <ArrowRight size={16} />
            </Link>
            <Link 
              href="/about"
              className="bg-white border-[1.5px] border-gray-900 text-gray-900 hover:bg-gray-50 py-[10px] rounded-[6px] font-bold transition-all flex items-center justify-between px-4 text-[15px] w-full"
            >
              Learn More <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Fading Images Container */}
        <div className="absolute right-[-15%] top-[18%] w-[85%] max-w-[400px] aspect-square pointer-events-none z-10 flex items-center justify-center">
          <div className="relative w-full h-full">
            {images.map((src, idx) => (
              <div 
                key={`${src}-${idx}`}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === activeIndex ? 'opacity-100' : 'opacity-0'}`}
              >
                <Image 
                  src={src} 
                  alt="HID Powertools Professional Equipment"
                  fill 
                  priority={idx === 0}
                  className="object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.2)] mix-blend-multiply"
                  sizes="(max-width: 768px) 85vw, 400px"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination Indicators */}
      <div className="absolute bottom-[8%] left-0 right-0 flex justify-center gap-2 z-20 pointer-events-none">
        {images.map((_, i) => (
          <div 
            key={i} 
            className={`h-[4px] rounded-full transition-all duration-300 ${
              i === activeIndex ? 'bg-[#D42B2B] w-8' : 'bg-gray-300 w-2'
            }`}
          />
        ))}
      </div>
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

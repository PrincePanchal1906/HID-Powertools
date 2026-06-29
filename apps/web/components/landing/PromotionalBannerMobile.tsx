"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import dynamic from 'next/dynamic'
import { useVisualCMS } from "../admin/visual/VisualCMSProvider";

const AdminSectionWrapper = dynamic(() => import('../admin/visual/AdminSectionWrapper').then(m => m.AdminSectionWrapper), { ssr: false })

export default function PromotionalBannerMobile({ isAdmin = false }: { isAdmin?: boolean }) {
  const { content } = useVisualCMS();
  
  const bannerData = content['mobile_promo_banner'] || {
    eyebrow: 'LIMITED TIME OFFER ///',
    titleLine1: 'UP TO 30% OFF',
    titleLine2: 'PRO KITS',
    subtitle: 'Upgrade your toolkit today.',
    ctaText: 'Shop Deals',
    ctaLink: '/products',
    image: '/images/hero-tool-light.png' 
  };

  const BannerInner = (
    <section className="w-full bg-[#D42B2B] relative overflow-hidden flex flex-col justify-center min-h-[160px] lg:min-h-[400px]">
      <div className="absolute inset-0 bg-[url('/images/pattern-grid.svg')] opacity-10" />
      
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#b82323] to-transparent z-10" />

      <div className="z-20 flex flex-col relative max-w-[65%] lg:max-w-[40%] pl-[24px] lg:pl-[10%] xl:pl-[15%] py-[24px] lg:py-[80px]">
        <div className="flex items-center gap-[16px] mb-[8px] lg:mb-[24px]">
          <span className="text-[12px] lg:text-[14px] font-black text-white/80 tracking-widest uppercase bg-black/20 px-[8px] lg:px-[12px] py-[4px] lg:py-[6px] rounded-[4px]">
            {bannerData.eyebrow}
          </span>
        </div>
        
        <h3 className="text-white font-black uppercase text-[28px] lg:text-[56px] leading-[1.05] mb-[8px] lg:mb-[24px] tracking-tight font-['var(--font-barlow-condensed)']">
          <span className="block">{bannerData.titleLine1}</span>
          <span className="block text-black">{bannerData.titleLine2}</span>
        </h3>
        
        <p className="text-white/90 text-[14px] lg:text-[18px] max-w-[130px] lg:max-w-[300px] mb-[16px] lg:mb-[40px] font-medium leading-tight">
          {bannerData.subtitle}
        </p>
        
        <Link href={bannerData.ctaLink} className="bg-transparent border-[1.5px] border-white text-white text-[14px] lg:text-[16px] font-bold px-[24px] lg:px-[32px] py-[12px] lg:py-[16px] flex items-center justify-center gap-[16px] w-fit hover:bg-white/10 transition-colors uppercase tracking-tight rounded-[4px]">
          {bannerData.ctaText} <ArrowRight size={16} />
        </Link>
      </div>

      {/* Absolute Image */}
      <div className="absolute right-[-20%] lg:right-[5%] xl:right-[15%] top-1/2 -translate-y-1/2 w-[70%] lg:w-[45%] lg:max-w-[600px] h-[120%] lg:h-[140%] z-0 pointer-events-none">
        <Image 
          src={bannerData.image} 
          alt={bannerData.titleLine1} 
          fill 
          className="object-contain drop-shadow-2xl mix-blend-multiply opacity-90 lg:opacity-100"
          sizes="(max-width: 1024px) 70vw, 45vw"
        />
      </div>
    </section>
  );

  if (isAdmin) {
    return (
      <AdminSectionWrapper 
        drawerId="mobile_promo_banner" 
        buttonText="Edit Promotional Banner"
        className="block"
      >
        {BannerInner}
      </AdminSectionWrapper>
    )
  }

  return BannerInner;
}

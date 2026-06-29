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
    <section className="w-full bg-[#D42B2B] relative overflow-hidden flex flex-col justify-center min-h-[220px]">
      <div className="absolute inset-0 bg-[url('/images/pattern-grid.svg')] opacity-10" />
      
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#b82323] to-transparent z-10" />

      <div className="z-20 flex flex-col relative max-w-[65%] pl-[24px] py-[40px]">
        <div className="flex items-center gap-[16px] mb-[16px]">
          <span className="text-[11px] font-black text-white/80 tracking-widest uppercase bg-black/20 px-[8px] py-[4px] rounded-[4px]">
            {bannerData.eyebrow}
          </span>
        </div>
        
        <h3 className="text-white font-black uppercase text-[28px] leading-[1.05] mb-[16px] tracking-tight font-['var(--font-barlow-condensed)']">
          <span className="block">{bannerData.titleLine1}</span>
          <span className="block text-black">{bannerData.titleLine2}</span>
        </h3>
        
        <p className="text-white/90 text-[15px] max-w-[130px] mb-[24px] font-medium leading-tight">
          {bannerData.subtitle}
        </p>
        
        <Link href={bannerData.ctaLink} className="bg-black text-white text-[15px] font-bold px-[24px] py-[12px] flex items-center justify-center gap-[16px] w-fit hover:bg-gray-900 transition-colors uppercase tracking-tight rounded-[4px]">
          {bannerData.ctaText} <ArrowRight size={16} />
        </Link>
      </div>

      {/* Absolute Image */}
      <div className="absolute right-[-20%] top-1/2 -translate-y-1/2 w-[70%] h-[120%] z-0 pointer-events-none">
        <Image 
          src={bannerData.image} 
          alt={bannerData.titleLine1} 
          fill 
          className="object-contain drop-shadow-2xl mix-blend-multiply opacity-90"
          sizes="(max-width: 768px) 50vw"
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

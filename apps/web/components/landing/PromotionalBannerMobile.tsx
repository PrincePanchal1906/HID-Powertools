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
    eyebrow: 'BUILT TO PERFORM ///',
    titleLine1: 'POWER THAT BUILDS',
    titleLine2: 'EVERYTHING',
    subtitle: 'Reliable tools. Maximum performance.',
    ctaText: 'Explore Now',
    ctaLink: '/products',
    image: '/images/hero-tool-light.png' 
  };

  const BannerInner = (
    <section className="w-full px-4 py-4">
      <div className="w-full bg-[#111111] rounded-[16px] p-5 relative overflow-hidden flex flex-col justify-between min-h-[160px] border border-gray-900 shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
        {/* Background Gradient/Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />

        <div className="z-20 flex flex-col relative max-w-[65%]">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-[10px] font-black text-[#D42B2B] tracking-widest uppercase">
              {bannerData.eyebrow}
            </span>
          </div>
          
          <h3 className="text-white font-black uppercase text-[18px] sm:text-[20px] leading-[1.05] mb-2 tracking-tight">
            {bannerData.titleLine1} <br/> <span className="text-[#D42B2B]">{bannerData.titleLine2}</span>
          </h3>
          
          <p className="text-gray-400 text-[10px] sm:text-[11px] max-w-[130px] mb-4 font-medium leading-tight">
            {bannerData.subtitle}
          </p>
          
          <Link href={bannerData.ctaLink} className="bg-black text-white text-[10px] font-bold px-4 py-2.5 rounded-[6px] flex items-center justify-center gap-1.5 w-fit hover:bg-gray-900 transition-colors border border-gray-800 shadow-md">
            {bannerData.ctaText} <ArrowRight size={12} />
          </Link>
        </div>

        {/* Absolute Image */}
        <div className="absolute right-[-15%] top-1/2 -translate-y-1/2 w-[65%] h-[120%] z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#D42B2B]/10 blur-[30px] rounded-full"></div>
          <Image 
            src={bannerData.image} 
            alt={bannerData.titleLine1} 
            fill 
            className="object-contain drop-shadow-2xl mix-blend-normal"
            sizes="(max-width: 768px) 50vw"
          />
        </div>
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

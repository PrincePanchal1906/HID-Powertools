"use client";

import React, { useRef } from "react";
import { ImageWithFallback } from "../ui/ImageWithFallback";
import { motion, useInView, Variants } from "framer-motion";
import { Users, ShoppingBag, Star, Shield, type LucideIcon } from "lucide-react";
import { trustStats, brandLogos } from "../../lib/data/trustData";

const iconMap: Record<string, LucideIcon> = {
  Users,
  ShoppingBag,
  Star,
  Shield,
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const statVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const TrustBar: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="w-full relative z-20 -mt-10 lg:-mt-16">
      {/* SECTION 1 — Stats Floating Row */}
      <div className="w-full px-4 md:px-16" ref={ref}>
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="bg-white/95 backdrop-blur-xl border border-gray-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] rounded-[2rem] p-8 md:p-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 relative overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Subtle inner background glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D42B2B]/3 to-transparent rounded-full blur-[80px] pointer-events-none" />

            {trustStats.map((stat, index) => {
              const Icon = iconMap[stat.icon];
              if (!Icon) return null;

              return (
                <motion.div
                  key={index}
                  variants={statVariants}
                  className="relative pl-6 py-2 flex flex-col group cursor-default transition-transform duration-500 hover:-translate-y-1"
                >
                  {/* Animated Left Border */}
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gray-100 rounded-full overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[#D42B2B] origin-top scale-y-50 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                  </div>

                  {/* Icon */}
                  <div className="mb-4 text-[#D42B2B] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:-rotate-3 w-fit">
                    <Icon strokeWidth={2} size={28} />
                  </div>
                  
                  {/* Metric Value */}
                  <span className="font-black text-3xl md:text-4xl text-[#D42B2B] tracking-tight mb-1 group-hover:text-[#b82323] transition-colors duration-300">
                    {stat.value}
                  </span>
                  
                  {/* Description */}
                  <span className="text-sm text-gray-500 font-medium leading-snug group-hover:text-gray-700 transition-colors duration-300">
                    {stat.label}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* SECTION 2 — Logo Cloud */}
      <div className="w-full bg-[#FAFAFA] pt-24 pb-16 px-4 md:px-16 -mt-16 overflow-hidden relative z-[-1]">
        <h3 className="text-[11px] font-bold tracking-[0.25em] text-gray-400 mb-10 text-center uppercase">
          Trusted Brands We Carry
        </h3>

        {/* Marquee Container */}
        <div 
          className="flex w-full overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
          }}
        >
          {/* w-max ensures the container expands to fit all children, while the CSS animation moves it left */}
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none will-change-transform">
            {[1, 2].map((setIndex) => (
              <div key={setIndex} className="flex gap-4 md:gap-8 pr-4 md:pr-8">
                {brandLogos.map((logo, index) => (
                  <div
                    key={`${logo.name}-${index}`}
                    className="group relative flex items-center justify-center shrink-0 w-[140px] h-[80px] md:w-[200px] md:h-[110px] bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.04)] transition-transform duration-500 ease-out hover:scale-[1.06] hover:-translate-y-[6px] hover:shadow-[0_12px_30px_-10px_rgba(0,0,0,0.1)] cursor-pointer overflow-hidden"
                  >
                    {/* Optional Shine Effect */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-20deg] animate-shine pointer-events-none" 
                      style={{ animationDelay: `${index * 1.2}s` }} 
                    />

                    <ImageWithFallback
                      src={logo.src}
                      alt={logo.name}
                      width={logo.width}
                      height={logo.height}
                      loading="lazy"
                      className="object-contain w-[90px] md:w-[130px] opacity-80 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS for pure CSS marquee and shine */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        @keyframes shine {
          0% { transform: translateX(-150%) skewX(-20deg); }
          15% { transform: translateX(200%) skewX(-20deg); }
          100% { transform: translateX(200%) skewX(-20deg); }
        }
        .animate-shine {
          animation: shine 9s infinite;
        }
      `}} />
    </section>
  );
};

export default TrustBar;

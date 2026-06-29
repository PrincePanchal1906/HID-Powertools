"use client";

import React from "react";
import { ImageWithFallback } from "../ui/ImageWithFallback";
import { motion, useInView, type Variants } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { testimonials, caseStudies, reviewPlatforms } from "../../lib/data/testimonialsData";
import { HorizontalScroll } from "../ui/HorizontalScroll";
import { StarRating } from "@hid/ui/star-rating";
import type { ReviewPlatform, CaseStudy, Testimonial } from "@hid/types";

export interface TestimonialsProps {}

const caseStudyContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const caseStudyVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};


export const Testimonials: React.FC<TestimonialsProps> = () => {
  const caseStudiesRef = React.useRef<HTMLDivElement>(null);
  const isCaseStudiesInView = useInView(caseStudiesRef, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" className="w-full bg-surface-alt overflow-hidden border-t border-gray-100 mt-6 lg:mt-0">
      
      {/* PART A — Section Header (Desktop Only) */}
      <div className="hidden lg:block pt-12 pb-8 md:pt-20 md:pb-12 px-4 md:px-16 text-center">
        <div className="bg-red-50 text-[#D42B2B] text-[10px] sm:text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full inline-block mb-3 md:mb-4">
          REAL PROS. REAL RESULTS.
        </div>
        <h2 className="font-extrabold text-[28px] leading-[1.1] md:text-5xl text-gray-900">
          50,000+ Contractors Can't Be Wrong.
        </h2>
        
        <div className="flex flex-row justify-center gap-6 md:gap-8 mt-5 md:mt-6">
          {reviewPlatforms.map((platform: ReviewPlatform, idx: number) => (
            <React.Fragment key={platform.name}>
              <div className="flex flex-col items-center">
                <span className="font-black text-xl md:text-2xl text-gray-900 leading-none">
                  {platform.rating}
                </span>
                <div className="my-1 scale-[0.8] md:scale-100">
                  <StarRating rating={5} size="sm" />
                </div>
                <span className="text-[10px] md:text-xs text-gray-500 leading-tight">
                  {platform.name}
                  <br className="hidden md:block" />
                  <span className="md:hidden"> - </span>
                  {platform.count}
                </span>
              </div>
              {idx !== reviewPlatforms.length - 1 && (
                <div className="w-px bg-gray-200 my-2" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* PART B — Testimonial Carousel */}
      <div className="relative mt-0 lg:mt-12 w-full max-w-7xl mx-auto">
        
        {/* =========================================
            MOBILE ONLY (lg:hidden)
        ========================================= */}
        <div className="lg:hidden w-full bg-white py-8 border-t border-gray-100">
          <div className="px-5 mb-5 flex items-center justify-between">
            <h2 className="text-[15px] font-black leading-tight uppercase text-gray-900 tracking-tight">
              Trusted By <br/>
              <span className="text-[#D42B2B]">Professionals</span>
            </h2>
            <div className="bg-green-50 text-green-600 px-2 py-1 rounded text-[9px] font-bold uppercase tracking-wider flex items-center gap-1">
               <CheckCircle size={10} /> Verified
            </div>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory px-5 gap-3 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {testimonials.map((testimonial: Testimonial) => (
              <div key={testimonial.id} className="snap-start shrink-0 w-[240px]">
                <div className="flex flex-col bg-[#f8f9fc] rounded-[16px] p-4 border border-gray-100 h-[150px] shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                  <div className="flex items-center gap-1 mb-2">
                    <div className="scale-[0.8] origin-left">
                      <StarRating rating={testimonial.rating} size="sm" />
                    </div>
                  </div>
                  <div className="relative flex-1">
                    <span className="absolute -top-2 left-0 text-[#D42B2B] text-4xl font-serif leading-none select-none opacity-20">"</span>
                    <p className="text-gray-700 text-[12px] font-medium leading-snug italic pl-1 relative z-10 line-clamp-3">
                      {testimonial.quote}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 pt-3 border-t border-gray-200/60 mt-auto">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900 text-[11px] leading-tight mb-0.5">{testimonial.name}</span>
                      <span className="text-gray-500 text-[9px] uppercase tracking-wider font-bold truncate max-w-[200px]">{testimonial.role}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================
            DESKTOP ONLY (hidden lg:block)
        ========================================= */}
        <div className="hidden lg:block">
          <HorizontalScroll className="gap-6 px-16 pb-12">
            {testimonials.map((testimonial: Testimonial) => (
              <div key={testimonial.id} className="flex-none w-[400px] snap-start">
                <div className="flex flex-col justify-between bg-white rounded-[20px] p-8 border border-gray-100 shadow-sm hover:shadow-[0_8px_30px_rgba(212,43,43,0.06)] transition-all duration-300 min-h-[280px] h-full">
                  <div className="flex flex-col flex-1 relative">
                    <div className="flex justify-between items-start mb-4 relative z-10">
                      <div className="scale-100 origin-left">
                        <StarRating rating={testimonial.rating} size="md" />
                      </div>
                      {testimonial.verified && (
                        <div className="flex items-center gap-1 text-xs text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded">
                          <CheckCircle size={10} className="w-3 h-3" />
                          <span>Verified</span>
                        </div>
                      )}
                    </div>
                    <div className="relative flex-1">
                      <span className="absolute -top-3 left-0 text-6xl text-[#D42B2B]/10 font-serif leading-none select-none">"</span>
                      <p className="text-gray-700 text-base leading-relaxed mt-2 italic relative z-10 pl-4">
                        {testimonial.quote}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-50 flex items-center gap-3">
                    <div className="relative w-10 h-10 shrink-0">
                      <ImageWithFallback src={testimonial.avatar} alt={testimonial.name} fill className="rounded-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900 text-sm leading-tight">{testimonial.name}</span>
                      <span className="text-gray-500 text-xs leading-tight mt-0.5">{testimonial.role}, {testimonial.company}</span>
                      <div className="mt-1.5">
                        <span className="bg-gray-50 border border-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-md font-semibold inline-block">{testimonial.tool}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </HorizontalScroll>
        </div>
      </div>

      {/* PART C — Case Studies */}
      <div className="py-10 md:py-16 px-4 md:px-16 max-w-7xl mx-auto bg-[#f8f9fc]" ref={caseStudiesRef}>
        <div className="bg-red-50 text-[#D42B2B] text-[10px] md:text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-3 mx-auto w-max block">
          BEFORE & AFTER
        </div>
        <h3 className="font-bold text-[22px] md:text-3xl text-gray-900 text-center mb-8 md:mb-10 leading-tight">
          See What Changed for Real Contractors
        </h3>

        <motion.div 
          className="flex flex-col gap-5 md:grid md:grid-cols-2 md:gap-8"
          variants={caseStudyContainerVariants}
          initial="hidden"
          animate={isCaseStudiesInView ? "visible" : "hidden"}
        >
          {caseStudies.map((study: CaseStudy) => (
            <motion.div
              key={study.id}
              variants={caseStudyVariants}
              className="bg-white rounded-[20px] border border-gray-100 p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col h-full"
            >
              {/* TOP: Metric callout baseline aligned */}
              <div className="flex items-baseline gap-2 mb-3">
                <div className="font-black text-[42px] text-[#D42B2B] leading-none tracking-tight">
                  {study.metric}
                </div>
                <div className="text-[12px] text-gray-700 font-medium">
                  {study.metricLabel}
                </div>
              </div>

              {/* Title */}
              <h4 className="font-bold text-gray-900 text-[14px] leading-snug pr-4 mb-5">
                {study.title}
              </h4>

              {/* Side-by-Side Horizontal BEFORE/AFTER */}
              <div className="flex flex-row gap-2.5 mb-5 w-full">
                {/* Before Box */}
                <div className="flex-1 bg-[#FFF5F5] border border-[#FF6B6B]/20 rounded-xl p-3 flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-[3px] h-full bg-[#FF6B6B]" />
                  <span className="text-[8px] font-extrabold text-[#FF6B6B] tracking-[0.15em] uppercase mb-1.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B6B] shadow-[0_0_4px_#FF6B6B]" /> BEFORE
                  </span>
                  <p className="text-[9.5px] text-gray-600 leading-[1.45]">{study.before}</p>
                </div>

                {/* After Box */}
                <div className="flex-1 bg-[#F0FDF4] border border-[#22C55E]/20 rounded-xl p-3 flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-[3px] h-full bg-[#22C55E]" />
                  <span className="text-[8px] font-extrabold text-[#22C55E] tracking-[0.15em] uppercase mb-1.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] shadow-[0_0_4px_#22C55E]" /> AFTER
                  </span>
                  <p className="text-[9.5px] text-gray-800 font-medium leading-[1.45]">{study.after}</p>
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-gray-100 mb-4" />

              {/* PERSON row */}
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 bg-gray-50 rounded-full flex items-center justify-center overflow-hidden border border-gray-100 shrink-0">
                  {study.avatar ? (
                    <ImageWithFallback
                      src={study.avatar}
                      alt={study.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[13px] text-gray-900 leading-tight">
                    {study.name}
                  </span>
                  <span className="text-gray-500 text-[11px] leading-tight mt-0.5">
                    {study.role}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
// ✅ FILE COMPLETE

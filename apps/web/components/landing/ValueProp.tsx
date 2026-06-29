"use client";

import React, { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { valuePropContent } from "../../lib/data/valuePropData";
import type { PainPoint } from "@hid/types";

export interface ValuePropProps {}

const leftColVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const closingStatementVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5,
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const rightColContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const ValueProp: React.FC<ValuePropProps> = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const renderHeadline = (text: string) => {
    const parts = text.split("Quit");
    if (parts.length > 1) {
      return (
        <>
          {parts[0]}
          <span className="text-primary underline decoration-primary underline-offset-4">Quit</span>
          {parts[1]}
        </>
      );
    }
    return text;
  };

  return (
    <section id="why-hid" className="w-full border-t border-gray-100 lg:border-none" ref={ref}>
      {/* =========================================
          MOBILE ONLY (lg:hidden)
      ========================================= */}
      <div className="lg:hidden w-full relative bg-gray-900 overflow-hidden py-10 px-5">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#D42B2B]/20 blur-[60px] rounded-full pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/90"></div>
        </div>

        <div className="relative z-10">
          <h2 className="text-[22px] font-black text-white leading-tight uppercase mb-3">
            WHY CHOOSE <br/>
            <span className="text-[#D42B2B]">HID POWERTOOLS?</span>
          </h2>
          <p className="text-gray-300 text-[12px] leading-relaxed mb-8 max-w-[280px]">
            We don't just build tools, we build trust. Every HID product is tested beyond limits to deliver unmatched performance on every job.
          </p>

          <div className="grid grid-cols-2 gap-4 gap-y-8">
            <div className="flex flex-col items-start gap-1">
              <div className="w-10 h-10 rounded-lg border border-white/20 flex items-center justify-center bg-white/5 text-white mb-2 shadow-sm">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              </div>
              <h3 className="text-white font-bold text-[13px]">Heavy Duty</h3>
              <p className="text-gray-400 text-[10px] leading-snug">Built for extreme conditions</p>
            </div>
            
            <div className="flex flex-col items-start gap-1">
              <div className="w-10 h-10 rounded-lg border border-white/20 flex items-center justify-center bg-white/5 text-white mb-2 shadow-sm">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
              </div>
              <h3 className="text-white font-bold text-[13px]">Precision</h3>
              <p className="text-gray-400 text-[10px] leading-snug">Engineered for accuracy</p>
            </div>
            
            <div className="flex flex-col items-start gap-1">
              <div className="w-10 h-10 rounded-lg border border-white/20 flex items-center justify-center bg-white/5 text-white mb-2 shadow-sm">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
              </div>
              <h3 className="text-white font-bold text-[13px]">Durability</h3>
              <p className="text-gray-400 text-[10px] leading-snug">Long-lasting performance</p>
            </div>
            
            <div className="flex flex-col items-start gap-1">
              <div className="w-10 h-10 rounded-lg border border-white/20 flex items-center justify-center bg-white/5 text-white mb-2 shadow-sm">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="M12 8v4l3 3"></path></svg>
              </div>
              <h3 className="text-white font-bold text-[13px]">Service Support</h3>
              <p className="text-gray-400 text-[10px] leading-snug">Reliable support whenever you need</p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================
          DESKTOP ONLY (hidden lg:flex)
      ========================================= */}
      <div className="hidden lg:flex py-10 md:py-24 px-4 md:px-16 max-w-7xl mx-auto flex-col md:flex-row gap-6 md:gap-16">
        
        {/* Left Column */}
        <motion.div
          className="w-full md:w-[40%] md:sticky md:top-24 self-start"
          variants={leftColVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="bg-red-50 text-[#D42B2B] text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full inline-block mb-3 md:mb-4">
            {valuePropContent.badge}
          </div>
          
          <h2 className="font-extrabold text-[26px] leading-[1.1] md:text-5xl text-gray-900">
            {renderHeadline(valuePropContent.headline)}
          </h2>
          
          <p className="text-[14px] md:text-lg text-gray-500 mt-3 md:mt-4 leading-relaxed max-w-md">
            {valuePropContent.subheadline}
          </p>
          
          <motion.div
            variants={closingStatementVariants}
            className="hidden md:block italic text-sm text-gray-400 border-l-4 border-[#D42B2B] pl-4 mt-8"
          >
            {valuePropContent.closingStatement}
          </motion.div>
        </motion.div>

        {/* Right Column */}
        <motion.div
          className="w-full md:w-[60%] flex flex-col gap-4 sm:gap-6"
          variants={rightColContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {valuePropContent.painPoints.map((item: PainPoint) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              className="group bg-[#f8f9fc] md:bg-white rounded-2xl md:rounded-xl border border-gray-100 p-5 md:p-6 transition-all duration-300 ease-in-out hover:border-[#D42B2B] hover:shadow-sm"
            >
              <div className="flex flex-row items-center gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl shrink-0" role="img" aria-label="emoji">
                    {item.emoji}
                  </span>
                  <span className="font-bold text-base line-through text-gray-400 decoration-gray-300">
                    {item.problem}
                  </span>
                </div>
                <ChevronRight className="text-[#D42B2B] shrink-0 mx-3" size={24} />
                <div className="flex items-center">
                  <span className="font-bold text-[#D42B2B] text-base leading-tight">
                    {item.solution}
                  </span>
                </div>
              </div>
              <div className="h-[2px] w-0 group-hover:w-full bg-[#D42B2B] transition-all duration-500 rounded-full mt-4" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ValueProp;
// ✅ FILE COMPLETE

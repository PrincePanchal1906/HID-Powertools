"use client";

import React, { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
// import removed
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



  return (
    <section id="why-hid" className="w-full border-t border-gray-100 lg:border-none" ref={ref}>
      {/* =========================================
          MOBILE ONLY (lg:hidden)
      ========================================= */}
      <div className="lg:hidden w-full relative bg-gray-900 overflow-hidden py-[40px] px-[16px]">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#D42B2B]/20 blur-[60px] rounded-full pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/90"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-[16px] mb-[8px]">
            <span className="text-[11px] font-black text-[#D42B2B] tracking-widest uppercase bg-[#D42B2B]/10 px-[8px] py-[4px] rounded-[4px]">
              /// THE HID DIFFERENCE
            </span>
          </div>
          <h2 className="text-[28px] font-black text-white leading-tight uppercase mb-[16px] font-['var(--font-barlow-condensed)'] tracking-tight">
            WHY CHOOSE <br/>
            <span className="text-[#D42B2B]">HID POWERTOOLS?</span>
          </h2>
          <p className="text-gray-300 text-[15px] leading-relaxed mb-[40px] max-w-[280px]">
            We don't just build tools, we build trust. Every HID product is tested beyond limits to deliver unmatched performance on every job.
          </p>

          <div className="grid grid-cols-2 gap-[16px] gap-y-[32px]">
            <div className="flex flex-col items-start gap-1">
              <div className="w-10 h-10 rounded-[4px] border border-white/20 flex items-center justify-center bg-white/5 text-white mb-2 shadow-sm">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              </div>
              <h3 className="text-white font-bold text-[13px]">Heavy Duty</h3>
              <p className="text-gray-400 text-[10px] leading-snug">Built for extreme conditions</p>
            </div>
            
            <div className="flex flex-col items-start gap-1">
              <div className="w-10 h-10 rounded-[4px] border border-white/20 flex items-center justify-center bg-white/5 text-white mb-2 shadow-sm">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
              </div>
              <h3 className="text-white font-bold text-[13px]">Precision</h3>
              <p className="text-gray-400 text-[10px] leading-snug">Engineered for accuracy</p>
            </div>
            
            <div className="flex flex-col items-start gap-1">
              <div className="w-10 h-10 rounded-[4px] border border-white/20 flex items-center justify-center bg-white/5 text-white mb-2 shadow-sm">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
              </div>
              <h3 className="text-white font-bold text-[13px]">Durability</h3>
              <p className="text-gray-400 text-[10px] leading-snug">Long-lasting performance</p>
            </div>
            
            <div className="flex flex-col items-start gap-1">
              <div className="w-10 h-10 rounded-[4px] border border-white/20 flex items-center justify-center bg-white/5 text-white mb-2 shadow-sm">
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
      <div className="hidden lg:flex py-[120px] px-[5%] xl:px-[8%] max-w-[1920px] mx-auto flex-col md:flex-row gap-[64px]">
        
        {/* Left Column */}
        <motion.div
          className="w-full md:w-[40%] self-start"
          variants={leftColVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="flex items-center gap-[16px] mb-[16px]">
            <span className="text-[12px] font-black text-[#D42B2B] tracking-widest uppercase bg-red-50 px-[12px] py-[6px] rounded-[4px]">
              /// THE HID DIFFERENCE
            </span>
          </div>
          
          <h2 className="font-black text-[48px] xl:text-[64px] leading-[1.05] text-gray-900 uppercase font-['var(--font-barlow-condensed)'] tracking-tight">
            WHY CHOOSE <br/>
            <span className="text-[#D42B2B]">HID POWERTOOLS?</span>
          </h2>
          
          <p className="text-[18px] xl:text-[20px] text-gray-500 mt-[32px] leading-relaxed max-w-md">
            We don't just build tools, we build trust. Every HID product is tested beyond limits to deliver unmatched performance on every job.
          </p>
          
          <motion.div
            variants={closingStatementVariants}
            className="hidden md:block italic text-[16px] text-gray-400 border-l-[4px] border-[#D42B2B] pl-4 mt-[48px]"
          >
            {valuePropContent.closingStatement}
          </motion.div>
        </motion.div>

        {/* Right Column */}
        <motion.div
          className="w-full md:w-[60%] grid grid-cols-2 gap-[24px]"
          variants={rightColContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {valuePropContent.painPoints.map((item: PainPoint) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              className="group bg-[#f8f9fc] rounded-[4px] border border-gray-100 p-[32px] transition-all duration-300 ease-in-out hover:border-[#D42B2B] hover:shadow-md flex flex-col justify-between"
            >
              <div className="flex flex-col gap-[16px]">
                <div className="w-[48px] h-[48px] rounded-[4px] border border-gray-200 flex items-center justify-center bg-white text-gray-900 shadow-sm text-2xl group-hover:scale-110 transition-transform duration-500">
                  {item.emoji}
                </div>
                <h3 className="font-black text-[#D42B2B] text-[20px] uppercase font-['var(--font-barlow-condensed)'] tracking-tight">
                  {item.solution}
                </h3>
              </div>
              <div className="mt-[16px]">
                <p className="font-medium text-[15px] text-gray-500 leading-relaxed">
                  Instead of: <span className="line-through text-gray-400">{item.problem}</span>
                </p>
              </div>
              <div className="h-[2px] w-[24px] group-hover:w-[48px] bg-[#D42B2B] transition-all duration-500 mt-[24px]" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ValueProp;
// ✅ FILE COMPLETE

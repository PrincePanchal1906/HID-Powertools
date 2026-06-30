"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, ArrowUp } from "lucide-react";

import {
  footerColumns,
  footerTagline,
  copyrightYear,
} from "../../lib/data/footerData";
import type { FooterColumn } from "@hid/types";

import {
  VisaIcon,
  MastercardIcon,
  RuPayIcon,
  UpiIcon,
} from "../ui/PaymentIcons";

const FooterAccordion = ({ column }: { column: FooterColumn }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10 md:border-none">
      <button 
        className="w-full flex justify-between items-center py-[16px] md:py-0 md:mb-[20px] text-left md:pointer-events-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-white font-bold tracking-widest text-[13px] md:text-[12px] uppercase">
          {column.title}
        </span>
        <span className="text-white/50 text-[18px] md:hidden">{isOpen ? '−' : '+'}</span>
      </button>
      
      {/* Mobile Accordion Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden md:hidden"
          >
            <ul className="pb-[16px] space-y-[12px]">
              {column.links.map(link => (
                <li key={link.label}>
                   <a href={link.href} className="text-white/60 text-[14px] active:text-white flex items-center gap-2">
                     {link.label}
                     {link.isBadge && <span className="bg-[#D42B2B] text-white text-[9px] px-1.5 py-0.5 rounded uppercase font-bold">{link.badgeText}</span>}
                   </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Grid Content (Always Visible) */}
      <ul className="hidden md:block space-y-[12px]">
        {column.links.map(link => (
          <li key={link.label}>
             <a href={link.href} className="text-white/60 text-[13px] hover:text-white flex items-center gap-2 transition-colors">
               {link.label}
               {link.isBadge && <span className="bg-[#D42B2B] text-white text-[9px] px-1.5 py-0.5 rounded uppercase font-bold">{link.badgeText}</span>}
             </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const Footer: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer role="contentinfo" className="overflow-hidden bg-[#0a0a0a]">
      <div className="max-w-[1920px] mx-auto px-[16px] lg:px-[5%] xl:px-[8%] pt-[32px] md:pt-[64px] pb-[24px]">
        
        {/* Brand Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-[24px] md:mb-[48px] gap-[24px]">
          <div className="w-full md:w-1/3">
            <h2 className="font-black text-[24px] text-white tracking-tight font-['var(--font-barlow-condensed)'] uppercase">
              HID PowerTools
            </h2>
            <p className="text-white/50 text-[13px] md:text-[14px] mt-[8px] max-w-[280px] leading-relaxed">
              {footerTagline}
            </p>
            <div className="mt-[16px] flex flex-col gap-[12px]">
              <a href="tel:+917900000000" className="flex items-center gap-[10px] text-white/70 active:text-white md:hover:text-white transition-colors">
                <Phone size={16} className="text-white/40" />
                <span className="text-[14px] font-medium">+91 79000 00000</span>
              </a>
              <a href="mailto:hello@hidpowertools.com" className="flex items-center gap-[10px] text-white/70 active:text-white md:hover:text-white transition-colors">
                <Mail size={16} className="text-white/40" />
                <span className="text-[14px] font-medium">hello@hidpowertools.com</span>
              </a>
            </div>
          </div>

          {/* Navigation Accordions (Mobile) / Grid (Desktop) */}
          <div className="w-full md:w-2/3">
            <div className="flex flex-col md:grid md:grid-cols-4 md:gap-[32px] border-t border-white/10 md:border-none">
              {footerColumns.map((col) => (
                <FooterAccordion key={col.id} column={col} />
              ))}
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="flex justify-center md:justify-end gap-[24px] py-[24px] border-t border-white/10">
          <UpiIcon className="h-[20px] w-auto text-white/30 grayscale opacity-70" />
          <VisaIcon className="h-[20px] w-auto text-white/30 grayscale opacity-70" />
          <MastercardIcon className="h-[20px] w-auto text-white/30 grayscale opacity-70" />
          <RuPayIcon className="h-[20px] w-auto text-white/30 grayscale opacity-70" />
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-[12px] pt-[24px] border-t border-white/10">
          <div className="text-white/30 text-[12px] font-medium">
            © {copyrightYear} HID PowerTools
          </div>
          <div className="flex items-center gap-[24px] text-white/30 text-[12px] font-medium">
            <a href="/privacy" className="active:text-white md:hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms" className="active:text-white md:hover:text-white transition-colors">Terms & Conditions</a>
          </div>
        </div>

      </div>

      {/* BACK TO TOP BUTTON */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            aria-label="Back to top"
            className="fixed bottom-[24px] right-[24px] z-30 bg-[#D42B2B] text-white rounded-full w-[44px] h-[44px] flex items-center justify-center shadow-lg shadow-black/40 active:scale-95 md:hover:bg-red-700 md:hover:scale-105 transition-all duration-200"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
// ✅ FILE COMPLETE

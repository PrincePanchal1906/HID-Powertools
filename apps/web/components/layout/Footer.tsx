"use client";

import React, { useState, useEffect, useRef } from "react";
import { ImageWithFallback } from "../ui/ImageWithFallback";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Loader2,
  CheckCircle,
  Lock,
  FileText,
  ArrowUp,
  ChevronDown,
  ExternalLink,
} from "lucide-react";

const FacebookIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const InstagramIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const YoutubeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
);

const LinkedinIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

const TwitterIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);

import {
  footerColumns,
  socialLinks,
  contactDetails,
  paymentMethods,
  footerTagline,
  copyrightYear,
} from "../../lib/data/footerData";
import type { FooterColumn, FooterLink, SocialLink, ContactDetail, PaymentMethod } from "@hid/types";

const iconMap: Record<string, React.FC<any>> = {
  Instagram: InstagramIcon,
  Youtube: YoutubeIcon,
  Linkedin: LinkedinIcon,
  Facebook: FacebookIcon,
  Twitter: TwitterIcon,
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Loader2,
  CheckCircle,
  Lock,
  FileText,
  ArrowUp,
  ChevronDown,
  ExternalLink,
};

export const Footer: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [expandedCol, setExpandedCol] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleColToggle = (id: string): void => {
    setExpandedCol((prev) => (prev === id ? null : id));
  };

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    timeoutRef.current = setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1200);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer role="contentinfo" className="overflow-hidden">
      {/* PART A — Newsletter Bar */}
      <div className="bg-white md:bg-[#D42B2B] py-8 md:py-12 px-4 md:px-16">
        <div className="max-w-7xl mx-auto bg-[#D42B2B] rounded-[24px] md:rounded-none p-8 md:p-0 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 shadow-2xl md:shadow-none shadow-red-500/30">
          <div className="text-center md:text-left">
            <h3 className="font-black text-white text-[24px] md:text-3xl leading-tight tracking-tight">
              Get Deals, Tips & New Arrivals First.
            </h3>
            <p className="text-white/90 text-[13px] md:text-sm mt-2 font-medium">
              Join 12,000+ contractors who get our weekly tool drop. No spam.
            </p>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 w-full md:w-auto mt-2 md:mt-0">
            <div className="flex flex-col flex-1 relative w-full">
              <input
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                disabled={status === "loading" || status === "success"}
                className="w-full md:w-72 px-5 py-4 md:py-3 rounded-[14px] text-base md:text-sm bg-white/10 border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:border-white focus:bg-white/20 transition duration-200"
              />
              {status === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -bottom-6 left-0 text-white/80 text-xs whitespace-nowrap"
                >
                  You are on the list. Welcome to the HID family.
                </motion.p>
              )}
            </div>
            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className={`px-6 py-4 md:py-3.5 rounded-[14px] font-black text-base md:text-sm whitespace-nowrap transition duration-200 flex items-center justify-center gap-2 w-full sm:w-auto active:scale-95 ${
                status === "success"
                  ? "bg-green-500 text-white"
                  : "bg-gray-900 text-white hover:bg-black"
              }`}
            >
              {status === "idle" && (
                <>
                  Subscribe <Send size={18} className="ml-1" />
                </>
              )}
              {status === "loading" && (
                <>
                  <Loader2 className="animate-spin" size={16} /> Sending...
                </>
              )}
              {status === "success" && (
                <>
                  <CheckCircle size={16} /> Subscribed!
                </>
              )}
              {status === "error" && "Try Again"}
            </button>
          </form>
        </div>
      </div>

      {/* PART B — Main Footer Body */}
      <div className="bg-gray-900 pt-10 md:pt-16 pb-8 px-4 md:px-16">
        <div className="max-w-7xl mx-auto">
          {/* TOP ROW */}
          <div className="flex flex-col lg:flex-row gap-12 pb-12 border-b border-white/10">
            {/* LEFT BLOCK */}
            <div className="lg:w-1/3">
              <div>
                <span className="font-black text-2xl text-white tracking-tight">
                  HID
                </span>
                <span className="font-light text-white/70 tracking-tight ml-1">
                  PowerTools
                </span>
              </div>
              <p className="text-white/50 text-sm mt-3 leading-relaxed max-w-xs">
                {footerTagline}
              </p>

              <div className="mt-8 space-y-4">
                {contactDetails.map((detail: ContactDetail) => {
                  const Icon = iconMap[detail.icon];
                  const inner = (
                    <>
                      {Icon && <Icon className="text-primary flex-shrink-0 mt-0.5" size={16} />}
                      <div>
                        <span className="text-white/40 text-xs font-medium block">
                          {detail.label}
                        </span>
                        <span className="text-white/80 text-sm">
                          {detail.value}
                        </span>
                      </div>
                    </>
                  );
                  return detail.href ? (
                    <a
                      key={detail.label}
                      href={detail.href}
                      className="flex items-start gap-3 hover:text-primary transition-colors duration-200"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div key={detail.label} className="flex items-start gap-3">
                      {inner}
                    </div>
                  );
                })}
              </div>

              <div className="mt-8">
                <h4 className="text-white/40 text-xs font-semibold tracking-widest uppercase mb-4">
                  FOLLOW US
                </h4>
                <div className="flex flex-row gap-3 flex-wrap">
                  {socialLinks.map((link: SocialLink) => {
                    const Icon = iconMap[link.icon];
                    return (
                      <a
                        key={link.platform}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.platform}
                        className="group relative flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-3 md:py-2 hover:bg-primary hover:border-primary transition-all duration-300"
                      >
                        {Icon && (
                          <Icon className="text-white/60 group-hover:text-white transition-colors" size={16} />
                        )}
                        <span className="text-white/40 text-xs group-hover:text-white/80 transition-colors hidden sm:block">
                          {link.followers}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* RIGHT BLOCK */}
            <div className="lg:w-2/3">
              {/* DESKTOP: 4-column grid */}
              <div className="hidden md:grid grid-cols-2 md:grid-cols-4 gap-8">
                {footerColumns.map((col: FooterColumn) => (
                  <div key={col.id}>
                    <h4 className="text-white/40 text-xs font-semibold tracking-widest uppercase mb-5">
                      {col.title}
                    </h4>
                    <ul className="space-y-3">
                      {col.links.map((link: FooterLink) => (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            target={link.isExternal ? "_blank" : "_self"}
                            rel={link.isExternal ? "noopener noreferrer" : undefined}
                            className="flex items-center gap-2 text-white/60 text-sm hover:text-white transition-colors duration-200 group py-1"
                          >
                            {link.label}
                            {link.isBadge && (
                              <span className="bg-primary text-white text-[10px] px-1.5 py-0.5 rounded font-bold ml-1 inline-block">
                                {link.badgeText}
                              </span>
                            )}
                            {link.isExternal && (
                              <ExternalLink className="w-3 h-3 text-white/30 group-hover:text-white/60" />
                            )}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* MOBILE: Accordion */}
              <div className="md:hidden">
                {footerColumns.map((col: FooterColumn) => (
                  <div key={col.id} className="border-b border-white/10">
                    <button
                      className="flex items-center justify-between w-full text-left py-5 px-2 active:bg-white/5 transition-colors rounded-lg"
                      onClick={() => handleColToggle(col.id)}
                    >
                      <span className="text-white font-bold text-[15px] uppercase tracking-wide">
                        {col.title}
                      </span>
                      <ChevronDown
                        size={20}
                        className={`text-white/40 transition-transform duration-300 ${
                          expandedCol === col.id ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {expandedCol === col.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          style={{ overflow: "hidden" }}
                        >
                          <ul className="pt-3 pb-1 space-y-3">
                            {col.links.map((link: FooterLink) => (
                              <li key={link.label}>
                                <a
                                  href={link.href}
                                  target={link.isExternal ? "_blank" : "_self"}
                                  rel={link.isExternal ? "noopener noreferrer" : undefined}
                                  className="flex items-center gap-2 text-white/60 text-sm hover:text-white transition-colors duration-200 group py-2"
                                >
                                  {link.label}
                                  {link.isBadge && (
                                    <span className="bg-primary text-white text-[10px] px-1.5 py-0.5 rounded font-bold ml-1 inline-block">
                                      {link.badgeText}
                                    </span>
                                  )}
                                  {link.isExternal && (
                                    <ExternalLink className="w-3 h-3 text-white/30 group-hover:text-white/60" />
                                  )}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* MIDDLE ROW */}
          <div className="py-8 border-b border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col items-center md:items-start w-full md:w-auto">
              <span className="text-white/40 text-xs uppercase tracking-widest mb-3">
                WE ACCEPT
              </span>
              <div className="flex flex-row gap-3 flex-wrap justify-center items-center">
                {paymentMethods.map((method: PaymentMethod) => (
                  <div
                    key={method.name}
                    className="bg-white rounded-lg px-3 py-1.5 flex items-center justify-center hover:scale-110 transition-transform duration-200"
                  >
                    <ImageWithFallback
                      src={method.src}
                      alt={method.name}
                      width={method.width}
                      height={method.height}
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-row gap-4 flex-wrap justify-center md:justify-end">
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                <Lock size={14} className="text-green-400" />
                <span className="text-white/60 text-xs">256-bit SSL</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                <FileText size={14} className="text-blue-400" />
                <span className="text-white/60 text-xs">GST Invoice</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                <span className="text-orange-400 text-xs">🇮🇳 Made in India</span>
              </div>
            </div>
          </div>

          {/* BOTTOM ROW */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div>
              <p className="text-white/30 text-xs">
                © {copyrightYear} HID PowerTools Pvt Ltd. All rights reserved.
              </p>
              <p className="text-white/20 text-[10px] mt-1">
                CIN: U28990GJ2024PTC000000 | GST: 24XXXXX0000X1ZX
              </p>
            </div>
            <div className="flex flex-row items-center gap-1 flex-wrap justify-center">
              <a href="/privacy" className="text-white/30 text-xs hover:text-white/60 transition-colors duration-200">
                Privacy Policy
              </a>
              <span className="text-white/10 mx-1">|</span>
              <a href="/terms" className="text-white/30 text-xs hover:text-white/60 transition-colors duration-200">
                Terms of Service
              </a>
              <span className="text-white/10 mx-1">|</span>
              <a href="/sitemap" className="text-white/30 text-xs hover:text-white/60 transition-colors duration-200">
                Sitemap
              </a>
            </div>
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
            className="fixed bottom-8 right-8 z-30 bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg shadow-primary/40 hover:bg-primary-dark hover:scale-110 transition-all duration-200"
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

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  RotateCcw,
  Shield,
  Truck,
  CreditCard,
  Headphones,
  PackageCheck,
  LayoutGrid,
  Wrench,
  ChevronDown,
  CheckCircle,
  MessageCircle,
  MessageSquare,
  type LucideIcon,
} from "lucide-react";

import { guaranteeBadges, faqCategories, faqItems } from "../../lib/data/riskReversalData";
import { AccordionItem } from "@hid/ui/accordion";
import type { FAQItem, GuaranteeBadge, FAQCategory } from "@hid/types";

const iconMap: Record<string, LucideIcon> = {
  RotateCcw,
  Shield,
  Truck,
  CreditCard,
  Headphones,
  PackageCheck,
  LayoutGrid,
  Wrench,
  ChevronDown,
  CheckCircle,
  MessageCircle,
  MessageSquare,
};

const badgeContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const RiskReversal: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const handleToggle = (id: number): void => {
    setOpenFAQ((prev) => (prev === id ? null : id));
  };

  const filteredFAQs: FAQItem[] =
    activeCategory === "all"
      ? faqItems
      : faqItems.filter((item: FAQItem) => item.category === activeCategory);

  return (
    <section id="guarantee" className="w-full bg-surface overflow-hidden">
      
      {/* PART A — Guarantee Badges Grid */}
      <div className="py-16 md:py-24 px-4 md:px-16 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full inline-block mb-4">
            ZERO RISK PURCHASE
          </div>
          <h2 className="font-extrabold text-4xl md:text-5xl text-text text-center">
            Every Reason to Buy. Zero Reason to Worry.
          </h2>
          <p className="text-text-muted text-lg mt-3 max-w-2xl mx-auto text-center">
            We stand behind every tool we sell with guarantees that actually mean something.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
          variants={badgeContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {guaranteeBadges.map((badge: GuaranteeBadge) => {
            const Icon = iconMap[badge.icon];
            return (
              <motion.div
                key={badge.id}
                variants={badgeVariants}
                className={`rounded-2xl border ${badge.borderColor} ${badge.bgColor} bg-opacity-30 p-5 sm:p-6 hover:scale-[1.03] hover:shadow-md transition-all duration-300 cursor-default bg-white`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${badge.bgColor} bg-opacity-20`}>
                  {Icon && <Icon className={badge.color} size={24} />}
                </div>

                <h3 className="font-bold text-text text-base mt-4">
                  {badge.title}
                </h3>
                <p className="text-sm text-text-muted mt-2 leading-relaxed">
                  {badge.description}
                </p>

                <div className="mt-4 pt-4 border-t border-current/10 flex items-center gap-1">
                  <CheckCircle size={12} className={badge.color} />
                  <span className={`text-xs font-semibold ${badge.color}`}>
                    Guaranteed
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* PART B — Trust Ribbon */}
      <div className="w-full bg-primary py-6 px-4 md:px-16 mt-0 overflow-hidden">
        <div className="flex w-max animate-marquee-ribbon hover:[animation-play-state:paused]">
          {[1, 2].map((setIndex) => (
            <div key={setIndex} className="flex items-center whitespace-nowrap">
              {[
                "✓ 30-Day Returns",
                "✓ Free Shipping India-Wide",
                "✓ 2-Year Warranty",
                "✓ Same-Day Dispatch",
                "✓ Genuine Products Only",
                "✓ 24/7 Expert Support",
                "✓ Secure UPI & Card Payments",
                "✓ 50,000+ Happy Contractors",
              ].map((item, idx) => (
                <React.Fragment key={idx}>
                  <span className="text-white font-semibold text-sm">
                    {item}
                  </span>
                  <span className="mx-8 text-white/40 font-bold">·</span>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* PART C — FAQ Section */}
      <div className="py-16 md:py-24 px-4 md:px-16 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full inline-block mb-4">
            GOT QUESTIONS?
          </div>
          <h2 className="font-extrabold text-3xl sm:text-4xl text-text">
            Everything You Need to Know.
          </h2>
          <p className="text-text-muted text-[15px] sm:text-base mt-3">
            Can not find your answer? Chat with our experts in under 2 minutes.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-nowrap md:flex-wrap gap-2 mb-8 pb-2 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
          {faqCategories.map((category: FAQCategory) => {
            const Icon = iconMap[category.icon];
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-3 md:py-2 rounded-full text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition-all duration-200 border snap-start ${
                  isActive
                    ? "bg-primary text-white shadow-md shadow-primary/30 border-primary"
                    : "bg-surface-alt text-text-muted hover:bg-primary/10 hover:text-primary border-border"
                }`}
              >
                {Icon && <Icon size={14} />}
                {category.label}
              </button>
            );
          })}
        </div>

        {/* FAQ Accordion List */}
        <div className="relative min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              {filteredFAQs.length > 0 ? (
                filteredFAQs.map((item: FAQItem) => (
                  <AccordionItem
                    key={item.id}
                    item={item}
                    isOpen={openFAQ === item.id}
                    onToggle={() => handleToggle(item.id)}
                  />
                ))
              ) : (
                <div className="text-center py-12 text-text-muted text-sm">
                  No questions in this category yet.
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Still have questions CTA */}
        <div className="mt-12 bg-surface-alt rounded-2xl p-8 text-center border border-border">
          <MessageCircle size={32} className="text-primary mx-auto mb-3" />
          <h3 className="font-bold text-text text-lg">
            Still have questions?
          </h3>
          <p className="text-text-muted text-sm mt-1">
            Our tool experts are online right now. Average response time: 90 seconds.
          </p>

          <div className="mt-6 flex gap-3 justify-center flex-wrap">
            <button className="bg-primary text-white rounded-xl px-6 py-4 md:py-3 text-sm font-bold hover:bg-primary/90 transition duration-200 flex-1 sm:flex-none">
              Chat With Us Now
            </button>
            <button className="bg-green-500 text-white rounded-xl px-6 py-4 md:py-3 text-sm font-bold hover:bg-green-600 transition duration-200 flex items-center justify-center gap-2 flex-1 sm:flex-none">
              <MessageSquare size={16} />
              WhatsApp Us
            </button>
          </div>
        </div>
      </div>

    </section>
  );
};

export default RiskReversal;
// ✅ FILE COMPLETE

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { FAQItem } from "@hid/types";

export interface AccordionItemProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ item, isOpen, onToggle }) => {
  return (
    <div
      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
        isOpen
          ? "border-primary/40 shadow-sm shadow-primary/10"
          : "border-border hover:border-primary/20"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 bg-white hover:bg-surface-alt transition-colors duration-200 cursor-pointer"
        aria-expanded={isOpen}
      >
        <span
          className={`font-semibold text-base leading-snug transition-colors duration-200 ${
            isOpen ? "text-primary" : "text-text"
          }`}
        >
          {item.question}
        </span>
        <ChevronDown
          size={20}
          className={`flex-shrink-0 transition-transform duration-300 ease-in-out ${
            isOpen ? "text-primary rotate-180" : "text-text-muted rotate-0"
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-6 pb-6 pt-2 bg-white">
              <div className="h-px bg-border mb-4" />
              <p className="text-text-muted text-sm leading-relaxed">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccordionItem;
// ✅ FILE COMPLETE

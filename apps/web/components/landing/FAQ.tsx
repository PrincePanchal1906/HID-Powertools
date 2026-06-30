"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is your warranty policy?",
      answer: "All HID PowerTools come with a standard 2-year warranty covering manufacturing defects. Extensions are available at checkout."
    },
    {
      question: "How fast is delivery?",
      answer: "We offer 2-4 business day delivery nationwide, with next-day dispatch on orders placed before 2 PM."
    },
    {
      question: "Do you offer returns?",
      answer: "Yes, we accept returns within 30 days of purchase for unused items in original packaging."
    },
    {
      question: "Where can I find replacement parts?",
      answer: "Genuine replacement parts can be ordered directly through our support team or authorized service centers."
    },
    {
      question: "Do you offer bulk discounts?",
      answer: "Yes, for contractor or bulk orders, please contact our B2B sales team for specialized pricing."
    }
  ];

  return (
    <section className="w-full bg-white py-[40px] lg:py-[80px] border-t border-gray-100">
      <div className="max-w-[800px] mx-auto px-[16px] lg:px-[0]">
        
        <div className="text-center mb-[24px] lg:mb-[40px]">
          <h2 className="text-[24px] lg:text-[36px] font-black text-gray-900 tracking-tight uppercase font-['var(--font-barlow-condensed)'] mb-[8px]">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="text-gray-500 text-[14px] lg:text-[16px] font-medium">
            Quick answers to help you get back to work.
          </p>
        </div>

        <div className="flex flex-col gap-[8px]">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className={`border rounded-[8px] transition-colors ${isOpen ? 'border-gray-300 bg-gray-50' : 'border-gray-200 bg-white'}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-[16px] lg:p-[20px] text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-gray-900 text-[15px] lg:text-[16px] pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown 
                    size={20} 
                    className={`text-gray-400 transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180 text-gray-700' : ''}`}
                  />
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-200 ease-in-out ${isOpen ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="p-[16px] pt-0 lg:p-[20px] lg:pt-0 text-gray-600 text-[14px] leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQ;

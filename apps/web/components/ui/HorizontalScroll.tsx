"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HorizontalScrollProps {
  children: React.ReactNode;
  showArrows?: boolean;
  className?: string; // Container classes for spacing/gap
  scrollStep?: number; // How much to scroll horizontally per click. Default handles dynamic calculation.
}

export const HorizontalScroll: React.FC<HorizontalScrollProps> = ({
  children,
  showArrows = true,
  className = "gap-6 px-4 pb-8",
  scrollStep,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    // Use provided scrollStep, or calculate based on the first child element width
    let amount = scrollStep;
    if (!amount) {
      const firstChild = scrollRef.current.firstElementChild as HTMLElement;
      amount = firstChild ? firstChild.clientWidth + 24 : 320; // fallback to 320px
    }

    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative group/scroll w-full">
      <div
        ref={scrollRef}
        className={`flex overflow-x-auto snap-x snap-mandatory scrollbar-hide w-full ${className}`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {children}
      </div>

      {showArrows && (
        <>
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute left-0 lg:-left-6 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg border border-gray-100 rounded-full w-12 h-12 items-center justify-center text-gray-700 hover:text-primary transition-colors opacity-0 group-hover/scroll:opacity-100 focus:opacity-100 -ml-2"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute right-0 lg:-right-6 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg border border-gray-100 rounded-full w-12 h-12 items-center justify-center text-gray-700 hover:text-primary transition-colors opacity-0 group-hover/scroll:opacity-100 focus:opacity-100 -mr-2"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  );
};

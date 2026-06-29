"use client";

import React, { useState, useEffect } from "react";

export const ScrollProgress = (): React.JSX.Element => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = (): void => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Initial call
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 h-[3px] bg-primary z-50 pointer-events-none"
      style={{ width: `${scrollProgress}%` }}
    />
  );
};

export default ScrollProgress;

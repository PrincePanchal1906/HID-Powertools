import React from "react";

export const IndustrialExperience = () => {
  return (
    <section className="w-full relative overflow-hidden flex flex-col justify-center min-h-[400px] lg:min-h-[700px] bg-[#111111]">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop" 
          alt="Industrial construction site"
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      <div className="relative z-20 flex flex-col items-center justify-center text-center px-[16px] py-[24px] lg:py-[160px] w-full">
        <span className="text-[#D42B2B] text-[12px] lg:text-[14px] font-bold tracking-[0.3em] uppercase mb-[8px] lg:mb-[24px] border border-[#D42B2B]/30 px-[12px] lg:px-[16px] py-[4px] lg:py-[8px] rounded-[4px] bg-black/20">
          The HID Standard
        </span>
        
        <h2 className="text-white font-black uppercase text-[40px] sm:text-[44px] lg:text-[96px] leading-[1.05] tracking-tight mb-[16px] lg:mb-[48px] max-w-[90%] lg:max-w-[1200px] font-['var(--font-barlow-condensed)']">
          BUILT TO <br className="lg:hidden"/>
          <span className="text-[#D42B2B] lg:ml-4">OUTLAST.</span>
        </h2>
        
        <p className="text-gray-300 text-[14px] sm:text-[16px] lg:text-[24px] font-medium leading-relaxed max-w-[280px] sm:max-w-[400px] lg:max-w-[800px] mb-[24px] lg:mb-[64px]">
          Equipment stress-tested in the harshest environments for maximum reliability.
        </p>

        <div className="w-[1px] h-12 lg:h-32 bg-gradient-to-b from-[#D42B2B] to-transparent"></div>
      </div>
    </section>
  );
};

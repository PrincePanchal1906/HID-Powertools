import React from "react";

export const IndustrialExperience = () => {
  return (
    <section className="w-full relative overflow-hidden flex flex-col justify-center min-h-[400px] bg-[#111111]">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop" 
          alt="Industrial construction site"
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      <div className="relative z-20 flex flex-col items-center justify-center text-center px-[16px] py-[40px] w-full">
        <span className="text-[#D42B2B] text-[11px] font-bold tracking-[0.3em] uppercase mb-[16px] border border-[#D42B2B]/30 px-[12px] py-[4px] rounded-full bg-black/20">
          The HID Standard
        </span>
        
        <h2 className="text-white font-black uppercase text-[32px] sm:text-[42px] leading-[1.05] tracking-tight mb-[24px] max-w-[90%] font-['var(--font-barlow-condensed)']">
          BUILT TO <br/>
          <span className="text-[#D42B2B]">OUTLAST.</span>
        </h2>
        
        <p className="text-gray-300 text-[15px] sm:text-[16px] font-medium leading-relaxed max-w-[280px] sm:max-w-[400px] mb-[40px]">
          We don't build tools for hobbyists. Our equipment is stress-tested in the harshest environments to ensure maximum reliability when you're on the clock.
        </p>

        <div className="w-[1px] h-12 bg-gradient-to-b from-[#D42B2B] to-transparent"></div>
      </div>
    </section>
  );
};

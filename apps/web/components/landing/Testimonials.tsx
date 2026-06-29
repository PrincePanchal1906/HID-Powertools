import React from "react";

export const Testimonials = () => {
  return (
    <section className="w-full bg-[#f4f5f7] px-[16px] py-[40px] lg:py-[120px] lg:px-[5%] xl:px-[8%]">
      <div className="flex flex-col mb-[24px] lg:mb-[64px] lg:items-center">
        <div className="flex items-center gap-[16px] mb-[8px] lg:mb-[16px]">
          <span className="text-[11px] lg:text-[14px] font-black text-[#D42B2B] tracking-widest uppercase bg-red-50 px-[8px] lg:px-[16px] py-[4px] lg:py-[6px] rounded-[4px]">
            /// FIELD VERIFIED
          </span>
        </div>
        <h2 className="text-[28px] lg:text-[56px] font-black text-gray-900 tracking-tight uppercase font-['var(--font-barlow-condensed)']">
          ON THE RECORD
        </h2>
      </div>

      <div className="bg-white rounded-[4px] p-[24px] lg:p-[80px] shadow-sm border border-gray-100 flex flex-col lg:items-center lg:text-center relative overflow-hidden max-w-[1200px] mx-auto group hover:border-[#D42B2B] transition-colors">
        
        {/* Quote Icon Background */}
        <div className="absolute top-[-10px] right-2 lg:top-[-40px] lg:left-1/2 lg:-translate-x-1/2 text-[#D42B2B] opacity-5 font-serif text-[120px] lg:text-[300px] leading-none select-none pointer-events-none">
          "
        </div>

        <div className="flex text-[#D42B2B] text-[15px] lg:text-[24px] mb-[16px] lg:mb-[32px] justify-start lg:justify-center">
          ★★★★★
        </div>
        
        <p className="text-gray-900 font-medium text-[16px] lg:text-[32px] leading-relaxed mb-[24px] lg:mb-[48px] relative z-10 italic lg:max-w-[800px]">
          "I've been on construction sites for 20 years. These are the only tools that don't burn out when pushed to the limit. The power-to-weight ratio is unmatched in the industry."
        </p>
        
        <div className="flex items-center lg:flex-col gap-[16px] lg:gap-[24px] relative z-10 justify-start lg:justify-center">
          <div className="w-[48px] h-[48px] lg:w-[80px] lg:h-[80px] rounded-[4px] bg-gray-200 overflow-hidden flex-shrink-0 border-2 border-white shadow-md">
            <img 
              src="https://i.pravatar.cc/150?u=mark" 
              alt="Mark T." 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col lg:items-center">
            <h4 className="text-[15px] lg:text-[20px] font-black text-gray-900 uppercase">Mark Thompson</h4>
            <span className="text-[11px] lg:text-[14px] text-gray-500 font-bold uppercase tracking-wide">Lead Site Contractor</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

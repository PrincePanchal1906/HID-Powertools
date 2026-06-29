import React from "react";

export const Testimonials = () => {
  return (
    <section className="w-full bg-[#f4f5f7] px-[16px] py-[40px] lg:hidden">
      <div className="flex flex-col mb-[24px]">
        <div className="flex items-center gap-[16px] mb-[8px]">
          <span className="text-[11px] font-black text-[#D42B2B] tracking-widest uppercase bg-red-50 px-[8px] py-[4px] rounded-[4px]">
            /// FIELD VERIFIED
          </span>
        </div>
        <h2 className="text-[28px] font-black text-gray-900 tracking-tight uppercase font-['var(--font-barlow-condensed)']">
          ON THE RECORD
        </h2>
      </div>

      <div className="bg-white rounded-[4px] p-[24px] shadow-sm border border-gray-100 flex flex-col relative overflow-hidden">
        
        {/* Quote Icon Background */}
        <div className="absolute top-[-10px] right-2 text-[#D42B2B] opacity-5 font-serif text-[120px] leading-none select-none pointer-events-none">
          "
        </div>

        <div className="flex text-[#D42B2B] text-[15px] mb-[16px]">
          ★★★★★
        </div>
        
        <p className="text-gray-900 font-medium text-[16px] leading-relaxed mb-[24px] relative z-10 italic">
          "I've been on construction sites for 20 years. These are the only tools that don't burn out when pushed to the limit. The power-to-weight ratio is unmatched in the industry."
        </p>
        
        <div className="flex items-center gap-[16px] relative z-10">
          <div className="w-[48px] h-[48px] rounded-[4px] bg-gray-200 overflow-hidden flex-shrink-0">
            <img 
              src="https://i.pravatar.cc/150?u=mark" 
              alt="Mark T." 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="text-[15px] font-black text-gray-900 uppercase">Mark Thompson</h4>
            <span className="text-[11px] text-gray-500 font-bold uppercase tracking-wide">Lead Site Contractor</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

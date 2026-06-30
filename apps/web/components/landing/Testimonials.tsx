import React from "react";

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Mark Thompson",
      role: "Lead Contractor",
      review: "These are the only tools that don't burn out when pushed to the limit. Unmatched power.",
      rating: 5,
    },
    {
      name: "Sarah Jenkins",
      role: "Electrician",
      review: "Dropped my impact driver from 15 feet and it still works flawlessly. Best investment.",
      rating: 5,
    },
    {
      name: "David Chen",
      role: "Cabinet Maker",
      review: "The precision is incredible. Batteries last an entire shift without needing a swap.",
      rating: 5,
    },
    {
      name: "Mike O'Connor",
      role: "Heavy Construction",
      review: "We replaced our entire fleet with HID. Downtime is virtually non-existent now.",
      rating: 5,
    },
  ];

  return (
    <section className="w-full bg-[#f4f5f7] py-[24px] lg:py-[64px] border-t border-gray-200">
      <div className="max-w-[1920px] mx-auto lg:px-[5%] xl:px-[8%]">
        
        <div className="flex flex-col mb-[16px] px-[16px] lg:px-0">
          <h2 className="text-[20px] lg:text-[32px] font-black text-gray-900 tracking-tight uppercase font-['var(--font-barlow-condensed)']">
            FIELD VERIFIED
          </h2>
        </div>

        {/* Horizontal Swipe Rail */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-[12px] pb-[8px] scrollbar-hide px-[16px] lg:px-0">
          {testimonials.map((t, idx) => (
            <div 
              key={idx}
              className="flex flex-col bg-white rounded-[6px] p-[16px] shadow-sm border border-gray-100 flex-shrink-0 snap-start w-[240px] h-[150px]"
            >
              <div className="flex text-[#D42B2B] text-[12px] mb-[10px]">
                ★★★★★
              </div>
              
              <p className="text-gray-800 font-medium text-[13px] leading-snug mb-auto line-clamp-3 italic">
                "{t.review}"
              </p>
              
              <div className="flex flex-col mt-[12px] pt-[10px] border-t border-gray-50">
                <h4 className="text-[12px] font-black text-gray-900 uppercase leading-tight mb-[2px]">
                  {t.name}
                </h4>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wide leading-tight">
                  {t.role}
                </span>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default Testimonials;

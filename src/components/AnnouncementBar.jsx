import React from "react";

export default function AnnouncementBar() {
  return (
    <div className="bg-[#700b10] text-white py-1.5 overflow-hidden flex items-center shadow-md select-none sticky top-0 z-50">
      <div className="animate-marquee flex items-center">
        {[...Array(10)].map((_, i) => (
          <span
            key={i}
            className="font-nunito mx-12 sm:mx-14 text-[11px] sm:text-xs md:text-[13px] font-medium tracking-widest whitespace-nowrap"
          >
            Free Shipping On Orders Above ₹999 🚚✨
          </span>
        ))}
      </div>
    </div>
  );
}

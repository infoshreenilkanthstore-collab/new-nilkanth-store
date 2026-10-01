import React from 'react';
import { USP_ITEMS } from '../data/storeData';

export default function TrustMarquee() {
  return (
    <section className="w-full bg-white">
      <div className="py-6 md:py-8 px-4 text-center">
        <h2 className="font-tenor text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight text-[#700b10] font-normal">
          8,00,000+ Devotees Trust Us
        </h2>
      </div>

      {/* Running USP ticker */}
      <div className="w-full bg-[#700b10] text-white py-3.5 sm:py-4 overflow-hidden shadow-inner flex items-center">
        <div className="animate-usp-marquee flex items-center">
          {[...Array(4)].map((_, loopIdx) => (
            <React.Fragment key={loopIdx}>
              {USP_ITEMS.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 px-6 py-1 flex-shrink-0 cursor-default">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap">
                    {item.text}
                  </span>
                  <span className="text-white/40 text-xs ml-4">•</span>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

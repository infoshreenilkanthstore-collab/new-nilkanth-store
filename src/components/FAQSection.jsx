import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { FAQS } from "../data/storeData";

export default function FAQSection() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <section className="w-full bg-white py-3 md:py-7 px-4 md:px-8 lg:px-12 border-b border-stone-200/60">
      <div className="max-w-[95rem] mx-auto">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-tenor text-[#700b10] font-normal mb-6 md:mb-12 tracking-tight">
          Frequently Asked Questions
        </h2>

        {/* 2-column layout with items-start and self-start to keep left image 100% stationary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-14 xl:gap-16 md:gap-10 gap-8 items-start">
          {/* Left: Illustration Image container - perfectly anchored at top without moving */}
          <div className="w-full flex justify-center items-start self-start">
            <div className="relative w-full max-w-[460px] sm:max-w-[500px] lg:max-w-none aspect-square rounded-2xl sm:rounded-3xl lg:rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white/90 bg-[#faeed1] flex items-center justify-center flex-shrink-0">
              <img
                src="https://megaecomm.megascale.co.in/backend/media/16/general/c18c1d4e0e4c4401b13d3c013ea57e99.jpg"
                alt="FAQ Illustration"
                className="w-full h-full object-contain object-center block"
                loading="lazy"
                draggable={false}
              />
            </div>
          </div>

          {/* Right: Questions Accordion - strictly aligned to top with self-start */}
          <div className="space-y-1 w-full flex flex-col justify-start self-start">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="border-b border-stone-200/80 last:border-0"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full py-3.5 sm:py-4 flex justify-between items-center text-left group transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`text-[13.5px] sm:text-[14.5px] font-semibold transition-colors duration-200 pr-4 leading-snug ${isOpen
                          ? "text-[#700b10] font-bold"
                          : "text-stone-800 group-hover:text-[#700b10]"
                        }`}
                    >
                      {faq.question}
                    </span>
                    <div className="flex-shrink-0 ml-3">
                      <div
                        className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all duration-200 ${isOpen
                            ? "bg-[#700b10] text-white shadow-xs"
                            : "bg-transparent text-stone-600 group-hover:text-[#700b10]"
                          }`}
                      >
                        {isOpen ? (
                          <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                        ) : (
                          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                        )}
                      </div>
                    </div>
                  </button>
                  {isOpen && (
                    <div className="pb-4 pt-0.5 text-stone-600 text-[12.5px] sm:text-[13.5px] leading-relaxed pr-6 font-nunito">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

import React from 'react';

export default function FeaturedCollection({ onNavigate }) {
  return (
    <section className="w-full bg-[#ffffff] py-6 sm:py-8 md:py-10 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="max-w-[95rem] mx-auto overflow-hidden rounded-2xl md:rounded-[2.5rem]  flex flex-col sm:flex-row min-h-[380px]">
        {/* Left Image Container:
            - Mobile: Full width, square aspect ratio so full uncut image is displayed
            - Tablet: Horizontal side-by-side (sm:w-1/2 md:w-2/5) showing full uncut image
            - Laptop/Desktop: Kept as original md:w-2/5
        */}
        <div className="w-full aspect-square sm:aspect-auto sm:w-1/2 md:w-2/5 bg-[#e6d98e] relative flex items-center justify-center overflow-hidden shrink-0">
          <img
            src="https://megaecomm.megascale.co.in/backend/media/16/general/12d151b31b6dbb059e5aa9030416a962.jpg"
            alt="Pooja Samagri"
            className="w-full h-full object-contain sm:object-cover md:object-cover block"
          />
        </div>

        {/* Right Content Section:
            - Mobile & Tablet: Fluid padding & font sizes
            - Desktop: Kept as original
        */}
        <div className="w-full sm:w-1/2 md:w-3/5 bg-[#810000] flex flex-col justify-center p-6 sm:p-7 md:p-10 lg:p-12 text-white">
          <span className="text-xs md:text-sm font-bold uppercase tracking-[0.25em] mb-2 md:mb-3 text-[#ebd99c] font-jost">
            Pooja Saman
          </span>
          <h2 className="font-tenor text-2xl sm:text-2xl md:text-3xl lg:text-5xl leading-tight mb-3 md:mb-4 font-normal">
            Decorate Your Mandir with Shri Nilkanth Store
          </h2>
          <p className="text-xs sm:text-xs md:text-sm lg:text-base opacity-90 mb-5 sm:mb-6 md:mb-8 leading-relaxed font-jost max-w-2xl">
            At Shri Nilkanth Store, we bring divinity closer to your home. Our handpicked spiritual products are designed to elevate your pooja space with purity, tradition, and grace. Each item is crafted with care — blending age-old rituals with modern aesthetics for your sacred moments.
          </p>
          <div>
            <a
              href="/collections"
              onClick={(e) => {
                e.preventDefault();
                onNavigate?.("collections");
              }}
              className="inline-block bg-[#b5944d] hover:bg-[#c6a55e] text-white px-6 sm:px-7 md:px-10 py-2.5 sm:py-3 md:py-3.5 rounded-full text-xs sm:text-sm md:text-base font-bold transition-all duration-300 border border-white/20 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer"
            >
              Shop Collection
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

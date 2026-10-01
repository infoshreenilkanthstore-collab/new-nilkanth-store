import React from "react";

export default function DualPromoBanners({ onNavigate }) {
  const handleCollectionClick = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate("collections");
    }
  };

  return (
    <section className="w-full bg-[#ffffff] py-6 sm:py-8 md:py-10 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="max-w-[95rem] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-center">
          {/* Banner 1: Bhagvat Prasadam (external link to https://bhagvatprasadam.com/) */}
          <a
            href="https://bhagvatprasadam.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full cursor-pointer focus:outline-none overflow-hidden rounded-2xl"
          >
            <div className="w-full relative flex items-center justify-center">
              <img
                src="/bhagvatprasadam.png"
                alt="Bhagvat Prasadam - अन्नकूट प्रसाद"
                className="w-full max-h-[220px] sm:max-h-[280px] lg:max-h-[340px] object-contain block select-none hover:scale-[1.01] transition-transform duration-300"
                loading="lazy"
              />
            </div>
          </a>

          {/* Banner 2: Nilkanth Store (internal link to our collection page) */}
          <a
            href="/collections"
            onClick={handleCollectionClick}
            className="block w-full cursor-pointer focus:outline-none overflow-hidden rounded-2xl"
          >
            <div className="w-full relative flex items-center justify-center">
              <img
                src="/nilkanthstore.png"
                alt="Shri Nilkanth Store - पूजा सामग्री Collection"
                className="w-full max-h-[220px] sm:max-h-[280px] lg:max-h-[340px] object-contain block select-none hover:scale-[1.01] transition-transform duration-300"
                loading="lazy"
              />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

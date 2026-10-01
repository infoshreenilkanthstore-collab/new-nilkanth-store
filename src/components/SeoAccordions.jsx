import React, { useState } from 'react';

export default function SeoAccordions({ onNavigate }) {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleCollectionNav = (e, handle) => {
    e.preventDefault();
    if (onNavigate) {
      if (handle) {
        onNavigate("collections", { collectionHandle: handle });
      } else {
        onNavigate("collections");
      }
    }
  };

  return (
    <section className="w-full bg-[#ffffff] border-t border-stone-200/80">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-14 py-5 sm:py-6 md:py-8">

        {/* Accordion Item 1: EXPLORE SHRI NILKANTH STORE'S DEVOTIONAL COLLECTION */}
        <div className="border-b border-stone-200/60 pb-3">
          <button
            type="button"
            onClick={() => toggleSection('devotional')}
            className="w-full flex items-center justify-between text-left py-3 sm:py-3.5 group cursor-pointer transition-colors"
            aria-expanded={openSection === 'devotional'}
          >
            <h3 className="font-tenor text-xs sm:text-sm md:text-base lg:text-lg font-bold tracking-wide text-stone-900 group-hover:text-[#700b10] transition-colors uppercase leading-snug pr-2">
              EXPLORE SHRI NILKANTH STORE'S DEVOTIONAL COLLECTION
            </h3>
            <span className="text-lg sm:text-xl md:text-2xl font-light text-stone-700 group-hover:text-[#700b10] transition-colors ml-3 sm:ml-4 select-none shrink-0">
              {openSection === 'devotional' ? '−' : '+'}
            </span>
          </button>

          {openSection === 'devotional' && (
            <div className="pt-2 pb-5 space-y-4 sm:space-y-5 text-stone-700 font-nunito text-[12px] sm:text-[13px] md:text-[14px] leading-relaxed animate-fadeIn">
              <div>
                <h4 className="font-bold text-stone-900 text-xs sm:text-sm md:text-[15px] mb-1 font-nunito">
                  Agarbatti, Dhoop &amp; Sacred Fragrance
                </h4>
                <p className="text-stone-600 leading-relaxed">
                  Create a peaceful and devotional atmosphere with our collection of{' '}
                  <a
                    className="underline hover:text-[#700b10] font-medium text-stone-800 transition-colors cursor-pointer"
                    href="/collections/agarbatti"
                    onClick={(e) => handleCollectionNav(e, 'agarbatti')}
                  >
                    agarbatti
                  </a>
                  ,{' '}
                  <a
                    className="underline hover:text-[#700b10] font-medium text-stone-800 transition-colors cursor-pointer"
                    href="/collections/dhoop"
                    onClick={(e) => handleCollectionNav(e, 'dhoop')}
                  >
                    dhoop
                  </a>
                  ,{' '}
                  <a
                    className="underline hover:text-[#700b10] font-medium text-stone-800 transition-colors cursor-pointer"
                    href="/collections/attar"
                    onClick={(e) => handleCollectionNav(e, 'attar')}
                  >
                    attar
                  </a>
                  ,{' '}
                  <a
                    className="underline hover:text-[#700b10] font-medium text-stone-800 transition-colors cursor-pointer"
                    href="/collections/perfume"
                    onClick={(e) => handleCollectionNav(e, 'perfume')}
                  >
                    perfumes, and fragrances
                  </a>
                  . Carefully selected for your home and pooja space, these products add a sense of freshness, serenity, and spiritual warmth to every moment of devotion.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-stone-900 text-xs sm:text-sm md:text-[15px] mb-1 font-nunito">
                  Devotional Gifts &amp; Mandir Décor
                </h4>
                <p className="text-stone-600 leading-relaxed">
                  Make every occasion more meaningful with our collection of{' '}
                  <a
                    className="underline hover:text-[#700b10] font-medium text-stone-800 transition-colors cursor-pointer"
                    href="/collections"
                    onClick={(e) => handleCollectionNav(e, null)}
                  >
                    devotional gifts and mandir décor
                  </a>
                  . From torans and decorative pieces to spiritual gifts, murtis, julo, and hindola, discover thoughtful products that bring tradition, beauty, and devotion into every home.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-stone-900 text-xs sm:text-sm md:text-[15px] mb-1 font-nunito">
                  Bringing Tradition Closer to Your Home
                </h4>
                <p className="text-stone-600 leading-relaxed">
                  Shri Nilkanth Store brings together products inspired by devotion, tradition, and the timeless practices of seva. Every collection is thoughtfully selected to help you create a beautiful pooja space, celebrate your traditions, and bring a little more divinity into everyday life.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Accordion Item 2: SHRI NILKANTH STORE PROMISE */}
        <div className="border-b border-stone-200/60 pb-3 pt-2">
          <button
            type="button"
            onClick={() => toggleSection('promise')}
            className="w-full flex items-center justify-between text-left py-3 sm:py-3.5 group cursor-pointer transition-colors"
            aria-expanded={openSection === 'promise'}
          >
            <h3 className="font-tenor text-xs sm:text-sm md:text-base lg:text-lg font-bold tracking-wide text-stone-900 group-hover:text-[#700b10] transition-colors uppercase leading-snug pr-2">
              SHRI NILKANTH STORE PROMISE
            </h3>
            <span className="text-lg sm:text-xl md:text-2xl font-light text-stone-700 group-hover:text-[#700b10] transition-colors ml-3 sm:ml-4 select-none shrink-0">
              {openSection === 'promise' ? '−' : '+'}
            </span>
          </button>

          {openSection === 'promise' && (
            <div className="pt-2 pb-5 space-y-3.5 sm:space-y-4 text-stone-700 font-nunito text-[12px] sm:text-[13px] md:text-[14px] leading-relaxed animate-fadeIn">
              <div>
                <h4 className="font-bold text-stone-900 text-xs sm:text-sm md:text-[15px] mb-1 font-nunito">
                  Purity in Every Product. Devotion in Every Delivery.
                </h4>
                <p className="text-stone-600 leading-relaxed">
                  At Shri Nilkanth Store, every product is thoughtfully selected to bring quality, tradition, and devotion closer to your home.
                </p>
              </div>

              <ul className="space-y-2 sm:space-y-2.5 pt-1">
                <li className="flex items-start gap-2 sm:gap-2.5">
                  <span className="text-[#700b10] font-bold text-base leading-none mt-0.5">•</span>
                  <span>
                    <strong className="text-stone-900 font-semibold">Authenticity</strong> — Carefully selected products
                  </span>
                </li>
                <li className="flex items-start gap-2 sm:gap-2.5">
                  <span className="text-[#700b10] font-bold text-base leading-none mt-0.5">•</span>
                  <span>
                    <strong className="text-stone-900 font-semibold">Quality</strong> — Checked before dispatch
                  </span>
                </li>
                <li className="flex items-start gap-2 sm:gap-2.5">
                  <span className="text-[#700b10] font-bold text-base leading-none mt-0.5">•</span>
                  <span>
                    <strong className="text-stone-900 font-semibold">Careful Packing</strong> — Safely packed with care
                  </span>
                </li>
                <li className="flex items-start gap-2 sm:gap-2.5">
                  <span className="text-[#700b10] font-bold text-base leading-none mt-0.5">•</span>
                  <span>
                    <strong className="text-stone-900 font-semibold">Devotional Value</strong> — Made for pooja &amp; seva
                  </span>
                </li>
                <li className="flex items-start gap-2 sm:gap-2.5">
                  <span className="text-[#700b10] font-bold text-base leading-none mt-0.5">•</span>
                  <span>
                    <strong className="text-stone-900 font-semibold">Trusted Service</strong> — Reliable shopping experience
                  </span>
                </li>
              </ul>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

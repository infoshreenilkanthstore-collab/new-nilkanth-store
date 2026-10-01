import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchProducts } from '../services/api';

export default function BestSellerSection({ onSelectProduct }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    fetchProducts({ page: 1, limit: 12 })
      .then((res) => {
        if (isMounted) {
          const list = Array.isArray(res) ? res : (res?.data || []);
          setProducts(list);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Failed to load best sellers:", err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -240, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 240, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full bg-white overflow-hidden">
      <div className="max-w-[95rem] mx-auto mt-3">
        {/* Section Heading */}
        <div className="text-center mt-3 mb-3 md:mb-7">
          <h2 className="font-tenor text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#700b10] tracking-tight font-normal">
            Best Seller
          </h2>
        </div>

        {/* Carousel / Centered Grid Wrapper */}
        <div className="relative group/bestseller px-1 sm:px-6 md:px-8 max-w-6xl mx-auto">
          {/* Left Arrow Button (shown when scrollable on mobile and tablet) */}
          <button
            type="button"
            onClick={scrollLeft}
            className="lg:hidden absolute left-0 sm:left-1 top-1/3 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 bg-white/95 text-[#700b10] rounded-full shadow-md border border-stone-200 flex items-center justify-center cursor-pointer hover:bg-stone-50 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Right Arrow Button (shown when scrollable on mobile and tablet) */}
          <button
            type="button"
            onClick={scrollRight}
            className="lg:hidden absolute right-0 sm:right-1 top-1/3 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 bg-white/95 text-[#700b10] rounded-full shadow-md border border-stone-200 flex items-center justify-center cursor-pointer hover:bg-stone-50 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Circular Items: Perfectly Centered on Desktop (lg+), Scrollable with centered fit on tablet & mobile */}
          <div
            ref={scrollRef}
            className="flex items-start justify-start lg:justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-8 overflow-x-auto lg:overflow-visible scroll-smooth py-3 px-2 sm:px-4 scrollbar-none"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {loading ? (
              [...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center flex-shrink-0 animate-pulse w-[105px] sm:w-[115px] md:w-[130px] lg:w-[160px]"
                >
                  <div className="w-22 h-22 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-36 lg:h-36 rounded-full bg-stone-200" />
                  <div className="w-16 h-3 bg-stone-200 rounded mt-3" />
                  <div className="w-12 h-3 bg-stone-200 rounded mt-1.5" />
                </div>
              ))
            ) : (
              products.slice(0, 6).map((prod) => {
                const image =
                  prod.image_url ||
                  prod.images?.[0]?.url ||
                  "https://megaecomm.megascale.co.in/backend/media/16/general/66066c8ca3ab4a8cc35413b3a26e3314.jpeg";

                return (
                  <div
                    key={prod.id}
                    onClick={() => onSelectProduct?.(prod)}
                    className="group flex flex-col items-center text-center cursor-pointer select-none flex-shrink-0 w-[105px] sm:w-[115px] md:w-[130px] lg:w-[165px]"
                    style={{ scrollSnapAlign: 'center' }}
                  >
                    {/* Circle Image Wrapper with subtle border & shadow matching reference */}
                    <div className="p-1">
                      <div className="relative w-22 h-22 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-36 lg:h-36 rounded-full overflow-hidden bg-white border border-stone-200 shadow-sm group-hover:shadow-md transition-all duration-300 transform group-hover:scale-105">
                        <img
                          src={image}
                          alt={prod.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                        />
                      </div>
                    </div>

                    {/* Product Title below circle with 2-line clamp */}
                    <h3 className="font-nunito text-[11.5px] sm:text-[12px] md:text-[13px] lg:text-[14px] text-stone-700 font-medium line-clamp-2 leading-snug group-hover:text-[#700b10] transition-colors mt-2.5 px-1">
                      {prod.title}
                    </h3>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

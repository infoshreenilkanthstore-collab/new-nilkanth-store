import React, { useState, useEffect, useRef, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CATEGORIES } from "../data/storeData";

export default function CategoryGrid({ onNavigate }) {
  const [isPaused, setIsPaused] = useState(false);

  // Cloned first 2 and last 2 items for true continuous infinite looping without reverse bounce
  const extendedCategories = useMemo(() => {
    if (!CATEGORIES || CATEGORIES.length === 0) return [];
    if (CATEGORIES.length === 1) {
      return [{ ...CATEGORIES[0], uniqueKey: "single-0" }];
    }
    const lastTwo = CATEGORIES.slice(-2);
    const firstTwo = CATEGORIES.slice(0, 2);
    return [
      ...lastTwo.map((c, i) => ({ ...c, uniqueKey: `clone-start-${c.id || i}-${i}` })),
      ...CATEGORIES.map((c, i) => ({ ...c, uniqueKey: `real-${c.id || i}-${i}` })),
      ...firstTwo.map((c, i) => ({ ...c, uniqueKey: `clone-end-${c.id || i}-${i}` })),
    ];
  }, []);

  const [currentIndex, setCurrentIndex] = useState(2);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Auto-slide continuously forward
  useEffect(() => {
    if (isPaused || CATEGORIES.length <= 1) return;
    const timer = setInterval(() => {
      handleNext();
    }, 3200);
    return () => clearInterval(timer);
  }, [isPaused, currentIndex, isTransitioning]);

  // Re-enable smooth transition immediately after instant zero-duration repositioning
  useEffect(() => {
    if (!isTransitioning) {
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [isTransitioning]);

  const handleNext = () => {
    if (CATEGORIES.length <= 1) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (CATEGORIES.length <= 1) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleTransitionEnd = (e) => {
    if (e && e.target !== e.currentTarget) return;
    const N = CATEGORIES.length;
    if (N <= 1) return;

    // If reached or exceeded the end clone, wrap instantly to real item 0
    if (currentIndex >= N + 2) {
      setIsTransitioning(false);
      setCurrentIndex(2);
    }
    // If reached or gone below start clones, wrap instantly to real last item
    else if (currentIndex < 2) {
      setIsTransitioning(false);
      setCurrentIndex(N + currentIndex);
    }
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 40) {
      handleNext();
    } else if (diff < -40) {
      handlePrev();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <section
      id="gallery"
      className="w-full bg-white py-8 md:py-12 px-4 md:px-8 lg:px-12 border-t border-stone-200/50 overflow-hidden"
    >
      <div className="max-w-[95rem] mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="font-tenor text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#700b10] mb-2 tracking-tight font-normal">
            Image Gallery
          </h2>
        </div>

        {/* 1. Mobile & Tablet 2-Way Infinite Scroll View (< 1024px) */}
        <div
          className="lg:hidden relative group/gallery px-1 overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 bg-white/95 text-[#700b10] rounded-full shadow-md border border-stone-200 flex items-center justify-center cursor-pointer hover:bg-stone-50 transition-all hover:scale-105 active:scale-95"
            aria-label="Previous category"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 bg-white/95 text-[#700b10] rounded-full shadow-md border border-stone-200 flex items-center justify-center cursor-pointer hover:bg-stone-50 transition-all hover:scale-105 active:scale-95"
            aria-label="Next category"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
          </button>

          {/* Smooth GPU-Accelerated 2-Column Transform Track */}
          <div
            className={`flex will-change-transform ${isTransitioning
                ? "transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                : "transition-none"
              }`}
            style={{
              transform: `translateX(-${currentIndex * 50}%)`,
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extendedCategories.map((cat) => (
              <div
                key={cat.uniqueKey || cat.id}
                className="w-1/2 px-1.5 flex-shrink-0"
              >
                <a
                  href={`/collections/${cat.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate?.("collections", { collectionHandle: cat.slug });
                  }}
                  className="group relative block overflow-hidden rounded-2xl aspect-[4/5] shadow-sm hover:shadow-xl transition-all duration-500 bg-stone-50 border border-stone-200/60 cursor-pointer h-full"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white font-jost text-base font-semibold tracking-wider w-full text-center">
                      {cat.name}
                    </span>
                  </div>
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3 bg-white/95 backdrop-blur-md py-1.5 sm:py-2 px-2 sm:px-3 rounded-xl shadow-xs border border-stone-100 text-center">
                    <p className="text-[#700b10] font-jost text-xs sm:text-sm font-bold uppercase tracking-wider truncate">
                      {cat.name}
                    </p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Desktop & Laptop Layout (>= 1024px) - Original 5-column grid preserved */}
        <div className="hidden lg:grid grid-cols-5 gap-6">
          {CATEGORIES.map((cat) => (
            <a
              key={cat.id}
              href={`/collections/${cat.slug}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate?.("collections", { collectionHandle: cat.slug });
              }}
              className="group relative block overflow-hidden rounded-2xl aspect-[4/5] shadow-sm hover:shadow-xl transition-all duration-500 bg-stone-50 border border-stone-200/60 cursor-pointer"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white font-jost text-base font-semibold tracking-wider w-full text-center">
                  {cat.name}
                </span>
              </div>
              <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-md py-2 px-3 rounded-xl opacity-100 group-hover:opacity-0 transition-opacity duration-300 shadow-sm border border-stone-100 text-center">
                <p className="text-[#700b10] font-jost text-xs md:text-sm font-bold uppercase tracking-wider">
                  {cat.name}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

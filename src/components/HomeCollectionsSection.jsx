import React, { useState, useEffect, useRef, useMemo } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { fetchCollections } from "../services/api";

export default function HomeCollectionsSection({
  onNavigate,
  onSelectCollection,
}) {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchCollections()
      .then((res) => {
        if (isMounted) {
          const list = Array.isArray(res) ? res : res?.data || [];
          // Strictly filter active, displayed collections with images & products
          const activeOnly = list.filter((item) => {
            return (
              item.is_active === true &&
              item.is_display === true &&
              item.image_url &&
              parseInt(item.product_count || 0, 10) > 0
            );
          });

          // Order logically by product count
          activeOnly.sort((a, b) => {
            const countA = parseInt(a.product_count || 0, 10);
            const countB = parseInt(b.product_count || 0, 10);
            return countB - countA;
          });

          setCollections(activeOnly);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Failed loading collections for homepage:", err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Cloned first 2 and last 2 items for true continuous infinite looping without reverse bounce
  const extendedCollections = useMemo(() => {
    if (!collections || collections.length === 0) return [];
    if (collections.length === 1) {
      return [{ ...collections[0], uniqueKey: "single-0" }];
    }
    const lastTwo = collections.slice(-2);
    const firstTwo = collections.slice(0, 2);
    return [
      ...lastTwo.map((c, i) => ({ ...c, uniqueKey: `clone-start-${c.id || i}-${i}` })),
      ...collections.map((c, i) => ({ ...c, uniqueKey: `real-${c.id || i}-${i}` })),
      ...firstTwo.map((c, i) => ({ ...c, uniqueKey: `clone-end-${c.id || i}-${i}` })),
    ];
  }, [collections]);

  const [currentIndex, setCurrentIndex] = useState(2);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Auto slide continuously forward
  useEffect(() => {
    if (isPaused || loading || collections.length <= 1) return;
    const timer = setInterval(() => {
      handleNext();
    }, 3500);
    return () => clearInterval(timer);
  }, [isPaused, loading, collections.length, currentIndex, isTransitioning]);

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
    if (collections.length <= 1) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (collections.length <= 1) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleTransitionEnd = (e) => {
    if (e && e.target !== e.currentTarget) return;
    const N = collections.length;
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

  const handleCollectionClick = (col) => {
    const handle =
      col.handle || col.slug || col.title.toLowerCase().replace(/\s+/g, "-");
    if (onSelectCollection) {
      onSelectCollection(col);
    } else if (onNavigate) {
      onNavigate("collections", { collectionHandle: handle });
    }
  };

  if (!loading && collections.length === 0) return null;

  return (
    <section className="w-full bg-[#ffffff] py-4 sm:py-10 md:py-12  overflow-hidden">
      <div className="max-w-[95rem] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <h2 className="font-tenor text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#700b10] tracking-tight font-normal">
            Our Collections
          </h2>
        </div>

        {/* ======================================================== */}
        {/* 1. Desktop & Laptop View (>= 1024px): Strictly 5-Column Grid */}
        {/* ======================================================== */}
        <div className="hidden lg:grid grid-cols-5 gap-6 xl:gap-8">
          {loading
            ? [...Array(5)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse flex flex-col items-center"
              >
                <div className="w-full aspect-[4/5] rounded-2xl bg-stone-100" />
                <div className="h-4 bg-stone-200 rounded w-2/3 mt-3.5" />
                <div className="h-3 bg-stone-100 rounded w-1/3 mt-2" />
              </div>
            ))
            : collections.map((col) => {
              const handle =
                col.handle ||
                col.slug ||
                col.title.toLowerCase().replace(/\s+/g, "-");
              return (
                <a
                  key={col.id}
                  href={`/collections/${handle}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleCollectionClick(col);
                  }}
                  className="group flex flex-col items-center text-center cursor-pointer select-none transition-all duration-300 transform hover:-translate-y-1 block"
                >
                  {/* Collection Image */}
                  <div className="relative w-full rounded-2xl overflow-hidden transition-all duration-300">
                    <img
                      src={col.image_url}
                      alt={col.title}
                      loading="lazy"
                      className="w-full h-auto object-contain block transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Title & Explore link */}
                  <div className="pt-3.5 pb-1 text-center flex flex-col items-center">
                    <h3 className="font-tenor text-base sm:text-lg md:text-[19px] text-stone-900 group-hover:text-[#700b10] transition-colors leading-snug">
                      {col.title}
                    </h3>
                    <p className="mt-1 inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-bold font-nunito text-[#700b10] group-hover:underline group-hover:gap-2 transition-all">
                      Explore Collection
                      <ArrowRight className="w-3.5 h-3.5" />
                    </p>
                  </div>
                </a>
              );
            })}
        </div>

        {/* ========================================================================= */}
        {/* 2. Mobile & Tablet View (< 1024px): Seamless Transform Infinite Carousel */}
        {/* ========================================================================= */}
        <div
          className="lg:hidden relative group/slider px-1 overflow-hidden"
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
            className="absolute left-1 top-[38%] -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 bg-white/95 text-[#700b10] rounded-full shadow-md border border-stone-200 flex items-center justify-center cursor-pointer hover:bg-stone-50 transition-all hover:scale-105 active:scale-95"
            aria-label="Previous collections"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-1 top-[38%] -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 bg-white/95 text-[#700b10] rounded-full shadow-md border border-stone-200 flex items-center justify-center cursor-pointer hover:bg-stone-50 transition-all hover:scale-105 active:scale-95"
            aria-label="Next collections"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
          </button>

          {/* 2-Column Transform Track */}
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
            {loading
              ? [...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-1/2 px-1.5 flex-shrink-0 animate-pulse flex flex-col items-center"
                >
                  <div className="w-full aspect-[4/5] rounded-xl sm:rounded-2xl bg-stone-100" />
                  <div className="h-3.5 bg-stone-200 rounded w-2/3 mt-2.5" />
                  <div className="h-3 bg-stone-100 rounded w-1/3 mt-1.5" />
                </div>
              ))
              : extendedCollections.map((col) => {
                const handle =
                  col.handle ||
                  col.slug ||
                  col.title?.toLowerCase().replace(/\s+/g, "-");
                return (
                  <div
                    key={col.uniqueKey || col.id}
                    className="w-1/2 px-1.5 flex-shrink-0 flex flex-col items-center"
                  >
                    <a
                      href={`/collections/${handle}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleCollectionClick(col);
                      }}
                      className="group flex flex-col items-center text-center cursor-pointer select-none w-full block"
                    >
                      {/* Image */}
                      <div className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300">
                        <img
                          src={col.image_url}
                          alt={col.title}
                          loading="lazy"
                          className="w-full h-auto object-contain block transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      {/* Title & Explore link */}
                      <div className="pt-2 sm:pt-3 pb-1 text-center flex flex-col items-center w-full">
                        <h3 className="font-tenor text-xs sm:text-sm md:text-base text-stone-900 group-hover:text-[#700b10] transition-colors line-clamp-1 leading-snug">
                          {col.title}
                        </h3>
                        <p className="mt-0.5 inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold font-nunito text-[#700b10]">
                          Explore
                          <ArrowRight className="w-3 h-3" />
                        </p>
                      </div>
                    </a>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}

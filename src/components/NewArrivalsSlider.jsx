import React, { useState, useEffect, useRef, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { fetchProducts } from "../services/api";

export default function NewArrivalsSlider({ onSelectProduct }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    fetchProducts({ page: 1, limit: 20 })
      .then((res) => {
        if (isMounted) {
          const list = Array.isArray(res) ? res : res?.data || [];
          setProducts(list);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Failed to load new arrivals:", err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Duplicate items into 3 continuous sets for seamless infinite loop
  const displayItems = useMemo(() => {
    if (!products || products.length === 0) return [];
    return [
      ...products.map((p, idx) => ({ ...p, _uniqueKey: `set0-${p.id || idx}-${idx}` })),
      ...products.map((p, idx) => ({ ...p, _uniqueKey: `set1-${p.id || idx}-${idx}` })),
      ...products.map((p, idx) => ({ ...p, _uniqueKey: `set2-${p.id || idx}-${idx}` })),
    ];
  }, [products]);

  // Set initial scroll position to the middle set
  useEffect(() => {
    if (!loading && products.length > 0 && sliderRef.current) {
      const el = sliderRef.current;
      const setInitialScroll = () => {
        if (el && el.scrollWidth > el.clientWidth) {
          const singleSetWidth = el.scrollWidth / 3;
          el.scrollLeft = singleSetWidth;
        }
      };

      const timer = setTimeout(setInitialScroll, 100);
      return () => clearTimeout(timer);
    }
  }, [loading, products]);

  // Calculate dynamic step distance (card width + gap)
  const getStepWidth = () => {
    if (!sliderRef.current) return 300;
    const firstChild = sliderRef.current.firstElementChild;
    if (firstChild) {
      const style = window.getComputedStyle(sliderRef.current);
      const gap = parseFloat(style.columnGap || style.gap || "16") || 16;
      return firstChild.offsetWidth + gap;
    }
    return 300;
  };

  // Seamless scroll threshold wrap-around handler
  const handleScroll = () => {
    if (!sliderRef.current || products.length === 0) return;
    const el = sliderRef.current;
    const singleSetWidth = el.scrollWidth / 3;
    if (singleSetWidth <= 0) return;

    // If scrolled past the 2nd set, seamlessly wrap back to 1st set
    if (el.scrollLeft >= singleSetWidth * 2) {
      el.scrollLeft -= singleSetWidth;
    }
    // If scrolled before the 1st set, seamlessly wrap forward to 2nd set
    else if (el.scrollLeft <= 5) {
      el.scrollLeft += singleSetWidth;
    }
  };

  // Smooth Auto Slide effect (continuous forward infinite loop)
  useEffect(() => {
    if (loading || isPaused || products.length === 0) return;

    const timer = setInterval(() => {
      if (sliderRef.current) {
        const step = getStepWidth();
        sliderRef.current.scrollBy({ left: step, behavior: "smooth" });
      }
    }, 3500);

    return () => clearInterval(timer);
  }, [loading, isPaused, products]);

  const slideLeft = () => {
    if (sliderRef.current) {
      const step = getStepWidth();
      sliderRef.current.scrollBy({ left: -step, behavior: "smooth" });
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      const step = getStepWidth();
      sliderRef.current.scrollBy({ left: step, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full bg-white py-2 md:py-6 px-4 md:px-8 lg:px-12 overflow-hidden">
      <div className="max-w-[95rem] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-2 md:mb-7">
          <h2 className="font-tenor text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#700b10] tracking-tight font-normal mb-1 md:mb-2">
            New Arrivals
          </h2>
        </div>

        {/* Carousel Container with Controls */}
        <div
          className="relative group/slider"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Prev Arrow */}
          <button
            type="button"
            onClick={slideLeft}
            className="absolute -left-2 md:-left-4 top-1/3 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-xl border border-stone-200 text-[#700b10] hover:bg-[#700b10] hover:text-white transition-all transform hover:scale-105 cursor-pointer opacity-90 md:opacity-0 group-hover/slider:opacity-100"
            aria-label="Previous products"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Next Arrow */}
          <button
            type="button"
            onClick={slideRight}
            className="absolute -right-2 md:-right-4 top-1/3 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-xl border border-stone-200 text-[#700b10] hover:bg-[#700b10] hover:text-white transition-all transform hover:scale-105 cursor-pointer opacity-90 md:opacity-0 group-hover/slider:opacity-100"
            aria-label="Next products"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Horizontal Smooth Scroll Track */}
          <div
            ref={sliderRef}
            onScroll={handleScroll}
            className="flex gap-4 sm:gap-6 overflow-x-auto pb-2 pt-1 px-1 scrollbar-none items-stretch will-change-scroll"
          >
            {loading
              ? [...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="w-[calc(50%-8px)] sm:w-[calc(50%-12px)] md:w-[calc(50%-12px)] lg:w-[285px] flex-shrink-0"
                >
                  <ProductCardSkeleton />
                </div>
              ))
              : displayItems.map((product) => (
                <div
                  key={product._uniqueKey || product.id}
                  className="w-[calc(50%-8px)] sm:w-[calc(50%-12px)] md:w-[calc(50%-12px)] lg:w-[285px] flex-shrink-0 flex flex-col"
                >
                  <ProductCard
                    product={product}
                    onSelectProduct={onSelectProduct}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

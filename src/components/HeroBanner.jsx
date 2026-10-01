import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_SLIDES } from '../data/storeData';

export default function HeroBanner() {
  // Cloned first and last slides for true infinite looping without reverse bounce
  const extendedSlides = [
    { ...HERO_SLIDES[HERO_SLIDES.length - 1], uniqueKey: 'clone-start' },
    ...HERO_SLIDES.map((slide) => ({ ...slide, uniqueKey: `real-${slide.id}` })),
    { ...HERO_SLIDES[0], uniqueKey: 'clone-end' },
  ];

  // Initial index is 1 (pointing to the real first slide)
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const isAnimating = useRef(false);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Auto-slide every 4.5 seconds continuously
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 4500);
    return () => clearInterval(timer);
  }, [currentIndex, isPaused, isTransitioning]);

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
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleTransitionEnd = (e) => {
    // Only process transition for the slider track container itself, not bubbling children
    if (e && e.target !== e.currentTarget) return;

    // If we reached the clone of the first slide at the very end, instantly jump to real slide 1
    if (currentIndex >= extendedSlides.length - 1) {
      setIsTransitioning(false);
      setCurrentIndex(1);
    }
    // If we reached the clone of the last slide at the very beginning, instantly jump to real last slide
    else if (currentIndex <= 0) {
      setIsTransitioning(false);
      setCurrentIndex(HERO_SLIDES.length);
    }
  };

  const handleIndicatorClick = (idx) => {
    setIsTransitioning(true);
    setCurrentIndex(idx + 1);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Calculate active indicator (0 to HERO_SLIDES.length - 1)
  const activeSlideIndex = (currentIndex - 1 + HERO_SLIDES.length) % HERO_SLIDES.length;

  return (
    <section
      className="relative w-full aspect-[1060/1485] sm:aspect-[1060/1485] md:aspect-[1060/1485] lg:aspect-auto lg:h-[80vh] overflow-hidden bg-[#ffffff] group select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slider Wrapper with relaxed, ultra-smooth continuous gliding */}
      <div
        className={`flex h-full will-change-transform ${isTransitioning
            ? 'transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]'
            : 'transition-none'
          }`}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTransitionEnd={handleTransitionEnd}
      >
        {extendedSlides.map((slide, index) => (
          <div key={slide.uniqueKey || `${slide.id}-${index}`} className="w-full min-w-full h-full relative flex items-center justify-center flex-shrink-0 overflow-hidden">
            <picture className="w-full h-full block">
              {/* Mobile and Tablets (up to 1023px) use mobile format banner */}
              <source media="(max-width: 1023px)" srcSet={slide.mobileImage} />
              {/* Desktop and Laptop screens (1024px and above) keep original desktop banner */}
              <source media="(min-width: 1024px)" srcSet={slide.desktopImage} />
              <img
                src={slide.desktopImage}
                alt={slide.title}
                loading={index <= 2 ? "eager" : "lazy"}
                fetchPriority={index === 1 ? "high" : "low"}
                decoding={index === 1 ? "sync" : "async"}
                className="w-full h-full object-cover object-center pointer-events-none block"
                draggable={false}
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Prev / Next Navigation Buttons */}
      <button
        type="button"
        onClick={handlePrev}
        className="flex items-center justify-center absolute left-2 sm:left-3 md:left-4 xl:left-6 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 bg-black/35 hover:bg-black/70 active:scale-95 text-white rounded-full backdrop-blur-md transition-all hover:scale-105 z-20 cursor-pointer shadow-md border border-white/20"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
      </button>
      <button
        type="button"
        onClick={handleNext}
        className="flex items-center justify-center absolute right-2 sm:right-3 md:right-4 xl:right-6 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 bg-black/35 hover:bg-black/70 active:scale-95 text-white rounded-full backdrop-blur-md transition-all hover:scale-105 z-20 cursor-pointer shadow-md border border-white/20"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-3.5 sm:bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2 z-20">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleIndicatorClick(idx)}
            className={`transition-all duration-500 ease-out cursor-pointer rounded-full ${activeSlideIndex === idx
                ? 'w-6 sm:w-7 h-2 sm:h-2 bg-[#ebd99c] shadow-sm'
                : 'w-2 h-2 rounded-full bg-white/75 hover:bg-white'
              }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

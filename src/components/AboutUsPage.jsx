import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function AboutUsPage({ onNavigate }) {
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: "Ritik Sharma",
      location: "Varanasi",
      image: "/testimonial1.png",
      quote:
        "Shri Nilkanth Store (Trade Name: ILAVIZ) truly understands devotion. The quality of their brass lota and pooja items is unmatched — it feels like every piece is made with pure intention.",
    },
    {
      id: 2,
      name: "Divyesh Mehta",
      location: "Jaipur",
      image: "/testimonial2.png",
      quote:
        "I appreciate the attention to detail and authenticity in every product. You can tell Shri Nilkanth Store (Trade Name: ILAVIZ) is built on values, not just sales.",
    },
    {
      id: 3,
      name: "Amit Desai",
      location: "Ahmedabad",
      image: "/testimonial3.png",
      quote:
        "I ordered a silver kalash for a family ritual, and it was delivered with such care. Beautifully packed, authentic, and full of spiritual energy.",
    },
    {
      id: 4,
      name: "Sanjay Patel",
      location: "Surat",
      image: "/testimonial4.png",
      quote:
        "The collection at Shri Nilkanth Store (Trade Name: ILAVIZ) is simply divine. I found everything I needed for my home temple in one place. Highly recommended!",
    },
    {
      id: 5,
      name: "Meera Shah",
      location: "Mumbai",
      image: "/testimonial5.png",
      quote:
        "Exquisite craftsmanship and very prompt delivery. The brass idols have a beautiful finish that reflects the artisans' dedication.",
    },
  ];

  // Auto slide effect
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      if (sliderRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 15) {
          sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          sliderRef.current.scrollBy({ left: 360, behavior: "smooth" });
        }
      }
    }, 4000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -360, behavior: "smooth" });
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 360, behavior: "smooth" });
    }
  };
  return (
    <div className="w-full bg-[#ffffff] min-h-screen text-[#1c1917] font-nunito pb-20">
      {/* 1. Breadcrumb bar */}
      <div className="w-full border-b border-stone-200/70 bg-white/70 backdrop-blur-sm">
        <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-12 py-3.5 flex items-center gap-2 text-xs sm:text-sm text-stone-500">
          <button
            type="button"
            onClick={() => onNavigate?.("home")}
            className="hover:text-[#700b10] transition-colors font-medium cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-[#700b10] font-semibold">About Us</span>
        </div>
      </div>
      {/* 2. Hero Banner: using /about-us.png without cutting/cropping */}
      <section className="w-full relative overflow-hidden bg-[#faeed1] shadow-xs">
        <div className="w-full flex items-center justify-center">
          <img
            src="https://megaecomm.megascale.co.in/backend/media/16/general/2781aca265df0eddb8c8d07e95def2bf.png"
            alt="About Us - Shri Nilkanth Store"
            className="w-full h-auto max-w-[1920px] object-contain select-none block"
            loading="eager"
          />
        </div>
      </section>

      {/* 3. Sacred Responsibility Section matching screenshot */}
      <section className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-12 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
          {/* Left Column: Image /about1.png */}
          <div className="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-[480px] rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.05)] border border-stone-200/60 bg-[#faeed1]/30">
              <img
                src="https://megaecomm.megascale.co.in/backend/media/16/general/2f43406d6404cc6ddd675e1db02e5b67.png"
                alt="Sacred Offerings - Pooja Samagri, Diya, and Temple Artifacts"
                className="w-full h-auto object-contain block select-none"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column: Sacred Responsibility Typography & Content */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col text-left">
            <span className="text-xs sm:text-[13px] font-semibold text-[#b8944d] uppercase tracking-wider mb-1.5 font-nunito">
              Shri Nilkanth Store (Trade Name: ILAVIZ)
            </span>

            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#700b10] font-normal tracking-tight mb-3.5 leading-tight">
              Sacred Responsibility
            </h2>

            <p className="text-stone-600 text-xs sm:text-sm md:text-[15px] leading-relaxed font-nunito mb-6 max-w-2xl">
              At Shri Nilkanth Store (Trade Name: ILAVIZ), we honor tradition with
              responsibility. Our products are thoughtfully sourced and crafted
              using ethical practices that respect both nature and spirituality.
              By supporting sustainable craftsmanship, we not only preserve
              cultural heritage but also uplift the artisans and communities
              behind each sacred creation.
            </p>

            <div>
              <button
                type="button"
                onClick={() => onNavigate?.("shop")}
                className="inline-flex items-center gap-2 bg-[#ebd99c] hover:bg-[#dfcb88] active:scale-[0.98] text-[#700b10] font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-xs transition-all duration-200 cursor-pointer"
              >
                Explore our products &gt;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Full-Width Devotion Quote Banner */}
      <section className="w-full bg-[#700b10] text-white py-10 sm:py-12 md:py-14 px-4 sm:px-6 lg:px-12 my-2 sm:my-3 shadow-inner">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="font-sans italic text-sm sm:text-base md:text-lg lg:text-[19px] text-stone-100 font-light leading-relaxed sm:leading-loose mb-4">
            &ldquo; Shri Nilkanth Store (Trade Name: ILAVIZ) is guided by devotion,
            integrity, and purpose. We aim to bring lasting value to every soul
            we connect with &mdash; from our customers and artisans to the
            communities and traditions we proudly uphold. &rdquo;
          </blockquote>

          <cite className="not-italic text-xs sm:text-[13px] tracking-[0.2em] uppercase text-stone-200/90 font-medium block">
            - SHRI NILKANTH STORE (TRADE NAME : ILAVIZ)
          </cite>
        </div>
      </section>

      {/* 5. "Who we are" and "Our Purpose" alternating sections */}
      <section className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-12 md:py-16 space-y-12 sm:space-y-14 md:space-y-16">
        {/* Row 1: "Who we are" (Image Left, Text Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
          {/* Left Column: about2.png */}
          <div className="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-[480px] rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.05)] border border-stone-200/60 bg-[#faeed1]/30">
              <img
                src="https://megaecomm.megascale.co.in/backend/media/16/general/73b41c6ba2cba262fa3e4afabdb0047a.png"
                alt="Who we are - Devoted to bringing purity and tradition"
                className="w-full h-auto object-contain block select-none"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column: Text Content */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col text-left">
            <span className="text-xs sm:text-[13px] font-semibold text-[#b8944d] uppercase tracking-[0.16em] mb-1.5 font-nunito">
              TRADITION WITH PURPOSE
            </span>

            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#700b10] font-normal tracking-tight mb-3.5 leading-tight">
              Who we are
            </h2>

            <p className="text-stone-600 text-xs sm:text-sm md:text-[15px] leading-relaxed font-nunito mb-5 max-w-2xl">
              At Shri Nilkanth Store (Trade Name: ILAVIZ), we are devoted to bringing
              purity, tradition, and spiritual grace into every home. Rooted in
              the essence of Indian rituals, our mission is to preserve sacred
              customs while making them accessible for the modern devotee. Every
              product we offer is a reflection of our commitment to
              authenticity, devotion, and trust.
            </p>

            <div>
              <button
                type="button"
                onClick={() => onNavigate?.("shop")}
                className="inline-block text-[#700b10] font-bold text-xs sm:text-sm tracking-wide underline underline-offset-4 hover:text-[#b8944d] transition-colors cursor-pointer"
              >
                Discover Now
              </button>
            </div>
          </div>
        </div>

        {/* Row 2: "Our Purpose" (Text Left, Image Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col text-left order-2 lg:order-1">
            <span className="text-xs sm:text-[13px] font-semibold text-[#b8944d] uppercase tracking-[0.16em] mb-1.5 font-nunito">
              OUR COMMITMENT
            </span>

            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#700b10] font-normal tracking-tight mb-3.5 leading-tight">
              Our Purpose
            </h2>

            <div className="space-y-3 text-stone-600 text-xs sm:text-sm md:text-[15px] leading-relaxed font-nunito mb-5 max-w-2xl">
              <p>
                At Shri Nilkanth Store (Trade Name: ILAVIZ), our purpose is to make
                every spiritual moment more meaningful &mdash; by offering
                products that help you connect deeply with your faith,
                traditions, and inner peace. Rooted in a profound understanding
                of pooja practices and cultural significance, we are honored to
                be part of countless sacred rituals across homes and temples.
              </p>
              <p>
                We also believe that spirituality and sustainability go hand in
                hand. That&rsquo;s why we are committed to using eco-friendly
                materials and reducing waste &mdash; honoring not just the
                divine, but also the Earth that sustains us. With devotion at
                our core, we strive to serve with purity, purpose, and
                responsibility.
              </p>
            </div>

            <div>
              <button
                type="button"
                onClick={() => onNavigate?.("shop")}
                className="inline-block text-[#700b10] font-bold text-xs sm:text-sm tracking-wide underline underline-offset-4 hover:text-[#b8944d] transition-colors cursor-pointer"
              >
                Learn more
              </button>
            </div>
          </div>

          {/* Right Column: about3.png */}
          <div className="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-start order-1 lg:order-2">
            <div className="w-full max-w-[480px] rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.05)] border border-stone-200/60 bg-[#faeed1]/30">
              <img
                src="https://megaecomm.megascale.co.in/backend/media/16/general/66870b60e56df1006d2522570cbc8628.png"
                alt="Our Purpose - Shudh Bhakti, Sacha Uddesh"
                className="w-full h-auto object-contain block select-none"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Customer Testimonials 3-Column Slider with Arrow Controls */}
      <section
        className="w-full bg-[#ffffff] py-10 sm:py-12 md:py-16 overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          {/* Section Heading */}
          <div className="mb-8 md:mb-10 text-center">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#700b10] font-normal tracking-tight">
              Testimonial
            </h2>
          </div>

          {/* Slider Container with Left & Right Arrow Buttons */}
          <div className="relative group/testimonials w-full px-2 sm:px-6">
            {/* Left Circular Arrow */}
            <button
              type="button"
              onClick={slideLeft}
              className="absolute -left-2 sm:-left-3 md:-left-4 top-[32%] -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-stone-800 hover:text-[#700b10] shadow-[0_4px_18px_rgba(0,0,0,0.16)] border border-stone-200 flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
              aria-label="Previous Testimonials"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
            </button>

            {/* Right Circular Arrow */}
            <button
              type="button"
              onClick={slideRight}
              className="absolute -right-2 sm:-right-3 md:-right-4 top-[32%] -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-stone-800 hover:text-[#700b10] shadow-[0_4px_18px_rgba(0,0,0,0.16)] border border-stone-200 flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
              aria-label="Next Testimonials"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
            </button>

            {/* 3-Column Sliding Track with reduced gap between columns */}
            <div
              ref={sliderRef}
              className="flex items-stretch gap-3 sm:gap-4 md:gap-5 overflow-x-auto scroll-smooth py-4 px-1 scrollbar-none"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="flex-shrink-0 w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] flex flex-col items-center text-center px-2 sm:px-3"
                  style={{ scrollSnapAlign: "start" }}
                >
                  {/* User Portrait with smooth rounded square shape matching screenshot */}
                  <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-[2rem] overflow-hidden bg-white shadow-[0_8px_25px_rgba(0,0,0,0.08)] border-2 border-white ring-1 ring-stone-200/70 mb-5 flex-shrink-0">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-full h-full object-cover select-none"
                      loading="lazy"
                    />
                  </div>

                  {/* Testimonial Quote with increased font size */}
                  <p className="font-nunito italic text-stone-700 text-sm sm:text-[15.5px] md:text-[16.5px] leading-relaxed mb-4 min-h-[5.5rem] flex items-center justify-center max-w-sm">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  {/* Author Name with increased font size */}
                  <h4 className="font-serif text-lg sm:text-[20px] text-[#700b10] font-normal tracking-wide">
                    {t.name}
                  </h4>

                  {/* Location with increased font size */}
                  <span className="text-xs sm:text-sm text-stone-500 font-nunito mt-1">
                    {t.location}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

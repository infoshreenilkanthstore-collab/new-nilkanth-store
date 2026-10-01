import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';
import { fetchProducts } from '../services/api';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function ProductSection({ onSelectProduct }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

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
        console.error("Failed loading products:", err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Filter products by tab
  const filteredProducts = activeTab === "all"
    ? products
    : products.filter(p => p.category?.toLowerCase() === activeTab.toLowerCase());

  return (
    <section id="shop" className="w-full bg-[#ffffff] py-12 md:py-18 px-4 md:px-8 lg:px-12 border-t border-stone-200/70">
      <div className="max-w-[95rem] mx-auto">

        {/* Section Heading matching store.nilkanthdham.in */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/60 text-[#700b10] text-xs font-bold font-jost uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#b5944d]" />
              Divine Offerings
            </div>
            <h2 className="font-tenor text-3xl md:text-5xl text-[#700b10] tracking-tight">
              Popular Pooja &amp; Spiritual Essentials
            </h2>
            <p className="text-stone-500 text-xs md:text-sm mt-1 max-w-xl font-nunito">
              Handcrafted and pure religious essentials directly blessed and prepared for your sacred home rituals.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {["all", "Attar", "Perfume", "Air Freshner", "Pooja Samagri"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-xs md:text-sm font-bold font-nunito transition-all whitespace-nowrap cursor-pointer ${activeTab === tab
                    ? 'bg-[#700b10] text-white shadow-md'
                    : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-300'
                  }`}
              >
                {tab === "all" ? "All Products" : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
          {loading ? (
            // Shimmer skeleton loaders while fetching (zero layout shift)
            [...Array(8)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onSelectProduct={onSelectProduct}
              />
            ))
          ) : (
            <div className="col-span-full py-16 text-center text-stone-500 font-nunito">
              No products found in this category right now.
            </div>
          )}
        </div>

        {/* Explore all CTA */}
        <div className="mt-12 text-center">
          <a
            href="#collections"
            className="inline-flex items-center gap-2 bg-white text-[#700b10] border-2 border-[#700b10] hover:bg-[#700b10] hover:text-white px-8 py-3.5 rounded-full font-bold text-sm sm:text-base font-nunito shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Explore All Collections
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}

import React, { useState, useEffect } from "react";
import { ArrowRight, Sparkles, Layers, ArrowLeft } from "lucide-react";
import { fetchCollections } from "../services/api";
import ShopPage from "./ShopPage";

export default function CollectionsPage({ 
  collectionHandle = null, 
  onSelectCollection, 
  onNavigate,
  onSelectProduct 
}) {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch list of all active collections
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchCollections()
      .then((res) => {
        if (isMounted) {
          const list = Array.isArray(res) ? res : res?.data || [];
          // Strictly fetch and display ONLY active & visible collections
          const activeOnly = list.filter((item) => {
            return (
              item.is_active === true &&
              item.is_display === true &&
              item.image_url &&
              parseInt(item.product_count || 0, 10) > 0
            );
          });

          // Order logically: Agarbatti, Dhoop, Attar, Perfume, Air Freshner
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
        console.error("Failed loading collections:", err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleCollectionClick = (col) => {
    if (onSelectCollection) {
      onSelectCollection(col);
    }
  };

  // If a specific collection is selected, render the full ShopPage layout for that collection
  if (collectionHandle) {
    return (
      <ShopPage
        key={collectionHandle}
        collectionHandle={collectionHandle}
        onNavigate={onNavigate}
        onSelectProduct={onSelectProduct}
      />
    );
  }


  // Otherwise, render the list of all collections
  return (
    <div className="w-full bg-[#ffffff]">
      {/* Main Content Container */}
      <div className="max-w-[95rem] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-6 sm:pt-8 md:pt-10 pb-6 sm:pb-8 md:pb-10">
        {/* Header matching store.nilkanthdham.in */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <h1 className="font-tenor text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#700b10] font-normal tracking-tight">
            Our Collections
          </h1>
          <p className="text-stone-500 font-nunito text-xs sm:text-sm mt-1.5 max-w-2xl mx-auto uppercase tracking-widest">
            Home / Collections ({collections.length} Categories)
          </p>
        </div>

        {/* 3. Collections Responsive Cards Grid:
            - Desktop & Laptop (lg, xl): 5 Columns
            - Tablet (md): 3 Columns, (sm): 2 Columns
            - Mobile: 2 Columns
        */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-6 lg:gap-6 xl:gap-8">
          {loading ? (
            // Shimmer skeleton loaders
            [...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse flex flex-col items-center">
                <div className="w-full aspect-[4/5] rounded-2xl" />
                <div className="h-4 rounded w-1/2 mt-3" />
                <div className="h-3 rounded w-1/3 mt-2" />
              </div>
            ))
          ) : collections.length > 0 ? (
            collections.map((col) => {
              const count = parseInt(col.product_count || 0, 10);
              const handle = col.handle || col.slug || col.title.toLowerCase().replace(/\s+/g, '-');
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
                  {/* Full Size Uncut Image Container without card background */}
                  <div className="relative w-full rounded-2xl overflow-hidden transition-all duration-300">
                    <img
                      src={col.image_url}
                      alt={col.title}
                      loading="lazy"
                      className="w-full h-auto object-contain block transition-transform duration-500 group-hover:scale-103"
                    />
                  </div>

                  {/* Title & Exploration Footer below image */}
                  <div className="pt-3.5 pb-2 text-center flex flex-col items-center">
                    <h3 className="font-tenor text-base sm:text-lg md:text-xl text-stone-900 group-hover:text-[#700b10] transition-colors leading-snug">
                      {col.title}
                    </h3>
                    <p className="mt-1 inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-bold font-nunito text-[#700b10] group-hover:underline group-hover:gap-2 transition-all">
                      Explore Collection
                      <ArrowRight className="w-3.5 h-3.5" />
                    </p>
                  </div>
                </a>
              );
            })
          ) : (
            <div className="col-span-full py-20 text-center bg-white rounded-2xl border border-stone-200/80 p-8">
              <Layers className="w-12 h-12 text-[#700b10]/40 mx-auto mb-3" />
              <p className="text-stone-600 font-nunito text-base font-semibold">
                No collections available right now.
              </p>
              <button
                type="button"
                onClick={() => onNavigate?.("shop")}
                className="mt-4 px-6 py-2.5 bg-[#700b10] text-white text-xs sm:text-sm font-bold rounded-full font-nunito hover:bg-[#851016] transition-colors shadow-xs cursor-pointer"
              >
                Go to Shop
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../services/api';

export default function ProductMarquee({ onSelectProduct }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let isMounted = true;
    fetchProducts({ page: 1, limit: 15 })
      .then((res) => {
        if (isMounted) {
          const list = Array.isArray(res) ? res : (res?.data || []);
          if (list.length > 0) {
            setProducts(list);
          }
        }
      })
      .catch((err) => console.error("Error loading marquee products:", err));

    return () => {
      isMounted = false;
    };
  }, []);

  if (products.length === 0) return null;

  return (
    <div className="w-full bg-[#ffffff] border-y border-[#ebd99c]/40 py-2 sm:py-2.5 overflow-hidden select-none">
      <div className="animate-product-marquee flex items-center">
        {[...Array(4)].map((_, loopIdx) => (
          <React.Fragment key={loopIdx}>
            {products.map((prod) => {
              const image =
                prod.image_url ||
                prod.images?.[0]?.url ||
                "https://megaecomm.megascale.co.in/backend/media/16/general/66066c8ca3ab4a8cc35413b3a26e3314.jpeg";

              return (
                <div
                  key={`${loopIdx}-${prod.id}`}
                  onClick={() => onSelectProduct?.(prod)}
                  className="flex items-center gap-2.5 sm:gap-3 px-5 sm:px-8 py-0.5 flex-shrink-0 cursor-pointer group"
                >
                  {/* Square Product Image thumbnail */}
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-white border border-stone-200/80 shadow-xs overflow-hidden flex-shrink-0 flex items-center justify-center p-0.5">
                    <img
                      src={image}
                      alt={prod.title}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Product Title */}
                  <span className="text-[13px] sm:text-[14px] text-[#700b10] font-nunito font-medium group-hover:underline whitespace-nowrap transition-colors">
                    {prod.title}
                  </span>
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

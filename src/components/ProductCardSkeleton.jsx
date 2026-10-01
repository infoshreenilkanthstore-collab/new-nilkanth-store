import React from 'react';

export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-none overflow-hidden flex flex-col animate-pulse w-full">
      {/* Skeleton Image Area */}
      <div className="aspect-square w-full bg-stone-100 rounded-xl sm:rounded-2xl flex items-center justify-center p-3 relative">
        <div className="w-2/3 h-2/3 bg-stone-200/70 rounded-xl" />
      </div>

      {/* Skeleton Text Area */}
      <div className="pt-3 pb-1 flex flex-col gap-2.5">
        <div className="w-20 h-2.5 bg-stone-200 rounded" />
        <div className="w-full h-3.5 bg-stone-200 rounded" />
        <div className="w-3/4 h-3.5 bg-stone-200 rounded" />
        <div className="w-28 h-3 bg-stone-200 rounded" />
        <div className="w-16 h-4 bg-stone-200 rounded" />
        <div className="w-12 h-3.5 bg-stone-200 rounded" />
        {/* Button placeholder */}
        <div className="w-full h-10 bg-stone-200 rounded-full mt-2" />
      </div>
    </div>
  );
}

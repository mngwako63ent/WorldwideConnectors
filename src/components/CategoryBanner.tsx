import React from 'react';
import { ProductCategory } from '../types';
import { CATEGORY_BANNERS } from '../data/products';
import { ShieldCheck } from 'lucide-react';

interface CategoryBannerProps {
  category: ProductCategory;
}

export const CategoryBanner: React.FC<CategoryBannerProps> = ({ category }) => {
  if (category === 'All') return null;

  const data = CATEGORY_BANNERS[category];
  if (!data) return null;

  return (
    <div className="relative w-full h-64 sm:h-80 md:h-96 bg-zinc-950 text-white overflow-hidden my-6 rounded-3xl shadow-xl border border-zinc-800">
      {/* Background imagery with dark moody grading */}
      <img
        src={data.image}
        alt={data.subtitle}
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover object-center brightness-90"
      />
      
      {/* Dark overlay scrim for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

      {/* Typography Overlay */}
      <div className="relative z-10 max-w-[1440px] h-full mx-auto px-6 sm:px-10 flex flex-col justify-center">
        <div className="max-w-xl space-y-2.5">
          
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold tracking-wider text-cyan-400 uppercase">
            <span>{data.title}</span>
            <span>·</span>
            <span>{data.tag}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white capitalize">
            {data.subtitle}
          </h2>

          <p className="text-xs sm:text-sm text-zinc-300 max-w-md pt-1 line-clamp-2">
            {data.description}
          </p>

          <div className="pt-2 flex items-center gap-4">
            <span className="text-sm font-extrabold text-amber-400 tracking-wide tabular-nums">
              {data.startingPrice}
            </span>
            <span className="text-xs text-zinc-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              12-Month Hardware Warranty
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

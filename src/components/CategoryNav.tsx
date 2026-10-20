import React from 'react';
import { useCart } from '../context/CartContext';
import { CATEGORIES_QUICK_LIST } from '../data/products';
import { ProductCategory } from '../types';
import { ArrowRight } from 'lucide-react';

export const CategoryNav: React.FC = () => {
  const { activeCategory, goToCategory, setCurrentPage } = useCart();

  return (
    <section className="bg-white py-12 sm:py-16 border-b border-zinc-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-1">
              Refurbished Hardware
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950">
              Explore by Device Family
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">
              Select an Apple category to view available pre-owned models and certified specs
            </p>
          </div>

          <button
            onClick={() => setCurrentPage('shop')}
            className="self-start sm:self-auto flex items-center gap-2 text-xs sm:text-sm font-bold text-zinc-900 hover:text-blue-600 transition-colors cursor-pointer group"
          >
            <span>View Full Catalog</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Categories Grid with soft rounded-2xl cards and improved hover */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {CATEGORIES_QUICK_LIST.map((item, idx) => {
            const isSelected = activeCategory === item.category;
            return (
              <button
                key={idx}
                onClick={() => goToCategory(item.category as ProductCategory)}
                className={`group flex flex-col items-center p-5 rounded-2xl border text-center transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/40 shadow-md ring-2 ring-blue-600/20'
                    : 'border-zinc-200/90 bg-white hover:border-blue-300 hover:shadow-lg hover:-translate-y-1'
                }`}
              >
                {/* Title */}
                <span className="text-xs sm:text-sm font-bold text-zinc-900 tracking-tight mb-3 group-hover:text-blue-600 transition-colors">
                  {item.name}
                </span>

                {/* Clean Product Image Stage */}
                <div className="w-full aspect-square flex items-center justify-center p-3 relative overflow-hidden bg-zinc-50/70 rounded-xl mb-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Subtitle tag */}
                <span className="text-[11px] font-semibold text-zinc-400 group-hover:text-zinc-600 transition-colors">
                  12M Warranty
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};

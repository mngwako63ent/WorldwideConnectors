import React from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { Search, X, ArrowRight, ShieldCheck } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    setSelectedProduct,
    formatPrice,
    setActiveCategory,
    setCurrentPage
  } = useCart();

  if (!isSearchOpen) return null;

  const results = searchQuery.trim()
    ? PRODUCTS.filter(p => {
        const q = searchQuery.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.categoryTag.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
        );
      })
    : PRODUCTS.slice(0, 6);

  const handleSelectProduct = (product: typeof PRODUCTS[0]) => {
    setSelectedProduct(product);
    setIsSearchOpen(false);
  };

  const handleQuickTag = (tag: string) => {
    setSearchQuery(tag);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 animate-in fade-in duration-150">
      <div
        className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-zinc-200 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-zinc-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-blue-600 shrink-0" />
          <input
            type="text"
            autoFocus
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search refurbished MacBooks, iPhone 16 Pro, iPad Pro, AirPods..."
            className="w-full text-sm sm:text-base text-zinc-900 placeholder-zinc-400 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-zinc-400 hover:text-zinc-700 p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs font-semibold text-zinc-500 hover:text-zinc-900 px-2.5 py-1 bg-zinc-100 hover:bg-zinc-200 rounded-lg transition-colors cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Quick Tag Recommendations with rounded-xl pills */}
        <div className="px-6 py-3 bg-zinc-50 border-b border-zinc-100 flex items-center gap-2 overflow-x-auto text-xs scrollbar-none">
          <span className="text-zinc-400 font-medium shrink-0">Popular:</span>
          {['iPhone 16 Pro Max', 'MacBook Pro M2', 'AirPods Pro', 'iPad Pro', 'Apple Watch Ultra'].map(tag => (
            <button
              key={tag}
              onClick={() => handleQuickTag(tag)}
              className="px-3 py-1 bg-white hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 text-zinc-700 rounded-xl border border-zinc-200 transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 divide-y divide-zinc-100">
          <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
            {searchQuery.trim() ? `Found ${results.length} Matching Devices` : 'Featured Refurbished Devices'}
          </div>

          {results.length > 0 ? (
            results.map(product => (
              <div
                key={product.id}
                onClick={() => handleSelectProduct(product)}
                className="py-3 flex items-center justify-between gap-4 group cursor-pointer hover:bg-zinc-50 rounded-xl px-3 -mx-3 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 bg-white rounded-xl border border-zinc-200/80 p-1.5 flex items-center justify-center shrink-0">
                    <img
                      src={product.image}
                      alt={product.title}
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-bold text-zinc-900 group-hover:text-blue-600 transition-colors truncate">
                      {product.title}
                    </div>
                    <div className="text-[11px] text-zinc-500 flex items-center gap-2 mt-0.5">
                      <span>{product.category}</span>
                      <span>·</span>
                      <span className="text-emerald-700 font-medium">{product.batteryHealth}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <div className="text-xs sm:text-sm font-bold text-zinc-950 tabular-nums">
                      {formatPrice(product.basePriceZAR)}
                    </div>
                    {product.originalPriceZAR && (
                      <div className="text-[10px] text-zinc-400 line-through">
                        {formatPrice(product.originalPriceZAR)}
                      </div>
                    )}
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-300 group-hover:text-blue-600 transition-colors" />
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-zinc-500">
              <p className="text-xs font-medium">No refurbished devices found matching "{searchQuery}"</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-zinc-50 border-t border-zinc-200 flex items-center justify-between text-xs text-zinc-500 px-6">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>12-Month Hardware Warranty on All Devices</span>
          </div>
          <button
            onClick={() => {
              setActiveCategory('All');
              setIsSearchOpen(false);
              setCurrentPage('shop');
            }}
            className="font-bold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
          >
            Open Full Shop Catalog →
          </button>
        </div>

      </div>
    </div>
  );
};

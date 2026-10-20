import React, { useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { CategoryBanner } from '../components/CategoryBanner';
import { ProductCategory } from '../types';
import { Search, SlidersHorizontal, X, Sparkles, RotateCcw } from 'lucide-react';

const CATEGORIES: ProductCategory[] = [
  'All',
  'MacBooks',
  'iPad',
  'iPhone',
  'Apple Watch',
  'AirPods',
  'Accessories'
];

export const ShopPage: React.FC = () => {
  const {
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    priceSort,
    setPriceSort,
    gradeFilter,
    setGradeFilter,
    setCurrentPage
  } = useCart();

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      // Category filter
      if (activeCategory !== 'All' && product.category !== activeCategory) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = product.title.toLowerCase().includes(q);
        const matchesCategory = product.category.toLowerCase().includes(q);
        const matchesTag = product.categoryTag.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCategory && !matchesTag && !matchesDesc) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (priceSort === 'asc') return a.basePriceZAR - b.basePriceZAR;
      if (priceSort === 'desc') return b.basePriceZAR - a.basePriceZAR;
      if (a.isBestSeller && !b.isBestSeller) return -1;
      if (!a.isBestSeller && b.isBestSeller) return 1;
      return 0;
    });
  }, [activeCategory, searchQuery, priceSort]);

  const hasActiveFilters = activeCategory !== 'All' || searchQuery.trim() !== '' || gradeFilter !== 'All' || priceSort !== 'default';

  const resetAllFilters = () => {
    setActiveCategory('All');
    setSearchQuery('');
    setGradeFilter('All');
    setPriceSort('default');
  };

  return (
    <div className="bg-zinc-50/60 min-h-screen py-10 sm:py-14 animate-in fade-in duration-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 mb-1">
              <button
                onClick={() => setCurrentPage('home')}
                className="hover:text-zinc-950 transition-colors cursor-pointer"
              >
                Home
              </button>
              <span>/</span>
              <span className="text-zinc-900 font-bold">Shop Catalog</span>
              {activeCategory !== 'All' && (
                <>
                  <span>/</span>
                  <span className="text-blue-600 font-bold">{activeCategory}</span>
                </>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-zinc-950">
              {activeCategory === 'All' ? 'All Certified Refurbished Apple Hardware' : `${activeCategory} Collection`}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">
              Showing {filteredProducts.length} certified pre-owned Apple devices with 1-Year Warranty &amp; Battery Guarantee
            </p>
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetAllFilters}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-700 rounded-xl text-xs font-semibold transition-all shadow-2xs cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>

        {/* Category Banner if category selected */}
        {activeCategory !== 'All' && <CategoryBanner category={activeCategory} />}

        {/* Filter & Search Toolbar (Redesigned with soft rounded-2xl container & rounded-xl controls) */}
        <div className="bg-white p-5 rounded-2xl border border-zinc-200/90 shadow-xs mb-8 space-y-4">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search models (e.g. M2 Pro, iPhone 16, AirPods Max)..."
                className="w-full text-xs sm:text-sm pl-10 pr-9 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Controls: Grade Filter & Sort (rounded-xl) */}
            <div className="flex flex-wrap items-center gap-3">
              
              {/* Grade Selector */}
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-500" />
                <select
                  value={gradeFilter}
                  onChange={e => setGradeFilter(e.target.value as any)}
                  className="bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs font-semibold text-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
                >
                  <option value="All">All Grades (A+ / A / B)</option>
                  <option value="Pristine (Grade A+)">Pristine (Grade A+)</option>
                  <option value="Excellent (Grade A)">Excellent (Grade A)</option>
                  <option value="Good (Grade B)">Good (Grade B)</option>
                </select>
              </div>

              {/* Price Sort */}
              <select
                value={priceSort}
                onChange={e => setPriceSort(e.target.value as any)}
                className="bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs font-semibold text-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
              >
                <option value="default">Sort: Recommended</option>
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
              </select>

            </div>

          </div>

          {/* Category Filter Pills (Soft rounded-xl buttons) */}
          <div className="pt-3 border-t border-zinc-100 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map(cat => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 hover:text-zinc-950'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

        </div>

        {/* Product Cards Grid with responsive spacing (Mobile 1-2, Tablet 2-3, Desktop 4-5) */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 min-[480px]:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-zinc-200 p-12 text-center max-w-md mx-auto my-12 shadow-sm">
            <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-4 text-zinc-400">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-zinc-900">No matching devices found</h3>
            <p className="text-xs text-zinc-500 mt-1 mb-6">
              Try adjusting your search terms or reset your filters to browse available inventory.
            </p>
            <button
              onClick={resetAllFilters}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

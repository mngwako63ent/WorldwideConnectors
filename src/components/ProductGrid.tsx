import React, { useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { CategoryBanner } from './CategoryBanner';
import { ProductCategory } from '../types';
import { SlidersHorizontal, Sparkles } from 'lucide-react';

const CATEGORIES: ProductCategory[] = [
  'All',
  'MacBooks',
  'iPad',
  'iPhone',
  'Apple Watch',
  'AirPods',
  'Accessories'
];

export const ProductGrid: React.FC = () => {
  const {
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    priceSort,
    setPriceSort,
    gradeFilter,
    setGradeFilter
  } = useCart();

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      if (activeCategory !== 'All' && product.category !== activeCategory) {
        return false;
      }
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

  return (
    <section id="catalog-section" className="bg-zinc-50/50 py-12 sm:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {activeCategory !== 'All' && <CategoryBanner category={activeCategory} />}

        {/* Catalog Control Bar with rounded-2xl container */}
        <div className="bg-white p-5 rounded-2xl border border-zinc-200/90 shadow-xs mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Horizontal Category Filter Pills (Soft rounded-xl buttons) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              {CATEGORIES.map(cat => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 hover:text-zinc-950'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Filter and Sorting controls with rounded-xl corners */}
            <div className="flex items-center gap-3 self-end lg:self-auto shrink-0">
              <div className="flex items-center gap-2 text-xs">
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

          {searchQuery && (
            <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-600">
              <span>
                Showing results matching <strong className="text-zinc-900 font-semibold">"{searchQuery}"</strong> ({filteredProducts.length} devices found)
              </span>
              <button
                onClick={() => setSearchQuery('')}
                className="text-blue-600 hover:text-blue-800 font-semibold underline cursor-pointer"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h3 className="text-lg sm:text-xl font-bold text-zinc-900 tracking-tight">
              {activeCategory === 'All' ? 'Certified Refurbished Inventory' : `${activeCategory} Collection`}
            </h3>
            <span className="text-xs font-semibold px-2.5 py-0.5 bg-zinc-200 text-zinc-800 rounded-full">
              {filteredProducts.length} devices
            </span>
          </div>

          <div className="text-xs text-zinc-500 hidden sm:flex items-center gap-1.5 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>70-Point Lab Tested &amp; Sanitized</span>
          </div>
        </div>

        {/* Product Cards Grid with 5-column desktop presence */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-zinc-200 p-12 text-center max-w-md mx-auto my-12 shadow-sm">
            <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-4 text-zinc-400">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-zinc-900">No matching devices found</h4>
            <p className="text-xs text-zinc-500 mt-1 mb-6">
              Try adjusting your search query or reset your filters.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
                setGradeFilter('All');
              }}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

import React from 'react';
import { Hero } from '../components/Hero';
import { PerksBar } from '../components/PerksBar';
import { CategoryNav } from '../components/CategoryNav';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { ArrowRight, Sparkles, RefreshCw, ShieldCheck, BatteryCharging, CheckCircle2, Percent } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { setCurrentPage, goToCategory, setIsTradeInOpen, formatPrice } = useCart();

  const featuredBestsellers = PRODUCTS.filter(p => p.isBestSeller).slice(0, 5);
  const newArrivals = PRODUCTS.filter(p => p.isNewArrival || p.category === 'MacBooks').slice(0, 4);

  return (
    <div className="space-y-0 animate-in fade-in duration-200">
      {/* 1. Hero Campaign Banner */}
      <Hero />

      {/* 2. Perks & Trust Strip (4 value propositions) */}
      <PerksBar />

      {/* 3. Category Family Navigation */}
      <CategoryNav />

      {/* 4. Best Sellers Collection */}
      <section className="py-16 bg-zinc-50/70 border-b border-zinc-200/80">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-widest mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Most Wanted This Month</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950">
                Refurbished Best Sellers
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                Strict Grade A+ condition devices with over 95% battery capacity and full 12-month warranty
              </p>
            </div>

            <button
              onClick={() => setCurrentPage('shop')}
              className="flex items-center gap-2 text-xs sm:text-sm font-bold text-zinc-900 hover:text-blue-600 transition-colors cursor-pointer group"
            >
              <span>Explore All {PRODUCTS.length} Models</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Grid Layout (Mobile 1-2 cols, Tablet 2-3 cols, Desktop 4-5 cols) */}
          <div className="grid grid-cols-1 min-[480px]:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
            {featuredBestsellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>
      </section>

      {/* 5. Interactive Trade-In Spotlight Section (with smooth rounded-2xl container & rounded-xl buttons) */}
      <section className="py-16 bg-white border-b border-zinc-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-blue-950 text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-xl">
            
            {/* Background decorative glow */}
            <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-cyan-300 border border-white/10">
                <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
                <span>Circular Economy &amp; Trade-In</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Upgrade to Apple Silicon. <br />Trade in your old device.
              </h2>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-xl">
                Get up to <strong className="text-white font-bold">{formatPrice(16000)}</strong> in instant store credit towards certified refurbished MacBooks, iPhones, or iPads. We test and wipe your old device on the spot.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setIsTradeInOpen(true)}
                  className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all shadow-lg hover:shadow-blue-600/30 active:scale-95 cursor-pointer flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Calculate My Trade-In Value</span>
                </button>

                <button
                  onClick={() => setCurrentPage('about')}
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-colors border border-white/15 cursor-pointer"
                >
                  How Refurbishment Works
                </button>
              </div>

              {/* Perks list */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-zinc-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Instant Discount at Checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Zero Data Risk (DoD Sanitized)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Free Return Pickup</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 6. Why Refurbished Callout Grid */}
      <section className="py-16 bg-zinc-50 border-b border-zinc-200/80">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              The world-connet Guarantee
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950 mt-1">
              Engineered to Apple Factory Standards
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 mt-2">
              Why pay retail prices when certified pre-owned gives you identical performance, verified battery health, and warranty coverage?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-7 rounded-2xl border border-zinc-200/90 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-zinc-950 mb-2">
                12 Months Full Hardware Warranty
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                Every unit includes full mechanical, electrical, display, and motherboard warranty. In the rare event of a hardware issue, we repair or replace free of charge.
              </p>
              <button
                onClick={() => setCurrentPage('about')}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 group cursor-pointer"
              >
                <span>Read warranty terms</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-zinc-200/90 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
                <BatteryCharging className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-zinc-950 mb-2">
                90%+ Battery Health Guaranteed
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                We stress-test battery discharge curves under continuous load. Any battery showing under 90% health is replaced with an authentic fresh high-capacity cell.
              </p>
              <button
                onClick={() => setCurrentPage('about')}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 group cursor-pointer"
              >
                <span>View battery diagnostic standards</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-zinc-200/90 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-5">
                <Percent className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-zinc-950 mb-2">
                Save Up To 45% vs New Retail
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                Get the exact same M2/M3 MacBook Pro or iPhone 16 Pro Max experience while keeping thousands of Rands in your pocket and saving electronic waste from landfills.
              </p>
              <button
                onClick={() => setCurrentPage('shop')}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 group cursor-pointer"
              >
                <span>Shop refurbished deals</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 7. Pro MacBook Spotlight */}
      <section className="py-16 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">
                Pro Workstations
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950">
                MacBooks &amp; Laptops
              </h2>
            </div>
            <button
              onClick={() => goToCategory('MacBooks')}
              className="text-xs sm:text-sm font-bold text-blue-600 hover:underline cursor-pointer"
            >
              View All MacBooks →
            </button>
          </div>

          <div className="grid grid-cols-1 min-[480px]:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

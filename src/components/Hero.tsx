import React from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { ShoppingBag, ShieldCheck, BatteryCharging, Award, ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setSelectedProduct, formatPrice, setCurrentPage } = useCart();
  const heroProduct = PRODUCTS.find(p => p.id === 'iphone-16-pro-max') || PRODUCTS[0];

  const handleBuyNow = () => {
    setSelectedProduct(heroProduct);
  };

  return (
    <section className="relative bg-zinc-950 text-white overflow-hidden border-b border-zinc-800">
      <div className="relative w-full min-h-[520px] sm:min-h-[600px] lg:min-h-[660px] flex items-center">
        
        {/* Background Image with dark overlay scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_iphone_titanium_1792422845811.jpg"
            alt="Refurbished iPhone 16 Pro Max in Desert and Natural Titanium"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center lg:object-right scale-105 transition-transform duration-1000 ease-out"
          />
          {/* Gradients ensuring 4.5:1 text legibility across all screens */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-transparent lg:w-3/5" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
          <div className="max-w-xl space-y-6">
            
            {/* Kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-zinc-300 uppercase">
              <span>THE ULTIMATE IPHONE.</span>
              <span className="text-zinc-500">·</span>
              <span className="text-cyan-400 font-semibold">CERTIFIED REFURBISHED</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white text-balance leading-none">
              iPhone 16 Pro Max
            </h1>

            {/* Price Line */}
            <div className="space-y-1">
              <p className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 tabular-nums">
                FROM {formatPrice(27000)}
              </p>
              <p className="text-xs text-zinc-400">
                Grade A+ Pristine · Save over R 5 999 compared to new retail
              </p>
            </div>

            {/* Redesigned buttons with smooth, rounded corners (no sharp edges) */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <button
                onClick={handleBuyNow}
                className="flex items-center gap-2.5 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all shadow-lg shadow-blue-900/30 hover:shadow-blue-600/40 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Configure &amp; Buy</span>
              </button>

              <button
                onClick={() => setCurrentPage('shop')}
                className="flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md rounded-xl border border-white/15 text-xs sm:text-sm font-semibold tracking-wide transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>Browse All Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Refurbishment trust proof badges */}
            <div className="pt-6 border-t border-zinc-800/80 grid grid-cols-3 gap-4 text-xs text-zinc-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>12M Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <BatteryCharging className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>100% Battery Cap</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span>70-Pt Certified</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

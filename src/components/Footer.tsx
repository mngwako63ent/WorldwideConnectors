import React from 'react';
import { useCart } from '../context/CartContext';
import { ProductCategory } from '../types';
import { Logo } from './Logo';
import { ChevronRight, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';

export const Footer: React.FC = () => {
  const {
    setCurrentPage,
    goToCategory,
    setIsContactOpen,
    setIsOrdersOpen,
    setIsQualityCheckOpen,
    setIsTradeInOpen
  } = useCart();

  const handleCategoryClick = (cat: string) => {
    if (cat === 'Brand New') {
      alert('world-connect specializes in Certified Refurbished Apple hardware for maximum value and circular sustainability.');
      return;
    }
    if (cat === 'Apple TV') {
      goToCategory('Accessories');
    } else {
      goToCategory(cat as ProductCategory);
    }
  };

  return (
    <footer className="bg-zinc-950 text-white pt-16 pb-8 border-t border-zinc-900 select-none">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-column footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-14">
          
          {/* Column 1: Brand & blank contact section as instructed */}
          <div className="space-y-6">
            <Logo variant="light" size="md" />

            <p className="text-xs text-zinc-400 leading-relaxed max-w-xs">
              Premium certified refurbished Apple technology. Tested through 70 diagnostic benchmarks with 12 months comprehensive warranty.
            </p>

            {/* Address, Phone, Email left blank for now as requested */}
            <div className="space-y-2 pt-1 text-xs text-zinc-500">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-zinc-400">Headquarters:</span>
                <span>—</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-zinc-400">Phone:</span>
                <span>—</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-zinc-400">E-mail:</span>
                <span>—</span>
              </div>
            </div>

            <button
              onClick={() => setIsContactOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 rounded-xl text-xs font-semibold border border-zinc-800 transition-colors cursor-pointer"
            >
              <span>Contact Showroom Desk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Column 2: Categories */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white tracking-wider uppercase">
              Apple Hardware
            </h3>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              {[
                'MacBooks',
                'iPhone',
                'iPad',
                'Apple Watch',
                'AirPods',
                'Accessories'
              ].map(cat => (
                <li key={cat}>
                  <button
                    onClick={() => handleCategoryClick(cat)}
                    className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
                    <span>{cat}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Explore Pages */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white tracking-wider uppercase">
              Pages &amp; Navigation
            </h3>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <button
                  onClick={() => setCurrentPage('home')}
                  className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer group"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
                  <span>Home</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('shop')}
                  className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer group"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
                  <span>Shop Catalog</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('about')}
                  className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer group"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
                  <span>Why Refurbished &amp; 70-Point Lab</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsTradeInOpen(true)}
                  className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer group"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
                  <span>Apple Device Trade-In</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Client Services & Warranty */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white tracking-wider uppercase">
              Client Support
            </h3>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <button
                  onClick={() => setIsOrdersOpen(true)}
                  className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer group"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
                  <span>Order Tracking &amp; Status</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsQualityCheckOpen(true)}
                  className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer group"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
                  <span>12-Month Warranty Policy</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsQualityCheckOpen(true)}
                  className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer group"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
                  <span>14-Day Free Returns</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer group"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
                  <span>Help &amp; Support Desk</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar with subtle divider */}
        <div className="border-t border-zinc-800/80 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          
          <div className="flex items-center gap-2 text-zinc-400 font-semibold">
            <span className="text-white font-extrabold lowercase">world-connect</span>
            <span>© {new Date().getFullYear()} All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6 font-medium">
            <button
              onClick={() => alert('world-connect: 12-Month Hardware Warranty and 14-Day Free Return Policy on all certified devices.')}
              className="hover:text-zinc-300 transition-colors cursor-pointer"
            >
              Terms &amp; Conditions
            </button>
            <button
              onClick={() => alert('world-connect: Client privacy is protected with 256-bit encryption. Zero payment data is stored.')}
              className="hover:text-zinc-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
};

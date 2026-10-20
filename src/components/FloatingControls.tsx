import React, { useState, useEffect } from 'react';
import { ChevronUp, ShieldCheck, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const FloatingControls: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { setIsQualityCheckOpen } = useCart();

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Floating Trust & Quality Badge at Bottom-Left (seen in all user screenshots) */}
      <button
        onClick={() => setIsQualityCheckOpen(true)}
        aria-label="Verified refurbished guarantee badge"
        className="fixed bottom-5 left-5 z-40 w-11 h-11 rounded-full bg-[#0052cc] hover:bg-[#0040a8] text-white shadow-lg flex items-center justify-center transition-transform hover:scale-110 active:scale-95 group cursor-pointer"
        title="70-Point Certified Refurbished Guarantee"
      >
        <div className="relative">
          <ShieldCheck className="w-5 h-5 text-white" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full ring-2 ring-[#0052cc]" />
        </div>
      </button>

      {/* Floating Scroll to Top Button at Bottom-Right (seen in all user screenshots) */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top of page"
          className="fixed bottom-5 right-5 z-40 w-11 h-11 rounded-full bg-white hover:bg-zinc-100 text-zinc-900 border border-zinc-300 shadow-lg flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer animate-in fade-in duration-200"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
};

import React, { useState } from 'react';
import { X, Truck } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const [isDismissed, setIsDismissed] = useState(false);

  return (
    <div className="w-full flex flex-col text-xs font-medium tracking-wide">
      {/* Black top announcement */}
      {!isDismissed && (
        <div className="bg-black text-white px-3 sm:px-4 py-2 flex items-center justify-center relative overflow-hidden">
          <div className="flex items-center justify-center flex-wrap gap-1.5 text-center text-[11px] sm:text-xs pr-7 sm:pr-0">
            <span>iPhone 16 &amp; 15 Pro Now Available! Free Shipping.</span>
            <button
              onClick={() => setIsDismissed(true)}
              className="text-zinc-400 hover:text-white underline cursor-pointer transition-colors whitespace-nowrap"
            >
              Dismiss
            </button>
          </div>
          <button
            onClick={() => setIsDismissed(true)}
            aria-label="Dismiss banner"
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Royal blue sub-announcement banner (as seen in reference screenshot) */}
      <div className="bg-[#0052cc] text-white py-1.5 px-3 sm:px-4 text-center flex items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs overflow-hidden">
        <Truck className="w-3.5 h-3.5 shrink-0" />
        <span className="truncate sm:overflow-visible">Enjoy free same day delivery in JHB. T&amp;Cs apply</span>
      </div>
    </div>
  );
};

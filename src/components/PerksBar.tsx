import React from 'react';
import { Truck, RotateCcw, Clock, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const PerksBar: React.FC = () => {
  const { setIsQualityCheckOpen } = useCart();

  const perks = [
    {
      icon: Truck,
      title: 'Free delivery for R1800+',
      detail: 'Express dispatch across South Africa'
    },
    {
      icon: RotateCcw,
      title: 'Free returns within 14 days',
      detail: 'No-questions-asked satisfaction promise'
    },
    {
      icon: Clock,
      title: 'We are available 24/7',
      detail: 'Live expert WhatsApp & email support'
    },
    {
      icon: ShieldCheck,
      title: '100% Secure payments',
      detail: 'Encrypted PayFast & Ozow Instant EFT'
    }
  ];

  return (
    <section className="bg-black text-white border-y border-zinc-800">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {perks.map((perk, idx) => {
            const Icon = perk.icon;
            return (
              <div
                key={idx}
                onClick={() => setIsQualityCheckOpen(true)}
                className="flex items-center gap-3 cursor-pointer group hover:opacity-90 transition-opacity"
              >
                <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 group-hover:border-zinc-700 transition-colors">
                  <Icon className="w-4 h-4 text-zinc-300 group-hover:text-white" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs sm:text-sm font-semibold tracking-tight text-white leading-snug">
                    {perk.title}
                  </span>
                  <span className="text-[11px] text-zinc-400 hidden xl:inline">
                    {perk.detail}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', variant = 'dark', size = 'md' }) => {
  const iconSizes = {
    sm: 'w-6 h-6 sm:w-7 sm:h-7',
    md: 'w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9',
    lg: 'w-9 h-9 sm:w-11 sm:h-11'
  };

  const textSizes = {
    sm: 'text-sm sm:text-base',
    md: 'text-base sm:text-lg lg:text-xl',
    lg: 'text-xl sm:text-2xl'
  };

  const isDark = variant === 'dark';

  return (
    <div className={`flex items-center gap-2 sm:gap-3 select-none min-w-0 ${className}`}>
      {/* Custom Original Emblem for world-connect: Interlocking connected orbital nodes & circular tech bridge */}
      <div className={`relative ${iconSizes[size]} shrink-0 flex items-center justify-center`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-xs"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="wcGrad1" x1="10%" y1="0%" x2="90%" y2="100%">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <linearGradient id="wcGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>

          {/* Outer continuous circular orbit bridge */}
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="url(#wcGrad1)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray="180 50"
          />

          {/* Interlocking internal connector rings symbolizing global connectivity & circular refurbished hardware */}
          <circle
            cx="39"
            cy="50"
            r="19"
            stroke={isDark ? '#0f172a' : '#ffffff'}
            strokeWidth="6"
            className="transition-colors"
          />
          <circle
            cx="61"
            cy="50"
            r="19"
            stroke="url(#wcGrad1)"
            strokeWidth="6"
          />

          {/* Precision bridge pulse core */}
          <circle cx="50" cy="50" r="4.5" fill="#06b6d4" />
        </svg>
      </div>

      {/* Brand Wordmark: world-connect */}
      <div className="flex flex-col min-w-0">
        <div className="flex items-center">
          <span
            className={`font-extrabold tracking-tight lowercase whitespace-nowrap ${textSizes[size]} ${
              isDark ? 'text-zinc-950' : 'text-white'
            }`}
          >
            world<span className="text-blue-600 font-black">-</span>connet
          </span>
        </div>
        <span
          className={`text-[8px] sm:text-[9px] tracking-widest font-semibold uppercase -mt-0.5 truncate hidden min-[360px]:block ${
            isDark ? 'text-zinc-400' : 'text-zinc-400'
          }`}
        >
          Refurbished Tech
        </span>
      </div>
    </div>
  );
};

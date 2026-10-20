import React, { useState, useRef, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { ProductCategory, Currency } from '../types';
import { Logo } from './Logo';
import { Search, ShoppingBag, User, Menu, X, ChevronDown, Check, Laptop, Smartphone, Tablet, Watch, Headphones, Cable, HelpCircle } from 'lucide-react';

const CATEGORY_SHORTCUTS: { label: string; category: ProductCategory; icon: React.FC<{ className?: string }> }[] = [
  { label: 'MacBooks', category: 'MacBooks', icon: Laptop },
  { label: 'iPhone', category: 'iPhone', icon: Smartphone },
  { label: 'iPad', category: 'iPad', icon: Tablet },
  { label: 'Apple Watch', category: 'Apple Watch', icon: Watch },
  { label: 'AirPods', category: 'AirPods', icon: Headphones },
  { label: 'Accessories', category: 'Accessories', icon: Cable }
];

export const Header: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    goToCategory,
    activeCategory,
    cartCount,
    subtotalZAR,
    currency,
    setCurrency,
    formatPrice,
    setIsCartOpen,
    isSearchOpen,
    setIsSearchOpen,
    setIsContactOpen,
    setIsOrdersOpen
  } = useCart();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileHardwareExpanded, setMobileHardwareExpanded] = useState(true);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);

  // References and timers for smooth hover & click transitions
  const hardwareDropdownRef = useRef<HTMLDivElement>(null);
  const currencyDropdownRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currencies: Currency[] = ['ZAR', 'USD', 'EUR', 'GBP'];

  // Handle smooth hover entering
  const handleHardwareMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setCategoriesDropdownOpen(true);
  };

  // Handle smooth hover leaving with grace period to prevent accidental closing
  const handleHardwareMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setCategoriesDropdownOpen(false);
    }, 200);
  };

  // Toggle on click (supports tablets and touchscreens)
  const handleHardwareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setCategoriesDropdownOpen(prev => !prev);
  };

  // Close dropdowns on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (hardwareDropdownRef.current && !hardwareDropdownRef.current.contains(target)) {
        setCategoriesDropdownOpen(false);
      }
      if (currencyDropdownRef.current && !currencyDropdownRef.current.contains(target)) {
        setCurrencyDropdownOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setCategoriesDropdownOpen(false);
        setCurrencyDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-200 shadow-xs w-full max-w-full overflow-hidden sm:overflow-visible">
      <div className="max-w-[1440px] mx-auto px-2.5 xs:px-4 sm:px-6 lg:px-8 min-h-[3.75rem] sm:h-20 flex flex-wrap sm:flex-nowrap items-center justify-between gap-1.5 xs:gap-2 sm:gap-4 lg:gap-8 w-full">
        
        {/* Zone 1: Brand Wordmark & Custom Logo */}
        <button
          onClick={() => {
            setCurrentPage('home');
            setMobileMenuOpen(false);
          }}
          className="flex items-center text-left cursor-pointer shrink min-w-0 transition-opacity hover:opacity-90 min-h-[44px]"
          aria-label="world-connet homepage"
        >
          <Logo variant="dark" size="md" />
        </button>

        {/* Zone 2: Desktop & Tablet Landscape Primary Navigation */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-8 text-sm font-semibold text-zinc-700">
          
          {/* Page 1: Home */}
          <button
            onClick={() => setCurrentPage('home')}
            className={`whitespace-nowrap shrink-0 transition-colors relative py-2 cursor-pointer ${
              currentPage === 'home' ? 'text-zinc-950 font-bold' : 'text-zinc-600 hover:text-zinc-950'
            }`}
          >
            Home
            {currentPage === 'home' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
            )}
          </button>

          {/* Page 2: Shop Catalog */}
          <button
            onClick={() => setCurrentPage('shop')}
            className={`whitespace-nowrap shrink-0 transition-colors relative py-2 cursor-pointer ${
              currentPage === 'shop' ? 'text-zinc-950 font-bold' : 'text-zinc-600 hover:text-zinc-950'
            }`}
          >
            Shop Catalog
            {currentPage === 'shop' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
            )}
          </button>

          {/* Hardware Dropdown Menu with uninterrupted hover bridge and click-toggle */}
          <div
            ref={hardwareDropdownRef}
            onMouseEnter={handleHardwareMouseEnter}
            onMouseLeave={handleHardwareMouseLeave}
            className="relative py-2"
          >
            <button
              type="button"
              onClick={handleHardwareClick}
              aria-haspopup="true"
              aria-expanded={categoriesDropdownOpen}
              className={`flex items-center gap-1.5 py-1 px-1 transition-colors cursor-pointer select-none rounded-lg group ${
                categoriesDropdownOpen || (currentPage === 'shop' && activeCategory !== 'All')
                  ? 'text-zinc-950 font-bold'
                  : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              <span>Hardware</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-700 transition-transform duration-200 ${
                  categoriesDropdownOpen ? 'rotate-180 text-blue-600' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu Container with seamless hover bridge */}
            {categoriesDropdownOpen && (
              <div
                className="absolute left-0 top-full pt-1.5 w-64 z-50 animate-in fade-in zoom-in-95 duration-150"
                role="menu"
                aria-orientation="vertical"
              >
                {/* Bridge area so cursor movement is continuous */}
                <div className="bg-white border border-zinc-200/90 rounded-2xl shadow-xl p-2 overflow-hidden ring-1 ring-black/5">
                  <div className="px-3 py-1.5 border-b border-zinc-100 flex items-center justify-between text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                    <span>Certified Devices</span>
                    <span className="text-blue-600 font-semibold">12M Warranty</span>
                  </div>

                  <div className="pt-1 space-y-0.5">
                    {CATEGORY_SHORTCUTS.map(cat => {
                      const Icon = cat.icon;
                      const isSelected = currentPage === 'shop' && activeCategory === cat.category;
                      return (
                        <button
                          key={cat.label}
                          role="menuitem"
                          onClick={() => {
                            goToCategory(cat.category);
                            setCategoriesDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-between group cursor-pointer ${
                            isSelected
                              ? 'bg-blue-50 text-blue-700 font-bold'
                              : 'text-zinc-700 hover:bg-zinc-100/80 hover:text-blue-600'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                              isSelected ? 'bg-blue-600 text-white' : 'bg-zinc-100 text-zinc-500 group-hover:bg-blue-100 group-hover:text-blue-600'
                            }`}>
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <span className="tracking-tight">{cat.label}</span>
                          </div>
                          
                          <span className={`text-[10px] uppercase font-semibold ${
                            isSelected ? 'text-blue-600 font-bold' : 'text-zinc-400 group-hover:text-blue-600'
                          }`}>
                            Refurbished
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-1 pt-1.5 border-t border-zinc-100 px-3 py-1 flex items-center justify-between text-[11px] text-zinc-500">
                    <button
                      onClick={() => {
                        goToCategory('All');
                        setCategoriesDropdownOpen(false);
                      }}
                      className="text-blue-600 hover:text-blue-800 font-bold hover:underline cursor-pointer"
                    >
                      View All Hardware →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Page 3: Why Refurbished */}
          <button
            onClick={() => setCurrentPage('about')}
            className={`whitespace-nowrap shrink-0 transition-colors relative py-2 cursor-pointer ${
              currentPage === 'about' ? 'text-zinc-950 font-bold' : 'text-zinc-600 hover:text-zinc-950'
            }`}
          >
            Why Refurbished
            {currentPage === 'about' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
            )}
          </button>

          {/* Contact action */}
          <button
            onClick={() => setIsContactOpen(true)}
            className="whitespace-nowrap shrink-0 text-zinc-600 hover:text-zinc-950 py-2 transition-colors cursor-pointer"
          >
            Contact Showroom
          </button>
        </nav>

        {/* Zone 3: Interactive controls with responsive scaling and touch targets */}
        <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2.5 lg:gap-3.5 shrink-0">
          
          {/* Currency Switcher (Desktop and Tablet) */}
          <div ref={currencyDropdownRef} className="relative hidden sm:block">
            <button
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 rounded-xl transition-all border border-zinc-200 cursor-pointer min-h-[40px]"
              aria-label="Toggle currency selector"
              aria-expanded={currencyDropdownOpen}
            >
              <span>{currency}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${currencyDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {currencyDropdownOpen && (
              <div className="absolute right-0 mt-2 w-28 bg-white border border-zinc-200 rounded-xl shadow-xl py-1.5 z-50 animate-in fade-in">
                {currencies.map(c => (
                  <button
                    key={c}
                    onClick={() => {
                      setCurrency(c);
                      setCurrencyDropdownOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3.5 py-2 text-xs text-left font-medium text-zinc-700 hover:bg-zinc-50 cursor-pointer"
                  >
                    <span>{c}</span>
                    {currency === c && <Check className="w-3.5 h-3.5 text-blue-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Button */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label="Search refurbished catalog"
            className="w-8.5 h-8.5 xs:w-9 xs:h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full border border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50 flex items-center justify-center text-zinc-700 hover:text-zinc-950 transition-all cursor-pointer shadow-2xs active:scale-95 shrink-0"
          >
            <Search className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
          </button>

          {/* Cart Pill Button (Responsive scaling from compact badge on mobile to full price pill on desktop) */}
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label={`View shopping bag (${cartCount} items, total ${formatPrice(subtotalZAR)})`}
            className="flex items-center justify-center gap-1.5 xs:gap-2 px-2.5 xs:px-3 sm:px-4 lg:px-5 py-1.5 xs:py-2 sm:py-2.5 bg-zinc-950 hover:bg-blue-600 text-white rounded-full text-xs sm:text-sm font-semibold transition-all shadow-sm hover:shadow-md active:scale-95 cursor-pointer group min-h-[34px] xs:min-h-[36px] sm:min-h-[40px] lg:min-h-[44px] shrink-0"
          >
            <span className="hidden xl:inline font-semibold">
              Cart / {formatPrice(subtotalZAR)}
            </span>
            <span className="hidden min-[520px]:inline xl:hidden font-semibold">
              {formatPrice(subtotalZAR)}
            </span>
            <div className="relative flex items-center justify-center">
              <ShoppingBag className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-zinc-200 group-hover:text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2.5 bg-blue-500 text-white rounded-full text-[9px] xs:text-[10px] min-w-4 h-4 px-1 flex items-center justify-center font-bold ring-2 ring-zinc-950">
                  {cartCount}
                </span>
              )}
            </div>
          </button>

          {/* User Account / Orders Button */}
          <button
            onClick={() => setIsOrdersOpen(true)}
            aria-label="My Account and Orders"
            className="w-8.5 h-8.5 xs:w-9 xs:h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full border border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50 flex items-center justify-center text-zinc-700 hover:text-zinc-950 transition-all cursor-pointer shadow-2xs active:scale-95 shrink-0"
          >
            <User className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
          </button>

          {/* Mobile & Tablet Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="lg:hidden w-8.5 h-8.5 xs:w-9 xs:h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-700 hover:bg-zinc-50 active:scale-95 cursor-pointer shrink-0"
          >
            {mobileMenuOpen ? <X className="w-4 h-4 xs:w-5 xs:h-5" /> : <Menu className="w-4 h-4 xs:w-5 xs:h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-200 bg-white px-3 sm:px-6 py-4 sm:py-6 shadow-2xl animate-in slide-in-from-top duration-200 max-h-[85vh] overflow-y-auto w-full max-w-full">
          <div className="flex flex-col gap-2">
            
            {/* Mobile Quick Action Tiles */}
            <div className="grid grid-cols-3 gap-2 pb-2 border-b border-zinc-100">
              <button
                onClick={() => {
                  setIsSearchOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="flex flex-col items-center justify-center p-2 rounded-xl bg-zinc-50 hover:bg-zinc-100 text-zinc-700 text-xs font-semibold gap-1 transition-colors cursor-pointer"
              >
                <Search className="w-4 h-4 text-zinc-600" />
                <span className="text-[11px]">Search</span>
              </button>

              <button
                onClick={() => {
                  setIsCartOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="flex flex-col items-center justify-center p-2 rounded-xl bg-blue-50/80 hover:bg-blue-100 text-blue-700 text-xs font-semibold gap-1 transition-colors cursor-pointer relative"
              >
                <div className="relative">
                  <ShoppingBag className="w-4 h-4 text-blue-600" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-blue-600 text-white rounded-full text-[9px] w-3.5 h-3.5 flex items-center justify-center font-bold">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="text-[11px] truncate max-w-full">Cart ({cartCount})</span>
              </button>

              <button
                onClick={() => {
                  setIsOrdersOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="flex flex-col items-center justify-center p-2 rounded-xl bg-zinc-50 hover:bg-zinc-100 text-zinc-700 text-xs font-semibold gap-1 transition-colors cursor-pointer"
              >
                <User className="w-4 h-4 text-zinc-600" />
                <span className="text-[11px]">Orders</span>
              </button>
            </div>

            {/* Primary Pages with touch-friendly 44px+ height */}
            <button
              onClick={() => {
                setCurrentPage('home');
                setMobileMenuOpen(false);
              }}
              className={`text-left py-3 px-4 rounded-xl text-sm font-semibold transition-colors min-h-[44px] flex items-center cursor-pointer ${
                currentPage === 'home' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-zinc-800 hover:bg-zinc-50'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => {
                setCurrentPage('shop');
                setMobileMenuOpen(false);
              }}
              className={`text-left py-3 px-4 rounded-xl text-sm font-semibold transition-colors min-h-[44px] flex items-center cursor-pointer ${
                currentPage === 'shop' && activeCategory === 'All' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-zinc-800 hover:bg-zinc-50'
              }`}
            >
              Shop Full Catalog
            </button>

            {/* Expandable Hardware Section on Mobile & Tablet */}
            <div className="rounded-xl border border-zinc-200/80 overflow-hidden bg-zinc-50/50">
              <button
                type="button"
                onClick={() => setMobileHardwareExpanded(!mobileHardwareExpanded)}
                className="w-full flex items-center justify-between py-3 px-4 text-sm font-semibold text-zinc-900 bg-zinc-100/60 min-h-[44px]"
              >
                <span>Hardware Categories</span>
                <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform ${mobileHardwareExpanded ? 'rotate-180' : ''}`} />
              </button>

              {mobileHardwareExpanded && (
                <div className="p-2 grid grid-cols-2 gap-1.5 bg-white">
                  {CATEGORY_SHORTCUTS.map(cat => {
                    const Icon = cat.icon;
                    const isSelected = currentPage === 'shop' && activeCategory === cat.category;
                    return (
                      <button
                        key={cat.label}
                        onClick={() => {
                          goToCategory(cat.category);
                          setMobileMenuOpen(false);
                        }}
                        className={`text-left text-xs py-2.5 px-3 rounded-xl font-medium transition-colors flex items-center gap-2 min-h-[44px] ${
                          isSelected ? 'bg-blue-50 text-blue-700 font-bold' : 'text-zinc-700 hover:bg-zinc-100'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                        <span className="truncate">{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <button
              onClick={() => {
                setCurrentPage('about');
                setMobileMenuOpen(false);
              }}
              className={`text-left py-3 px-4 rounded-xl text-sm font-semibold transition-colors min-h-[44px] flex items-center ${
                currentPage === 'about' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-zinc-800 hover:bg-zinc-50'
              }`}
            >
              Why Refurbished &amp; 70-Point Lab
            </button>

            <button
              onClick={() => {
                setIsContactOpen(true);
                setMobileMenuOpen(false);
              }}
              className="text-left py-3 px-4 rounded-xl text-sm font-semibold text-zinc-800 hover:bg-zinc-50 transition-colors min-h-[44px] flex items-center"
            >
              Contact Showroom
            </button>

            {/* Mobile Currency Picker */}
            <div className="pt-3 border-t border-zinc-200 flex items-center justify-between px-2 mt-2">
              <span className="text-xs text-zinc-500 font-medium">Currency:</span>
              <div className="flex gap-1.5">
                {currencies.map(c => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={`px-3 py-2 text-xs font-semibold rounded-xl transition-colors min-h-[40px] ${
                      currency === c
                        ? 'bg-zinc-900 text-white'
                        : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </header>
  );
};

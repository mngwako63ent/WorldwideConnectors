import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, ProductCategory, Currency, OrderDetails, ConditionGrade, Page } from '../types';

interface CartContextType {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  cart: CartItem[];
  cartCount: number;
  subtotalZAR: number;
  freeShippingThresholdZAR: number;
  amountNeededForFreeDelivery: number;
  isFreeDelivery: boolean;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (amountInZAR: number) => string;
  addToCart: (product: Product, options?: { color?: string; storage?: string; grade?: ConditionGrade; quantity?: number }) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  
  // Selected product modal
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;

  // Active category navigation
  activeCategory: ProductCategory;
  setActiveCategory: (cat: ProductCategory) => void;

  // Search & Filters
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  priceSort: 'default' | 'asc' | 'desc';
  setPriceSort: (sort: 'default' | 'asc' | 'desc') => void;
  gradeFilter: 'All' | 'Pristine (Grade A+)' | 'Excellent (Grade A)' | 'Good (Grade B)';
  setGradeFilter: (grade: 'All' | 'Pristine (Grade A+)' | 'Excellent (Grade A)' | 'Good (Grade B)') => void;

  // Orders
  orders: OrderDetails[];
  createOrder: (orderData: Omit<OrderDetails, 'orderId' | 'createdAt' | 'status'>) => OrderDetails;
  isOrdersOpen: boolean;
  setIsOrdersOpen: (open: boolean) => void;

  // Contact modal
  isContactOpen: boolean;
  setIsContactOpen: (open: boolean) => void;

  // Trade In modal
  isTradeInOpen: boolean;
  setIsTradeInOpen: (open: boolean) => void;

  // Quality check modal
  isQualityCheckOpen: boolean;
  setIsQualityCheckOpen: (open: boolean) => void;

  // Helper to navigate to shop with specific category
  goToCategory: (cat: ProductCategory) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CURRENCY_RATES: Record<Currency, { symbol: string; rate: number }> = {
  ZAR: { symbol: 'R', rate: 1 },
  USD: { symbol: '$', rate: 0.055 },
  EUR: { symbol: '€', rate: 0.051 },
  GBP: { symbol: '£', rate: 0.043 }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPageState] = useState<Page>(() => {
    try {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'shop' || hash === 'about' || hash === 'home') {
        return hash as Page;
      }
    } catch {}
    return 'home';
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('wc_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<OrderDetails[]>(() => {
    try {
      const saved = localStorage.getItem('wc_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [currency, setCurrency] = useState<Currency>('ZAR');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [priceSort, setPriceSort] = useState<'default' | 'asc' | 'desc'>('default');
  const [gradeFilter, setGradeFilter] = useState<'All' | 'Pristine (Grade A+)' | 'Excellent (Grade A)' | 'Good (Grade B)'>('All');
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isTradeInOpen, setIsTradeInOpen] = useState(false);
  const [isQualityCheckOpen, setIsQualityCheckOpen] = useState(false);

  const setCurrentPage = (page: Page) => {
    setCurrentPageState(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToCategory = (cat: ProductCategory) => {
    setActiveCategory(cat);
    setCurrentPage('shop');
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'shop' || hash === 'about' || hash === 'home') {
        setCurrentPageState(hash as Page);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    localStorage.setItem('wc_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wc_orders', JSON.stringify(orders));
  }, [orders]);

  const freeShippingThresholdZAR = 1800;

  const subtotalZAR = cart.reduce((acc, item) => acc + item.priceZAR * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const isFreeDelivery = subtotalZAR >= freeShippingThresholdZAR;
  const amountNeededForFreeDelivery = Math.max(0, freeShippingThresholdZAR - subtotalZAR);

  const formatPrice = (amountInZAR: number): string => {
    const config = CURRENCY_RATES[currency];
    const converted = amountInZAR * config.rate;
    if (currency === 'ZAR') {
      return `R ${converted.toLocaleString('en-ZA', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}`;
    }
    return `${config.symbol}${converted.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  const addToCart = (
    product: Product,
    options?: { color?: string; storage?: string; grade?: ConditionGrade; quantity?: number }
  ) => {
    const selectedColor = options?.color || product.colors[0]?.name || 'Standard';
    const selectedStorage = options?.storage || product.storageOptions[0]?.size || 'Standard';
    const conditionGrade: ConditionGrade = options?.grade || 'Pristine (Grade A+)';
    const quantity = options?.quantity || 1;

    const storageOption = product.storageOptions.find(o => o.size === selectedStorage);
    const multiplier = storageOption ? storageOption.priceMultiplier : 1.0;
    
    const gradeModifier = 
      conditionGrade === 'Pristine (Grade A+)' ? 1.0 :
      conditionGrade === 'Excellent (Grade A)' ? 0.92 : 0.85;

    const unitPrice = Math.round(product.basePriceZAR * multiplier * gradeModifier);
    const cartItemId = `${product.id}-${selectedStorage}-${selectedColor}-${conditionGrade}`;

    setCart(prev => {
      const existing = prev.find(item => item.id === cartItemId);
      if (existing) {
        return prev.map(item =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          title: product.title,
          category: product.category,
          image: product.image,
          selectedColor,
          selectedStorage,
          conditionGrade,
          priceZAR: unitPrice,
          quantity
        }
      ];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const createOrder = (
    orderData: Omit<OrderDetails, 'orderId' | 'createdAt' | 'status'>
  ): OrderDetails => {
    const newOrder: OrderDetails = {
      ...orderData,
      orderId: `WC-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
      status: 'Confirmed'
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  return (
    <CartContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        goToCategory,
        cart,
        cartCount,
        subtotalZAR,
        freeShippingThresholdZAR,
        amountNeededForFreeDelivery,
        isFreeDelivery,
        currency,
        setCurrency,
        formatPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        selectedProduct,
        setSelectedProduct,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        priceSort,
        setPriceSort,
        gradeFilter,
        setGradeFilter,
        orders,
        createOrder,
        isOrdersOpen,
        setIsOrdersOpen,
        isContactOpen,
        setIsContactOpen,
        isTradeInOpen,
        setIsTradeInOpen,
        isQualityCheckOpen,
        setIsQualityCheckOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

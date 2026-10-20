export type Page = 'home' | 'shop' | 'about';

export type ProductCategory = 
  | 'All'
  | 'MacBooks'
  | 'iPad'
  | 'iPhone'
  | 'Apple Watch'
  | 'AirPods'
  | 'Accessories';

export type ConditionGrade = 'Pristine (Grade A+)' | 'Excellent (Grade A)' | 'Good (Grade B)';

export interface ProductVariant {
  storage: string;
  priceZAR: number;
  originalPriceZAR?: number;
}

export interface Product {
  id: string;
  title: string;
  category: ProductCategory;
  categoryTag: string; // e.g. "MAC", "AIRPODS", "IPAD", "BEST SELLERS", "IPHONE", "WATCH"
  basePriceZAR: number;
  originalPriceZAR?: number;
  image: string;
  gallery?: string[];
  description: string;
  batteryHealth: string;
  warrantyMonths: number;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  colors: { name: string; hex: string }[];
  storageOptions: { size: string; priceMultiplier: number }[];
  specs: {
    processor?: string;
    screen?: string;
    ram?: string;
    camera?: string;
    releaseYear?: number;
    connectivity?: string;
  };
}

export interface CartItem {
  id: string;
  productId: string;
  title: string;
  category: ProductCategory;
  image: string;
  selectedColor: string;
  selectedStorage: string;
  conditionGrade: ConditionGrade;
  priceZAR: number;
  quantity: number;
}

export type Currency = 'ZAR' | 'USD' | 'EUR' | 'GBP';

export interface CurrencyConfig {
  code: Currency;
  symbol: string;
  rateAgainstZAR: number;
}

export interface OrderDetails {
  orderId: string;
  createdAt: string;
  items: CartItem[];
  subtotalZAR: number;
  shippingZAR: number;
  totalZAR: number;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    province: string;
    shippingMethod: 'jhb_same_day' | 'nationwide_courier' | 'store_pickup';
    paymentMethod: 'card' | 'eft' | 'cod';
  };
  status: 'Confirmed' | 'Processing' | 'Out for Delivery' | 'Delivered';
}

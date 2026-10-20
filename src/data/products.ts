import { Product } from '../types';

export const CATEGORY_BANNERS = {
  iPhone: {
    title: 'THE ULTIMATE IPHONE',
    subtitle: 'iPhone 16 Pro Max',
    startingPrice: 'FROM R 27 000',
    image: '/src/assets/images/hero_iphone_titanium_1792422845811.jpg',
    tag: 'CERTIFIED PRE-OWNED',
    description: 'Forged in aerospace-grade titanium with the powerful A18 Pro chip, 48MP Fusion camera, and industry-leading battery health.'
  },
  MacBooks: {
    title: 'CATEGORY',
    subtitle: 'MacBooks',
    startingPrice: 'FROM R 23 999',
    image: '/src/assets/images/banner_macbook_dark_1792422847189.jpg',
    tag: 'POWERHOUSE PERFORMANCE',
    description: 'Apple Silicon M1, M2 & M3 Pro machines tested through 70 hardware diagnostics. Ready for pro workflows.'
  },
  iPad: {
    title: 'CATEGORY',
    subtitle: 'iPad',
    startingPrice: 'FROM R 5 200',
    image: '/src/assets/images/banner_ipad_pro_1792422847119.jpg',
    tag: 'PORTABLE CREATIVITY',
    description: 'Ultra-crisp Liquid Retina displays, Apple Pencil compatibility, and all-day battery life.'
  },
  AirPods: {
    title: 'CATEGORY',
    subtitle: 'AirPods',
    startingPrice: 'FROM R 1 400',
    image: '/src/assets/images/banner_airpods_moody_1792422848438.jpg',
    tag: 'IMMERSIVE AUDIO',
    description: 'Sanitized, acoustically calibrated Apple AirPods with active noise cancellation and spatial audio.'
  },
  'Apple Watch': {
    title: 'CATEGORY',
    subtitle: 'Apple Watch',
    startingPrice: 'FROM R 4 299',
    image: '/src/assets/images/banner_apple_watch_1792422847769.jpg',
    tag: 'HEALTH & PRECISION',
    description: 'Precision heart-rate tracking, ECG, cellular options, and pristine sapphire crystal displays.'
  },
  Accessories: {
    title: 'CATEGORY',
    subtitle: 'Accessories',
    startingPrice: 'FROM R 899',
    image: '/src/assets/images/product_homepod_clean_1792422874580.jpg',
    tag: 'AUTHENTIC APPLE GEAR',
    description: 'Original Apple 20W USB-C power adapters, MagSafe wallets, HomePod mini, and Magic Keyboards.'
  }
};

export const PRODUCTS: Product[] = [
  // --- MacBooks (from iphone8.PNG and iphone4.PNG) ---
  {
    id: 'mac-pro-16-m2',
    title: 'MacBook Pro 16 inch Apple M2',
    category: 'MacBooks',
    categoryTag: 'MAC',
    basePriceZAR: 59999,
    originalPriceZAR: 69999,
    image: '/src/assets/images/product_macbook_clean_1792422872738.jpg',
    description: 'MacBook Pro 16" with M2 Pro / Max chip, 16.2" Liquid Retina XDR display (120Hz ProMotion), 1080p FaceTime HD camera, and six-speaker sound system with force-cancelling woofers.',
    batteryHealth: '98% capacity (under 45 cycles)',
    warrantyMonths: 12,
    isBestSeller: true,
    colors: [
      { name: 'Space Gray', hex: '#4b4846' },
      { name: 'Silver', hex: '#e2e4e5' }
    ],
    storageOptions: [
      { size: '512GB SSD / 16GB RAM', priceMultiplier: 1.0 },
      { size: '1TB SSD / 32GB RAM', priceMultiplier: 1.15 },
      { size: '2TB SSD / 64GB RAM', priceMultiplier: 1.35 }
    ],
    specs: {
      processor: 'Apple M2 Pro (12-core CPU, 19-core GPU)',
      screen: '16.2" Liquid Retina XDR (3456x2234, 1000 nits sustained)',
      ram: '16GB Unified Memory',
      releaseYear: 2023,
      connectivity: 'Wi-Fi 6E, 3x Thunderbolt 4, HDMI, SDXC, MagSafe 3'
    }
  },
  {
    id: 'mac-pro-2023-14',
    title: 'MacBook Pro 2023 (14-inch)',
    category: 'MacBooks',
    categoryTag: 'MAC',
    basePriceZAR: 48399,
    originalPriceZAR: 54999,
    image: '/src/assets/images/product_macbook_clean_1792422872738.jpg',
    description: 'Compact pro workstation with Apple M3 Pro chip, brilliant 14-inch XDR display, up to 18 hours battery life, and complete port selection.',
    batteryHealth: '96% capacity',
    warrantyMonths: 12,
    colors: [
      { name: 'Space Black', hex: '#2e2c2f' },
      { name: 'Silver', hex: '#e2e4e5' }
    ],
    storageOptions: [
      { size: '512GB SSD / 18GB RAM', priceMultiplier: 1.0 },
      { size: '1TB SSD / 36GB RAM', priceMultiplier: 1.18 }
    ],
    specs: {
      processor: 'Apple M3 Pro (11-core CPU, 14-core GPU)',
      screen: '14.2" Liquid Retina XDR',
      ram: '18GB Unified Memory',
      releaseYear: 2023,
      connectivity: 'Thunderbolt 4, HDMI, SDXC card slot, MagSafe 3'
    }
  },
  {
    id: 'mac-pro-14-m1-pro',
    title: 'MacBook Pro 14 inch M1 Pro',
    category: 'MacBooks',
    categoryTag: 'MAC',
    basePriceZAR: 44999,
    originalPriceZAR: 51999,
    image: '/src/assets/images/product_macbook_clean_1792422872738.jpg',
    description: 'The breakthrough Apple Silicon pro laptop. Groundbreaking M1 Pro chip performance with whisper-quiet thermal efficiency and iconic keyboard.',
    batteryHealth: '94% capacity',
    warrantyMonths: 12,
    colors: [
      { name: 'Space Gray', hex: '#4b4846' },
      { name: 'Silver', hex: '#e2e4e5' }
    ],
    storageOptions: [
      { size: '512GB SSD / 16GB RAM', priceMultiplier: 1.0 },
      { size: '1TB SSD / 32GB RAM', priceMultiplier: 1.14 }
    ],
    specs: {
      processor: 'Apple M1 Pro (8-core CPU, 14-core GPU)',
      screen: '14.2" Liquid Retina XDR',
      ram: '16GB Unified Memory',
      releaseYear: 2021,
      connectivity: 'Wi-Fi 6, 3x Thunderbolt 4, HDMI, MagSafe 3'
    }
  },
  {
    id: 'mac-air-2022-m2',
    title: 'MacBook Air 2022 (M2)',
    category: 'MacBooks',
    categoryTag: 'MAC',
    basePriceZAR: 23999,
    originalPriceZAR: 28999,
    image: '/src/assets/images/product_macbook_clean_1792422872738.jpg',
    description: 'Remarkably thin redesigned MacBook Air with fanless silent design, M2 chip, 13.6-inch Liquid Retina screen, and MagSafe charging.',
    batteryHealth: '97% capacity',
    warrantyMonths: 12,
    isBestSeller: true,
    colors: [
      { name: 'Midnight', hex: '#1e2430' },
      { name: 'Starlight', hex: '#f0e8d9' },
      { name: 'Space Gray', hex: '#4b4846' },
      { name: 'Silver', hex: '#e2e4e5' }
    ],
    storageOptions: [
      { size: '256GB SSD / 8GB RAM', priceMultiplier: 1.0 },
      { size: '512GB SSD / 16GB RAM', priceMultiplier: 1.25 }
    ],
    specs: {
      processor: 'Apple M2 (8-core CPU, 8-core GPU)',
      screen: '13.6" Liquid Retina (500 nits)',
      ram: '8GB / 16GB Unified Memory',
      releaseYear: 2022,
      connectivity: '2x Thunderbolt / USB 4, MagSafe 3, 3.5mm headphone'
    }
  },

  // --- iPads (from iphone5.PNG) ---
  {
    id: 'ipad-pro-12-9',
    title: 'iPad Pro 12.9"',
    category: 'iPad',
    categoryTag: 'BEST SELLERS',
    basePriceZAR: 10500,
    originalPriceZAR: 14999,
    image: '/src/assets/images/product_ipad_clean_1792422873348.jpg',
    description: 'Flagship iPad Pro with mini-LED Liquid Retina XDR display, M2 performance, Apple Pencil hover, and Face ID.',
    batteryHealth: '95% capacity',
    warrantyMonths: 12,
    isBestSeller: true,
    colors: [
      { name: 'Space Gray', hex: '#4b4846' },
      { name: 'Silver', hex: '#e2e4e5' }
    ],
    storageOptions: [
      { size: '128GB Wi-Fi', priceMultiplier: 1.0 },
      { size: '256GB Wi-Fi', priceMultiplier: 1.095 },
      { size: '512GB Wi-Fi + Cellular', priceMultiplier: 1.24 }
    ],
    specs: {
      processor: 'Apple M2 Chip',
      screen: '12.9" Liquid Retina XDR mini-LED',
      camera: '12MP Wide + 10MP Ultra Wide + LiDAR',
      releaseYear: 2022,
      connectivity: 'Thunderbolt / USB 4, Wi-Fi 6E'
    }
  },
  {
    id: 'ipad-pro-11',
    title: 'iPad Pro 11"',
    category: 'iPad',
    categoryTag: 'BEST SELLERS',
    basePriceZAR: 9500,
    originalPriceZAR: 13500,
    image: '/src/assets/images/product_ipad_clean_1792422873348.jpg',
    description: 'Pro performance in an ultra-portable 11-inch form factor. Liquid Retina with ProMotion, True Tone, and P3 wide color.',
    batteryHealth: '96% capacity',
    warrantyMonths: 12,
    colors: [
      { name: 'Space Gray', hex: '#4b4846' },
      { name: 'Silver', hex: '#e2e4e5' }
    ],
    storageOptions: [
      { size: '128GB Wi-Fi', priceMultiplier: 1.0 },
      { size: '256GB Wi-Fi', priceMultiplier: 1.105 }
    ],
    specs: {
      processor: 'Apple M2 Chip',
      screen: '11" Liquid Retina (120Hz ProMotion)',
      camera: '12MP Wide + 10MP Ultra Wide',
      releaseYear: 2022,
      connectivity: 'Thunderbolt / USB 4'
    }
  },
  {
    id: 'ipad-air-4',
    title: 'iPad Air 4',
    category: 'iPad',
    categoryTag: 'IPAD',
    basePriceZAR: 8700,
    originalPriceZAR: 11999,
    image: '/src/assets/images/product_ipad_clean_1792422873348.jpg',
    description: 'All-screen design with 10.9-inch Liquid Retina display, A14 Bionic chip, Touch ID integrated into top button, and USB-C.',
    batteryHealth: '93% capacity',
    warrantyMonths: 12,
    colors: [
      { name: 'Space Gray', hex: '#4b4846' },
      { name: 'Sky Blue', hex: '#779bc1' },
      { name: 'Rose Gold', hex: '#d9a69f' }
    ],
    storageOptions: [
      { size: '64GB Wi-Fi', priceMultiplier: 1.0 },
      { size: '256GB Wi-Fi', priceMultiplier: 1.115 }
    ],
    specs: {
      processor: 'Apple A14 Bionic',
      screen: '10.9" Liquid Retina',
      camera: '12MP Back camera, 7MP FaceTime HD',
      releaseYear: 2020,
      connectivity: 'USB-C, Wi-Fi 6'
    }
  },
  {
    id: 'ipad-9th-gen',
    title: 'iPad 9 (10.2-inch)',
    category: 'iPad',
    categoryTag: 'IPAD',
    basePriceZAR: 5200,
    originalPriceZAR: 7499,
    image: '/src/assets/images/product_ipad_clean_1792422873348.jpg',
    description: 'The most popular budget iPad. Fast A13 Bionic chip, Center Stage camera for video calls, and full Apple Pencil 1st Gen support.',
    batteryHealth: '95% capacity',
    warrantyMonths: 12,
    isBestSeller: true,
    colors: [
      { name: 'Space Gray', hex: '#4b4846' },
      { name: 'Silver', hex: '#e2e4e5' }
    ],
    storageOptions: [
      { size: '64GB Wi-Fi', priceMultiplier: 1.0 },
      { size: '256GB Wi-Fi', priceMultiplier: 1.25 }
    ],
    specs: {
      processor: 'Apple A13 Bionic',
      screen: '10.2" Retina Display with True Tone',
      camera: '12MP Ultra Wide with Center Stage',
      releaseYear: 2021,
      connectivity: 'Lightning, 3.5mm jack, Wi-Fi'
    }
  },
  {
    id: 'ipad-mini-6',
    title: 'iPad Mini 6',
    category: 'iPad',
    categoryTag: 'BEST SELLERS',
    basePriceZAR: 6700,
    originalPriceZAR: 9999,
    image: '/src/assets/images/product_ipad_clean_1792422873348.jpg',
    description: 'Mega power in mini size. 8.3-inch all-screen design with A15 Bionic chip, USB-C, 5G capabilities, and Apple Pencil 2 magnetic wireless charging.',
    batteryHealth: '94% capacity',
    warrantyMonths: 12,
    colors: [
      { name: 'Purple', hex: '#aba1b7' },
      { name: 'Starlight', hex: '#f0e8d9' },
      { name: 'Space Gray', hex: '#4b4846' }
    ],
    storageOptions: [
      { size: '64GB Wi-Fi', priceMultiplier: 1.0 },
      { size: '256GB Wi-Fi', priceMultiplier: 1.075 }
    ],
    specs: {
      processor: 'Apple A15 Bionic',
      screen: '8.3" Liquid Retina',
      camera: '12MP Wide back, 12MP Ultra Wide front',
      releaseYear: 2021,
      connectivity: 'USB-C, Wi-Fi 6'
    }
  },

  // --- AirPods (from iphone2.PNG) ---
  {
    id: 'airpods-pro-2nd-gen',
    title: 'Apple AirPods Pro (2nd Gen)',
    category: 'AirPods',
    categoryTag: 'AIRPODS',
    basePriceZAR: 2500,
    originalPriceZAR: 4499,
    image: '/src/assets/images/product_airpods_clean_1792422874101.jpg',
    description: 'Industry-leading Active Noise Cancellation with Adaptive Audio, Transparency mode, Personalized Spatial Audio, and USB-C MagSafe Case with built-in speaker for Find My.',
    batteryHealth: '100% genuine cells tested',
    warrantyMonths: 12,
    isBestSeller: true,
    colors: [{ name: 'White', hex: '#ffffff' }],
    storageOptions: [{ size: 'USB-C MagSafe Case', priceMultiplier: 1.0 }],
    specs: {
      processor: 'Apple H2 headphone chip, U1 chip in case',
      connectivity: 'Bluetooth 5.3',
      releaseYear: 2023
    }
  },
  {
    id: 'airpods-4th-gen',
    title: 'Apple AirPods 4th Gen',
    category: 'AirPods',
    categoryTag: 'AIRPODS',
    basePriceZAR: 2000,
    originalPriceZAR: 3299,
    image: '/src/assets/images/product_airpods_clean_1792422874101.jpg',
    description: 'Redesigned acoustic architecture with H2 chip, Voice Isolation, and optional Active Noise Cancellation in an open-ear design.',
    batteryHealth: '100% capacity',
    warrantyMonths: 12,
    colors: [{ name: 'White', hex: '#ffffff' }],
    storageOptions: [
      { size: 'Standard Case', priceMultiplier: 1.0 },
      { size: 'ANC Edition with Wireless Case', priceMultiplier: 1.25 }
    ],
    specs: {
      processor: 'Apple H2 chip',
      connectivity: 'Bluetooth 5.3',
      releaseYear: 2024
    }
  },
  {
    id: 'airpods-max',
    title: 'Apple AirPods Max',
    category: 'AirPods',
    categoryTag: 'AIRPODS',
    basePriceZAR: 5000,
    originalPriceZAR: 10999,
    image: '/src/assets/images/product_airpods_clean_1792422874101.jpg',
    description: 'High-fidelity over-ear headphones with custom acoustic driver, Apple H1 chip in each cup, computational audio, and stainless steel headband with breathable knit mesh.',
    batteryHealth: '97% capacity (20 hours playback)',
    warrantyMonths: 12,
    isBestSeller: true,
    colors: [
      { name: 'Space Gray', hex: '#4b4846' },
      { name: 'Silver', hex: '#e2e4e5' },
      { name: 'Sky Blue', hex: '#779bc1' }
    ],
    storageOptions: [{ size: 'Standard Smart Case', priceMultiplier: 1.0 }],
    specs: {
      processor: 'Dual Apple H1 headphone chips',
      connectivity: 'Bluetooth 5.0, Digital Crown control',
      releaseYear: 2020
    }
  },
  {
    id: 'airpods-pro-1st-gen',
    title: 'Apple AirPods Pro',
    category: 'AirPods',
    categoryTag: 'AIRPODS',
    basePriceZAR: 1800,
    originalPriceZAR: 3699,
    image: '/src/assets/images/product_airpods_clean_1792422874101.jpg',
    description: 'Original Apple AirPods Pro with Active Noise Cancellation, silicone ear tips in 3 sizes, and wireless charging case.',
    batteryHealth: '95% capacity',
    warrantyMonths: 12,
    colors: [{ name: 'White', hex: '#ffffff' }],
    storageOptions: [{ size: 'Wireless Charging Case', priceMultiplier: 1.0 }],
    specs: {
      processor: 'Apple H1 chip',
      connectivity: 'Bluetooth 5.0',
      releaseYear: 2019
    }
  },
  {
    id: 'airpods-3rd-gen',
    title: 'Apple AirPods 3',
    category: 'AirPods',
    categoryTag: 'AIRPODS',
    basePriceZAR: 1600,
    originalPriceZAR: 3299,
    image: '/src/assets/images/product_airpods_clean_1792422874101.jpg',
    description: 'Contoured fit with force sensor controls, Adaptive EQ, Spatial Audio with dynamic head tracking, and sweat & water resistance.',
    batteryHealth: '96% capacity',
    warrantyMonths: 12,
    colors: [{ name: 'White', hex: '#ffffff' }],
    storageOptions: [{ size: 'MagSafe Case', priceMultiplier: 1.0 }],
    specs: {
      processor: 'Apple H1 chip',
      connectivity: 'Bluetooth 5.0',
      releaseYear: 2021
    }
  },
  {
    id: 'airpods-2nd-gen',
    title: 'Apple AirPods 2',
    category: 'AirPods',
    categoryTag: 'AIRPODS',
    basePriceZAR: 1400,
    originalPriceZAR: 2499,
    image: '/src/assets/images/product_airpods_clean_1792422874101.jpg',
    description: 'Iconic classic AirPods with universal comfortable fit, optical sensors, speech-detecting accelerometer, and instant pairing with Apple devices.',
    batteryHealth: '98% capacity',
    warrantyMonths: 12,
    colors: [{ name: 'White', hex: '#ffffff' }],
    storageOptions: [{ size: 'Lightning Charging Case', priceMultiplier: 1.0 }],
    specs: {
      processor: 'Apple H1 chip',
      connectivity: 'Bluetooth 5.0',
      releaseYear: 2019
    }
  },

  // --- iPhones (from iphone7.PNG & reference) ---
  {
    id: 'iphone-16-pro-max',
    title: 'iPhone 16 Pro Max',
    category: 'iPhone',
    categoryTag: 'THE ULTIMATE IPHONE',
    basePriceZAR: 27000,
    originalPriceZAR: 32999,
    image: '/src/assets/images/product_iphone_clean_1792422871785.jpg',
    description: 'Grade A+ pristine refurbished iPhone 16 Pro Max with aerospace titanium design, A18 Pro chip, 48MP Fusion camera with 5x Telephoto zoom, and Camera Control button.',
    batteryHealth: '100% capacity',
    warrantyMonths: 12,
    isBestSeller: true,
    isNewArrival: true,
    colors: [
      { name: 'Desert Titanium', hex: '#bfa791' },
      { name: 'Natural Titanium', hex: '#8a857e' },
      { name: 'Black Titanium', hex: '#313233' },
      { name: 'White Titanium', hex: '#e8e8e6' }
    ],
    storageOptions: [
      { size: '256GB', priceMultiplier: 1.0 },
      { size: '512GB', priceMultiplier: 1.15 },
      { size: '1TB', priceMultiplier: 1.30 }
    ],
    specs: {
      processor: 'Apple A18 Pro (6-core CPU, 6-core GPU, 16-core NPU)',
      screen: '6.9" Super Retina XDR OLED (120Hz ProMotion)',
      camera: '48MP Main + 48MP Ultra Wide + 12MP 5x Telephoto',
      releaseYear: 2024,
      connectivity: 'USB-C (10Gbps), 5G Sub-6/mmWave, Wi-Fi 7'
    }
  },
  {
    id: 'iphone-15-pro',
    title: 'iPhone 15 Pro',
    category: 'iPhone',
    categoryTag: 'IPHONE',
    basePriceZAR: 18999,
    originalPriceZAR: 23999,
    image: '/src/assets/images/product_iphone_clean_1792422871785.jpg',
    description: 'Refurbished iPhone 15 Pro with featherlight brushed titanium frame, customizable Action button, USB-C 3.0 connector, and A17 Pro console gaming chip.',
    batteryHealth: '97% capacity',
    warrantyMonths: 12,
    isBestSeller: true,
    colors: [
      { name: 'Natural Titanium', hex: '#8a857e' },
      { name: 'Blue Titanium', hex: '#3d4454' },
      { name: 'Black Titanium', hex: '#313233' }
    ],
    storageOptions: [
      { size: '128GB', priceMultiplier: 1.0 },
      { size: '256GB', priceMultiplier: 1.12 },
      { size: '512GB', priceMultiplier: 1.25 }
    ],
    specs: {
      processor: 'Apple A17 Pro',
      screen: '6.1" Super Retina XDR with Dynamic Island',
      camera: '48MP Main + 12MP Ultra Wide + 12MP 3x Telephoto',
      releaseYear: 2023,
      connectivity: 'USB-C, 5G, Wi-Fi 6E'
    }
  },
  {
    id: 'iphone-14-pro',
    title: 'iPhone 14 Pro',
    category: 'iPhone',
    categoryTag: 'IPHONE',
    basePriceZAR: 15499,
    originalPriceZAR: 19999,
    image: '/src/assets/images/product_iphone_clean_1792422871785.jpg',
    description: 'First generation with Dynamic Island and Always-On Display. Stainless steel construction with Ceramic Shield front glass and 48MP sensor.',
    batteryHealth: '94% capacity',
    warrantyMonths: 12,
    colors: [
      { name: 'Deep Purple', hex: '#584a5e' },
      { name: 'Space Black', hex: '#2e2c2f' },
      { name: 'Gold', hex: '#fae7cf' }
    ],
    storageOptions: [
      { size: '128GB', priceMultiplier: 1.0 },
      { size: '256GB', priceMultiplier: 1.12 }
    ],
    specs: {
      processor: 'Apple A16 Bionic',
      screen: '6.1" Super Retina XDR OLED',
      camera: '48MP Main + 12MP Ultra Wide + 12MP 3x Telephoto',
      releaseYear: 2022,
      connectivity: 'Lightning, 5G, Wi-Fi 6'
    }
  },
  {
    id: 'iphone-13',
    title: 'iPhone 13 (128GB)',
    category: 'iPhone',
    categoryTag: 'IPHONE',
    basePriceZAR: 10999,
    originalPriceZAR: 15499,
    image: '/src/assets/images/product_iphone_clean_1792422871785.jpg',
    description: 'The proven everyday powerhouse. Cinematic mode video recording, vibrant Super Retina XDR OLED display, and rock-solid battery endurance.',
    batteryHealth: '93% capacity',
    warrantyMonths: 12,
    colors: [
      { name: 'Midnight', hex: '#1e2430' },
      { name: 'Starlight', hex: '#f0e8d9' },
      { name: 'Blue', hex: '#275276' }
    ],
    storageOptions: [
      { size: '128GB', priceMultiplier: 1.0 },
      { size: '256GB', priceMultiplier: 1.15 }
    ],
    specs: {
      processor: 'Apple A15 Bionic',
      screen: '6.1" Super Retina XDR OLED',
      camera: 'Dual 12MP camera system with sensor-shift OIS',
      releaseYear: 2021,
      connectivity: 'Lightning, 5G'
    }
  },

  // --- Apple Watch (from iphone10.PNG) ---
  {
    id: 'apple-watch-ultra-2',
    title: 'Apple Watch Ultra 2 (49mm)',
    category: 'Apple Watch',
    categoryTag: 'WATCH',
    basePriceZAR: 14999,
    originalPriceZAR: 18999,
    image: '/src/assets/images/product_watch_clean_1792422873890.jpg',
    description: 'The ultimate rugged adventure and sports smartwatch. 49mm titanium case, 3000-nit flat sapphire display, dual-frequency GPS, and up to 72 hours battery life.',
    batteryHealth: '98% capacity',
    warrantyMonths: 12,
    isBestSeller: true,
    colors: [
      { name: 'Natural Titanium', hex: '#8a857e' },
      { name: 'Black Titanium', hex: '#313233' }
    ],
    storageOptions: [
      { size: '49mm GPS + Cellular (Trail Loop)', priceMultiplier: 1.0 },
      { size: '49mm GPS + Cellular (Ocean Band)', priceMultiplier: 1.05 }
    ],
    specs: {
      processor: 'Apple S9 SiP with 64-bit dual-core processor',
      screen: '49mm Always-On Retina OLED (3000 nits)',
      releaseYear: 2023,
      connectivity: 'LTE and UMTS, Wi-Fi 4, Bluetooth 5.3'
    }
  },
  {
    id: 'apple-watch-series-9',
    title: 'Apple Watch Series 9 (45mm)',
    category: 'Apple Watch',
    categoryTag: 'WATCH',
    basePriceZAR: 7499,
    originalPriceZAR: 9999,
    image: '/src/assets/images/product_watch_clean_1792422873890.jpg',
    description: 'Featuring the innovative Double Tap gesture, brighter 2000-nit display, Precision Finding for iPhone, and advanced heart & blood oxygen health tracking.',
    batteryHealth: '96% capacity',
    warrantyMonths: 12,
    colors: [
      { name: 'Midnight', hex: '#1e2430' },
      { name: 'Starlight', hex: '#f0e8d9' },
      { name: 'Silver', hex: '#e2e4e5' }
    ],
    storageOptions: [
      { size: '41mm GPS', priceMultiplier: 0.92 },
      { size: '45mm GPS', priceMultiplier: 1.0 },
      { size: '45mm GPS + Cellular', priceMultiplier: 1.18 }
    ],
    specs: {
      processor: 'Apple S9 SiP with Double Tap',
      screen: 'Always-On Retina display (2000 nits)',
      releaseYear: 2023,
      connectivity: 'Wi-Fi, Bluetooth 5.3'
    }
  },
  {
    id: 'apple-watch-se-2',
    title: 'Apple Watch SE 2nd Gen (40mm)',
    category: 'Apple Watch',
    categoryTag: 'WATCH',
    basePriceZAR: 4299,
    originalPriceZAR: 5899,
    image: '/src/assets/images/product_watch_clean_1792422873890.jpg',
    description: 'Essential Apple Watch features for fitness, connection, and safety at an exceptional refurbished value. Crash Detection, heart rate notifications, and water resistance to 50m.',
    batteryHealth: '95% capacity',
    warrantyMonths: 12,
    colors: [
      { name: 'Midnight', hex: '#1e2430' },
      { name: 'Starlight', hex: '#f0e8d9' }
    ],
    storageOptions: [
      { size: '40mm GPS', priceMultiplier: 1.0 },
      { size: '44mm GPS', priceMultiplier: 1.12 }
    ],
    specs: {
      processor: 'Apple S8 SiP',
      screen: 'Retina LTPO OLED',
      releaseYear: 2022,
      connectivity: 'Wi-Fi, Bluetooth 5.3'
    }
  },

  // --- Accessories ---
  {
    id: 'apple-homepod-mini',
    title: 'Apple HomePod mini Smart Speaker',
    category: 'Accessories',
    categoryTag: 'ACCESSORIES',
    basePriceZAR: 2199,
    originalPriceZAR: 2899,
    image: '/src/assets/images/product_homepod_clean_1792422874580.jpg',
    description: 'Room-filling 360-degree acoustic audio in an ultra-compact acoustic mesh sphere. Siri intelligent assistant and seamless AirPlay 2 stereo pairing.',
    batteryHealth: 'Direct AC Powered',
    warrantyMonths: 12,
    colors: [
      { name: 'White', hex: '#ffffff' },
      { name: 'Space Gray', hex: '#4b4846' },
      { name: 'Midnight', hex: '#1e2430' }
    ],
    storageOptions: [{ size: 'Standard Unit', priceMultiplier: 1.0 }],
    specs: {
      processor: 'Apple S5 chip with computational audio',
      connectivity: '802.11n Wi-Fi, Thread, Bluetooth 5.0',
      releaseYear: 2020
    }
  },
  {
    id: 'apple-magsafe-charger-duo',
    title: 'Apple MagSafe Duo Wireless Charger',
    category: 'Accessories',
    categoryTag: 'ACCESSORIES',
    basePriceZAR: 1599,
    originalPriceZAR: 2499,
    image: '/src/assets/images/product_watch_clean_1792422873890.jpg',
    description: 'Foldable dual magnetic charger that powers your compatible iPhone, Apple Watch, Wireless Charging Case for AirPods, and other Qi-certified devices simultaneously.',
    batteryHealth: 'Original Certified Accessory',
    warrantyMonths: 12,
    colors: [{ name: 'White', hex: '#ffffff' }],
    storageOptions: [{ size: 'MagSafe Duo Kit', priceMultiplier: 1.0 }],
    specs: {
      connectivity: 'Lightning to USB-C input, Foldable travel form',
      releaseYear: 2021
    }
  },
  {
    id: 'apple-20w-usbc-adapter-pack',
    title: 'Original Apple 20W USB-C Power Adapter + Cable',
    category: 'Accessories',
    categoryTag: 'ACCESSORIES',
    basePriceZAR: 899,
    originalPriceZAR: 1199,
    image: '/src/assets/images/product_airpods_clean_1792422874101.jpg',
    description: 'Official Apple 20W Fast Power Delivery wall charger with 1m braided USB-C charging cable for iPhones, iPads, and AirPods.',
    batteryHealth: 'Grade A+ Unused OEM',
    warrantyMonths: 12,
    colors: [{ name: 'White', hex: '#ffffff' }],
    storageOptions: [{ size: '20W Adapter + 1m Cable', priceMultiplier: 1.0 }],
    specs: {
      connectivity: 'USB-C Power Delivery 3.0',
      releaseYear: 2022
    }
  }
];

export const CATEGORIES_QUICK_LIST = [
  { name: 'MacBook Air', category: 'MacBooks', image: '/src/assets/images/product_macbook_clean_1792422872738.jpg' },
  { name: 'iPhone', category: 'iPhone', image: '/src/assets/images/product_iphone_clean_1792422871785.jpg' },
  { name: 'iPad', category: 'iPad', image: '/src/assets/images/product_ipad_clean_1792422873348.jpg' },
  { name: 'Apple Watch', category: 'Apple Watch', image: '/src/assets/images/product_watch_clean_1792422873890.jpg' },
  { name: 'AirPods', category: 'AirPods', image: '/src/assets/images/product_airpods_clean_1792422874101.jpg' },
  { name: 'Accessories', category: 'Accessories', image: '/src/assets/images/product_homepod_clean_1792422874580.jpg' }
];

export const INSPECTION_STEPS = [
  { title: 'Battery Performance Audit', desc: 'Every device verified at 90%+ health or fitted with an authentic fresh battery cell.' },
  { title: '70-Point Hardware Scan', desc: 'Screen digitizer, TrueTone, Face ID, biometrics, speakers, mics, and cameras rigorously tested.' },
  { title: 'Grade A+ Cosmetic Polish', desc: 'Deep ultrasonic clean and cosmetic restoration to look and feel factory-fresh.' },
  { title: '1-Year Comprehensive Warranty', desc: 'Full mechanical & electrical coverage backed by our Marshallstown, Johannesburg repair lab.' }
];

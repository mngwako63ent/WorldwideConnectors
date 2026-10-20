/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { AboutLabPage } from './pages/AboutLabPage';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { TradeInEstimator } from './components/TradeInEstimator';
import { RefurbishedInspectionModal } from './components/RefurbishedInspectionModal';
import { ContactModal } from './components/ContactModal';
import { OrdersModal } from './components/OrdersModal';
import { FloatingControls } from './components/FloatingControls';

const AppContent: React.FC = () => {
  const { currentPage } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-white text-zinc-900 selection:bg-blue-600 selection:text-white overflow-x-hidden w-full max-w-full">
      {/* Top Announcement Bars */}
      <AnnouncementBar />

      {/* Primary Top Bar with custom world-connect logo and 3-page navigation */}
      <Header />

      {/* Dynamic 3-Page Main Content View */}
      <main className="flex-1">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'shop' && <ShopPage />}
        {currentPage === 'about' && <AboutLabPage />}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Global Modals & Overlays */}
      <ProductModal />
      <CartDrawer />
      <SearchModal />
      <TradeInEstimator />
      <RefurbishedInspectionModal />
      <ContactModal />
      <OrdersModal />
      <FloatingControls />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

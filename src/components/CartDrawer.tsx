import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { CheckoutModal } from './CheckoutModal';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, ShieldCheck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    cartCount,
    subtotalZAR,
    freeShippingThresholdZAR,
    amountNeededForFreeDelivery,
    isFreeDelivery,
    isCartOpen,
    setIsCartOpen,
    formatPrice,
    updateQuantity,
    removeFromCart,
    setCurrentPage
  } = useCart();

  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  if (!isCartOpen) return null;

  const progressPercentage = Math.min(100, (subtotalZAR / freeShippingThresholdZAR) * 100);

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
        <div
          className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-zinc-200 animate-in slide-in-from-right duration-250"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-zinc-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-blue-600" />
              <h2 className="text-base sm:text-lg font-bold text-zinc-950">
                Your Shopping Bag ({cartCount})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              aria-label="Close bag"
              className="p-1.5 rounded-full hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Tracker */}
          <div className="bg-zinc-50 px-4 sm:px-6 py-3 border-b border-zinc-200">
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              <span className="flex items-center gap-1.5 text-zinc-800">
                <Truck className="w-3.5 h-3.5 text-blue-600" />
                {isFreeDelivery ? (
                  <span className="text-emerald-700 font-bold">Free Nationwide Delivery Unlocked!</span>
                ) : (
                  <span>
                    Add <strong className="text-zinc-950">{formatPrice(amountNeededForFreeDelivery)}</strong> for Free Delivery
                  </span>
                )}
              </span>
              <span className="text-zinc-500 text-[11px] font-medium">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full h-1.5 bg-zinc-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 rounded-full ${
                  isFreeDelivery ? 'bg-emerald-500' : 'bg-blue-600'
                }`}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 divide-y divide-zinc-100">
            {cart.length > 0 ? (
              cart.map(item => (
                <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                  
                  {/* Thumbnail */}
                  <div className="w-20 h-20 bg-zinc-50 border border-zinc-200/80 rounded-xl p-2 flex items-center justify-center shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-zinc-900 line-clamp-1">
                          {item.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          aria-label={`Remove ${item.title}`}
                          className="text-zinc-400 hover:text-red-600 transition-colors p-1 rounded-lg hover:bg-zinc-100 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-zinc-500 mt-0.5">
                        {item.selectedStorage} · {item.selectedColor}
                      </div>
                      <div className="text-[10px] text-blue-600 font-semibold mt-0.5">
                        {item.conditionGrade}
                      </div>
                    </div>

                    {/* Price & Quantity Stepper with rounded-lg buttons */}
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs sm:text-sm font-bold text-zinc-950 tabular-nums">
                        {formatPrice(item.priceZAR * item.quantity)}
                      </span>

                      <div className="flex items-center border border-zinc-200 rounded-lg bg-zinc-50 p-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          aria-label="Decrease quantity"
                          className="p-1 text-zinc-600 hover:text-zinc-950 rounded hover:bg-zinc-200 transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-zinc-800 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          aria-label="Increase quantity"
                          className="p-1 text-zinc-600 hover:text-zinc-950 rounded hover:bg-zinc-200 transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-500">
                <ShoppingBag className="w-12 h-12 text-zinc-300 mb-3" />
                <h3 className="text-sm font-bold text-zinc-900">Your shopping bag is empty</h3>
                <p className="text-xs text-zinc-500 mt-1 max-w-xs mb-6">
                  Browse certified refurbished MacBooks, iPhones, iPads, and audio gear.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setCurrentPage('shop');
                  }}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            )}
          </div>

          {/* Footer & Checkout button (rounded-xl) */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-zinc-200 bg-zinc-50/70 space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-zinc-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-zinc-900 tabular-nums">{formatPrice(subtotalZAR)}</span>
                </div>
                <div className="flex items-center justify-between text-zinc-600">
                  <span>Estimated Delivery</span>
                  <span className="font-semibold text-zinc-900">
                    {isFreeDelivery ? 'FREE' : formatPrice(150)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-zinc-600">
                  <span>12-Month Certified Warranty</span>
                  <span className="text-emerald-700 font-semibold">Included</span>
                </div>
                <div className="pt-2 border-t border-zinc-200 flex items-center justify-between text-sm sm:text-base font-extrabold text-zinc-950">
                  <span>Total</span>
                  <span className="tabular-nums">
                    {formatPrice(subtotalZAR + (isFreeDelivery ? 0 : 150))}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setCheckoutModalOpen(true)}
                className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-blue-600/30 active:scale-98 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-500 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-600" />
                <span>Encrypted 256-Bit Secure Checkout · 14-Day Returns</span>
              </div>
            </div>
          )}

        </div>
      </div>

      {checkoutModalOpen && (
        <CheckoutModal onClose={() => setCheckoutModalOpen(false)} />
      )}
    </>
  );
};

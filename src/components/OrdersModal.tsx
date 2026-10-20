import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Package, CheckCircle2 } from 'lucide-react';

export const OrdersModal: React.FC = () => {
  const { isOrdersOpen, setIsOrdersOpen, orders, formatPrice, setCurrentPage } = useCart();

  if (!isOrdersOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      <div
        className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-zinc-200 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
          <div className="flex items-center gap-2.5">
            <Package className="w-5 h-5 text-blue-600" />
            <div>
              <h2 className="text-base sm:text-lg font-bold text-zinc-950">
                My Orders &amp; Dispatch Tracking
              </h2>
              <span className="text-xs text-zinc-500">
                world-connect Order Management
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsOrdersOpen(false)}
            aria-label="Close orders modal"
            className="p-1.5 rounded-full hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map(order => (
                <div
                  key={order.orderId}
                  className="bg-zinc-50 border border-zinc-200 rounded-2xl p-5 space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 pb-3">
                    <div>
                      <span className="text-xs font-mono font-bold text-zinc-900">
                        Order #{order.orderId}
                      </span>
                      <div className="text-[11px] text-zinc-500">
                        Placed on {new Date(order.createdAt).toLocaleDateString('en-ZA', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{order.status}</span>
                      </span>
                      <span className="text-sm font-extrabold text-zinc-950 tabular-nums">
                        {formatPrice(order.totalZAR)}
                      </span>
                    </div>
                  </div>

                  {/* Items in order */}
                  <div className="space-y-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs text-zinc-700">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="font-semibold text-zinc-900 truncate">
                            {item.quantity}x {item.title}
                          </span>
                          <span className="text-zinc-400">·</span>
                          <span className="text-zinc-500 text-[11px]">
                            {item.selectedStorage} ({item.conditionGrade})
                          </span>
                        </div>
                        <span className="font-medium tabular-nums shrink-0">
                          {formatPrice(item.priceZAR * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Destination */}
                  <div className="pt-2 text-[11px] text-zinc-500 border-t border-zinc-200 flex items-center justify-between">
                    <span>
                      Destination: <strong className="text-zinc-700">{order.customer.city || 'Standard Delivery'}</strong>
                    </span>
                    <span className="font-semibold text-blue-600">
                      {order.customer.shippingMethod === 'jhb_same_day' ? 'Same-Day Express' : 'Insured Courier'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-zinc-500">
              <Package className="w-12 h-12 text-zinc-300 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-zinc-900">No Orders Yet</h3>
              <p className="text-xs text-zinc-500 mt-1 max-w-xs mx-auto mb-6">
                When you purchase refurbished hardware from world-connect, your live order tracking reference and warranty information will appear here.
              </p>
              <button
                onClick={() => {
                  setIsOrdersOpen(false);
                  setCurrentPage('shop');
                }}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
              >
                Browse Catalog
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

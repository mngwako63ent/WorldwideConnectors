import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { OrderDetails } from '../types';
import { X, CheckCircle, CreditCard, ShieldCheck, ArrowLeft, Printer, Download } from 'lucide-react';

interface CheckoutModalProps {
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ onClose }) => {
  const { cart, subtotalZAR, isFreeDelivery, formatPrice, createOrder, setIsCartOpen } = useCart();

  const [step, setStep] = useState<'details' | 'payment' | 'confirmed'>('details');
  const [createdOrder, setCreatedOrder] = useState<OrderDetails | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [province, setProvince] = useState('Gauteng');
  const [shippingMethod, setShippingMethod] = useState<'jhb_same_day' | 'nationwide_courier' | 'store_pickup'>('nationwide_courier');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'eft' | 'cod'>('card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const shippingCostZAR = shippingMethod === 'store_pickup' ? 0 : isFreeDelivery ? 0 : 150;
  const finalTotalZAR = subtotalZAR + shippingCostZAR;

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || (!address && shippingMethod !== 'store_pickup')) {
      setErrorMessage('Please fill in all required contact and delivery details.');
      return;
    }
    setErrorMessage('');
    setStep('payment');
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const order = createOrder({
        items: [...cart],
        subtotalZAR,
        shippingZAR: shippingCostZAR,
        totalZAR: finalTotalZAR,
        customer: {
          name,
          email,
          phone,
          address: address || 'Central Showroom Desk (Collection)',
          city: city || 'Local',
          postalCode: postalCode || '0000',
          province,
          shippingMethod,
          paymentMethod
        }
      });
      setCreatedOrder(order);
      setIsSubmitting(false);
      setStep('confirmed');
    }, 900);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const handleDownloadReceipt = () => {
    if (!createdOrder) return;
    const receiptText = `
========================================
       WORLD-CONNET REFURBISHED APPLE
            OFFICIAL TAX RECEIPT
========================================
Order Reference: ${createdOrder.orderId}
Date: ${new Date(createdOrder.createdAt).toLocaleString('en-ZA')}
Customer Name: ${createdOrder.customer.name}
Email: ${createdOrder.customer.email}
Phone: ${createdOrder.customer.phone}
Delivery Method: ${createdOrder.customer.shippingMethod}
Delivery Address: ${createdOrder.customer.address}, ${createdOrder.customer.city}

----------------------------------------
PURCHASED ITEMS:
----------------------------------------
${createdOrder.items.map(item => `- ${item.quantity}x ${item.title} (${item.selectedStorage} - ${item.conditionGrade}) : ${formatPrice(item.priceZAR * item.quantity)}`).join('\n')}

----------------------------------------
Subtotal: ${formatPrice(createdOrder.subtotalZAR)}
Shipping: ${createdOrder.shippingZAR === 0 ? 'FREE' : formatPrice(createdOrder.shippingZAR)}
1-Year Warranty: INCLUDED
----------------------------------------
TOTAL PAID: ${formatPrice(createdOrder.totalZAR)}
========================================
Thank you for choosing world-connect!
Support: support@world-connect.co.za
========================================
    `.trim();

    const blob = new Blob([receiptText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `world-connect-receipt-${createdOrder.orderId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-60 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-zinc-200 overflow-hidden my-8"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
          <div className="flex items-center gap-3">
            {step === 'payment' && (
              <button
                onClick={() => setStep('details')}
                className="p-1 text-zinc-500 hover:text-zinc-900 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <div>
              <h2 className="text-base sm:text-lg font-bold text-zinc-950">
                {step === 'details' && '1. Delivery & Contact Details'}
                {step === 'payment' && '2. Secure Payment & Confirmation'}
                {step === 'confirmed' && 'Order Confirmed!'}
              </h2>
              <span className="text-xs text-zinc-500">
                world-connect · Certified Refurbished Apple Store
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close checkout"
            className="p-1.5 rounded-full hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1: Details */}
        {step === 'details' && (
          <form onSubmit={handleDetailsSubmit} className="p-6 space-y-5">
            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
                {errorMessage}
              </div>
            )}

            {/* Contact info */}
            <div>
              <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-3">
                Customer Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Alex Smith"
                    className="w-full text-xs px-3.5 py-2.5 border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full text-xs px-3.5 py-2.5 border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-zinc-700 mb-1">Mobile / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="Mobile number"
                    className="w-full text-xs px-3.5 py-2.5 border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>
            </div>

            {/* Shipping method selection */}
            <div>
              <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-3">
                Delivery Option
              </h3>
              <div className="space-y-2">
                <label className={`flex items-start gap-3 p-3.5 border rounded-xl cursor-pointer transition-colors ${
                  shippingMethod === 'nationwide_courier' ? 'border-blue-600 bg-blue-50/30' : 'border-zinc-200'
                }`}>
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === 'nationwide_courier'}
                    onChange={() => setShippingMethod('nationwide_courier')}
                    className="mt-0.5"
                  />
                  <div className="flex-1 text-xs">
                    <div className="font-bold text-zinc-900 flex items-center justify-between">
                      <span>Express Door-to-Door Courier</span>
                      <span className="text-emerald-700 font-semibold">{isFreeDelivery ? 'FREE' : formatPrice(150)}</span>
                    </div>
                    <div className="text-zinc-500 mt-0.5">
                      Fast insured courier dispatch with full live tracking reference (24–48 hours).
                    </div>
                  </div>
                </label>

                <label className={`flex items-start gap-3 p-3.5 border rounded-xl cursor-pointer transition-colors ${
                  shippingMethod === 'jhb_same_day' ? 'border-blue-600 bg-blue-50/30' : 'border-zinc-200'
                }`}>
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === 'jhb_same_day'}
                    onChange={() => setShippingMethod('jhb_same_day')}
                    className="mt-0.5"
                  />
                  <div className="flex-1 text-xs">
                    <div className="font-bold text-zinc-900 flex items-center justify-between">
                      <span>Express Same-Day Delivery</span>
                      <span className="text-emerald-700 font-semibold">{isFreeDelivery ? 'FREE' : formatPrice(150)}</span>
                    </div>
                    <div className="text-zinc-500 mt-0.5">
                      For orders placed before 14:00. Fast local courier.
                    </div>
                  </div>
                </label>

                <label className={`flex items-start gap-3 p-3.5 border rounded-xl cursor-pointer transition-colors ${
                  shippingMethod === 'store_pickup' ? 'border-blue-600 bg-blue-50/30' : 'border-zinc-200'
                }`}>
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === 'store_pickup'}
                    onChange={() => setShippingMethod('store_pickup')}
                    className="mt-0.5"
                  />
                  <div className="flex-1 text-xs">
                    <div className="font-bold text-zinc-900 flex items-center justify-between">
                      <span>Showroom Collection</span>
                      <span className="text-emerald-700 font-semibold">FREE</span>
                    </div>
                    <div className="text-zinc-500 mt-0.5">
                      Collect in person directly from our showroom desk.
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Address fields */}
            {shippingMethod !== 'store_pickup' && (
              <div>
                <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-3">
                  Delivery Destination
                </h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-xs font-medium text-zinc-700 mb-1">Street Address *</label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                      placeholder="Street address &amp; apartment/unit"
                      className="w-full text-xs px-3.5 py-2.5 border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-zinc-700 mb-1">City / Suburb *</label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        placeholder="City"
                        className="w-full text-xs px-3.5 py-2.5 border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-700 mb-1">Postal Code *</label>
                      <input
                        type="text"
                        required
                        value={postalCode}
                        onChange={e => setPostalCode(e.target.value)}
                        placeholder="Postal Code"
                        className="w-full text-xs px-3.5 py-2.5 border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-700 mb-1">Province *</label>
                      <select
                        value={province}
                        onChange={e => setProvince(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                      >
                        <option value="Gauteng">Gauteng</option>
                        <option value="Western Cape">Western Cape</option>
                        <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                        <option value="Eastern Cape">Eastern Cape</option>
                        <option value="Free State">Free State</option>
                        <option value="Mpumalanga">Mpumalanga</option>
                        <option value="Limpopo">Limpopo</option>
                        <option value="North West">North West</option>
                        <option value="Northern Cape">Northern Cape</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom bar */}
            <div className="pt-4 border-t border-zinc-200 flex items-center justify-between">
              <div>
                <span className="text-xs text-zinc-500">Total payable:</span>
                <div className="text-base font-extrabold text-zinc-950 tabular-nums">
                  {formatPrice(finalTotalZAR)}
                </div>
              </div>
              <button
                type="submit"
                className="py-3 px-6 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
              >
                Continue to Payment
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Payment */}
        {step === 'payment' && (
          <form onSubmit={handlePlaceOrder} className="p-6 space-y-6">
            <div>
              <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-3">
                Payment Option
              </h3>
              <div className="space-y-3">
                <label className={`flex items-start gap-3 p-3.5 border rounded-xl cursor-pointer transition-colors ${
                  paymentMethod === 'card' ? 'border-blue-600 bg-blue-50/30' : 'border-zinc-200'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="mt-0.5"
                  />
                  <div className="flex-1 text-xs">
                    <div className="font-bold text-zinc-900 flex items-center justify-between">
                      <span>Debit / Credit Card (3D Secure)</span>
                      <CreditCard className="w-4 h-4 text-zinc-600" />
                    </div>
                    <p className="text-zinc-500 mt-1">
                      Visa, MasterCard, and American Express. Protected with 256-bit bank encryption.
                    </p>
                  </div>
                </label>

                <label className={`flex items-start gap-3 p-3.5 border rounded-xl cursor-pointer transition-colors ${
                  paymentMethod === 'eft' ? 'border-blue-600 bg-blue-50/30' : 'border-zinc-200'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'eft'}
                    onChange={() => setPaymentMethod('eft')}
                    className="mt-0.5"
                  />
                  <div className="flex-1 text-xs">
                    <div className="font-bold text-zinc-900 flex items-center justify-between">
                      <span>Instant EFT / Bank Transfer</span>
                      <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">FAST</span>
                    </div>
                    <p className="text-zinc-500 mt-1">
                      Direct instant digital bank transfer with instant confirmation.
                    </p>
                  </div>
                </label>

                <label className={`flex items-start gap-3 p-3.5 border rounded-xl cursor-pointer transition-colors ${
                  paymentMethod === 'cod' ? 'border-blue-600 bg-blue-50/30' : 'border-zinc-200'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="mt-0.5"
                  />
                  <div className="flex-1 text-xs">
                    <div className="font-bold text-zinc-900 flex items-center justify-between">
                      <span>Cash / Speedpoint Card on Delivery</span>
                    </div>
                    <p className="text-zinc-500 mt-1">
                      Pay via card machine or cash upon receipt.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Order Review summary */}
            <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200 space-y-2 text-xs">
              <div className="font-bold text-zinc-900 pb-1 border-b border-zinc-200">
                Order Summary ({cart.length} items)
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Items Subtotal:</span>
                <span className="font-medium text-zinc-900 tabular-nums">{formatPrice(subtotalZAR)}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Delivery:</span>
                <span className="font-medium text-zinc-900">
                  {shippingCostZAR === 0 ? 'FREE' : formatPrice(shippingCostZAR)}
                </span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>1-Year Certified Warranty:</span>
                <span className="text-emerald-700 font-semibold">Included</span>
              </div>
              <div className="pt-2 border-t border-zinc-200 flex justify-between font-bold text-sm text-zinc-950">
                <span>Final Total:</span>
                <span className="tabular-nums">{formatPrice(finalTotalZAR)}</span>
              </div>
            </div>

            {/* Place Order CTA with rounded-xl button */}
            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep('details')}
                className="text-xs font-semibold text-zinc-600 hover:text-zinc-900 cursor-pointer"
              >
                Back to Details
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="py-3.5 px-8 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Authorizing Payment...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-emerald-300" />
                    <span>Authorize &amp; Place Order</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Confirmed Screen */}
        {step === 'confirmed' && createdOrder && (
          <div id="printable-receipt" className="p-6 sm:p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                Payment Authorized · Order Placed
              </span>
              <h3 className="text-2xl font-extrabold text-zinc-950 mt-1">
                Thank you, {createdOrder.customer.name.split(' ')[0]}!
              </h3>
              <p className="text-xs text-zinc-600 mt-1 max-w-sm mx-auto">
                Your order <strong className="text-zinc-950">{createdOrder.orderId}</strong> has been confirmed at world-connect.
              </p>
            </div>

            <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-left text-xs space-y-3 max-w-md mx-auto">
              <div className="flex justify-between text-zinc-600 pb-2 border-b border-zinc-200">
                <span>Order Reference:</span>
                <span className="font-mono font-bold text-zinc-900">{createdOrder.orderId}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Customer:</span>
                <span className="font-semibold text-zinc-900">{createdOrder.customer.name}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Contact:</span>
                <span className="font-semibold text-zinc-900">{createdOrder.customer.phone}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Delivery Method:</span>
                <span className="font-semibold text-zinc-900">
                  {createdOrder.customer.shippingMethod === 'jhb_same_day'
                    ? 'Same-Day Express'
                    : createdOrder.customer.shippingMethod === 'store_pickup'
                    ? 'Showroom Collection'
                    : '24–48h Nationwide Courier'}
                </span>
              </div>

              {/* Items Breakdown */}
              <div className="pt-2 border-t border-zinc-200 space-y-1.5">
                <span className="font-bold text-zinc-900 block text-[11px] uppercase tracking-wider">Purchased Items:</span>
                {createdOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-zinc-700 text-[11px]">
                    <span className="truncate pr-2">{item.quantity}x {item.title} ({item.selectedStorage})</span>
                    <span className="font-medium tabular-nums shrink-0">{formatPrice(item.priceZAR * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between text-zinc-600 pt-2 border-t border-zinc-200">
                <span>Subtotal:</span>
                <span className="font-medium text-zinc-900 tabular-nums">{formatPrice(createdOrder.subtotalZAR)}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Shipping:</span>
                <span className="font-medium text-zinc-900">{createdOrder.shippingZAR === 0 ? 'FREE' : formatPrice(createdOrder.shippingZAR)}</span>
              </div>
              <div className="flex justify-between text-zinc-600 pt-2 border-t border-zinc-200 font-bold text-sm text-zinc-950">
                <span>Total Paid:</span>
                <span className="tabular-nums">
                  {formatPrice(createdOrder.totalZAR)}
                </span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 print:hidden">
              <button
                onClick={() => {
                  onClose();
                  setIsCartOpen(false);
                }}
                className="w-full sm:w-auto px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-2"
              >
                <span>Back to Store</span>
              </button>
              <button
                onClick={handlePrintReceipt}
                className="w-full sm:w-auto px-4 py-3 bg-white border border-zinc-300 hover:bg-zinc-50 text-zinc-800 text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4 text-zinc-600" />
                <span>Print Receipt</span>
              </button>
              <button
                onClick={handleDownloadReceipt}
                className="w-full sm:w-auto px-4 py-3 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
              >
                <Download className="w-4 h-4 text-zinc-200" />
                <span>Download Receipt (.txt)</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

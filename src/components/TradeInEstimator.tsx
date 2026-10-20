import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, RefreshCw, ArrowRight } from 'lucide-react';

export const TradeInEstimator: React.FC = () => {
  const { isTradeInOpen, setIsTradeInOpen, formatPrice } = useCart();

  const [deviceType, setDeviceType] = useState('iPhone');
  const [model, setModel] = useState('iPhone 13');
  const [condition, setCondition] = useState<'flawless' | 'good' | 'scratched'>('good');

  if (!isTradeInOpen) return null;

  const calculateValue = (): number => {
    let base = 5000;
    if (deviceType === 'iPhone') {
      if (model.includes('15')) base = 12500;
      else if (model.includes('14')) base = 9500;
      else if (model.includes('13')) base = 7200;
      else if (model.includes('12')) base = 5200;
      else base = 3500;
    } else if (deviceType === 'MacBook') {
      if (model.includes('M2')) base = 16000;
      else if (model.includes('M1')) base = 11500;
      else base = 6500;
    } else {
      base = 4500;
    }

    const mult = condition === 'flawless' ? 1.15 : condition === 'good' ? 1.0 : 0.75;
    return Math.round(base * mult);
  };

  const estimatedCredit = calculateValue();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      <div
        className="relative bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-zinc-200 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
          <div className="flex items-center gap-2.5">
            <RefreshCw className="w-5 h-5 text-blue-600" />
            <div>
              <h2 className="text-base sm:text-lg font-bold text-zinc-950">
                world-connect Trade-In Valuation
              </h2>
              <span className="text-xs text-zinc-500">
                Trade your used device towards any certified refurbished Apple product
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsTradeInOpen(false)}
            aria-label="Close trade-in dialog"
            className="p-1.5 rounded-full hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body with rounded-xl controls */}
        <div className="p-6 space-y-5 text-xs">
          {/* Device Type */}
          <div>
            <label className="block font-bold text-zinc-900 uppercase tracking-wider mb-2">
              1. Select Device Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['iPhone', 'MacBook', 'iPad'].map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    setDeviceType(type);
                    if (type === 'iPhone') setModel('iPhone 13');
                    if (type === 'MacBook') setModel('MacBook Air M1');
                    if (type === 'iPad') setModel('iPad 9th Gen');
                  }}
                  className={`py-2.5 px-3 rounded-xl border font-bold text-center transition-colors cursor-pointer ${
                    deviceType === type
                      ? 'border-blue-600 bg-blue-600 text-white shadow-xs'
                      : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Model selection */}
          <div>
            <label className="block font-bold text-zinc-900 uppercase tracking-wider mb-1.5">
              2. Specific Model
            </label>
            <select
              value={model}
              onChange={e => setModel(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-zinc-300 rounded-xl bg-white text-zinc-800 font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
            >
              {deviceType === 'iPhone' && (
                <>
                  <option value="iPhone 15 Pro Max">iPhone 15 Pro Max</option>
                  <option value="iPhone 15 Pro">iPhone 15 Pro</option>
                  <option value="iPhone 14 Pro">iPhone 14 Pro</option>
                  <option value="iPhone 13 Pro">iPhone 13 Pro</option>
                  <option value="iPhone 13">iPhone 13</option>
                  <option value="iPhone 12">iPhone 12</option>
                  <option value="iPhone 11">iPhone 11</option>
                </>
              )}
              {deviceType === 'MacBook' && (
                <>
                  <option value="MacBook Pro 16 inch M2">MacBook Pro 16" (M2)</option>
                  <option value="MacBook Pro 14 inch M1">MacBook Pro 14" (M1)</option>
                  <option value="MacBook Air M2">MacBook Air (M2)</option>
                  <option value="MacBook Air M1">MacBook Air (M1)</option>
                  <option value="MacBook Pro Intel 2019">MacBook Pro (Intel)</option>
                </>
              )}
              {deviceType === 'iPad' && (
                <>
                  <option value="iPad Pro 12.9 M1">iPad Pro 12.9" (M1)</option>
                  <option value="iPad Air 4">iPad Air 4</option>
                  <option value="iPad 9th Gen">iPad 9th Gen</option>
                  <option value="iPad Mini 6">iPad Mini 6</option>
                </>
              )}
            </select>
          </div>

          {/* Condition */}
          <div>
            <label className="block font-bold text-zinc-900 uppercase tracking-wider mb-2">
              3. Device Physical Condition
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'flawless', label: 'Flawless', desc: 'No visible scratches' },
                { id: 'good', label: 'Good', desc: 'Light signs of normal use' },
                { id: 'scratched', label: 'Fair', desc: 'Visible scuffs or chips' }
              ].map(c => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCondition(c.id as any)}
                  className={`p-3 rounded-xl border text-left transition-colors cursor-pointer ${
                    condition === c.id
                      ? 'border-blue-600 bg-blue-50/40 text-blue-950 ring-2 ring-blue-600/20'
                      : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300'
                  }`}
                >
                  <div className="font-bold">{c.label}</div>
                  <div className={`text-[10px] ${condition === c.id ? 'text-blue-600' : 'text-zinc-500'}`}>
                    {c.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Estimated Value Card */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center space-y-1">
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
              Estimated world-connect Store Credit
            </span>
            <div className="text-3xl font-extrabold text-emerald-950 tabular-nums">
              {formatPrice(estimatedCredit)}
            </div>
            <p className="text-[11px] text-emerald-700">
              Valid for instant checkout discount towards any certified refurbished Apple hardware.
            </p>
          </div>

          {/* Action with rounded-xl button */}
          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={() => setIsTradeInOpen(false)}
              className="text-xs font-semibold text-zinc-600 hover:text-zinc-900 cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                alert(`Trade-in estimate of ${formatPrice(estimatedCredit)} locked! Reference code TR-${Math.floor(1000 + Math.random() * 9000)} saved for your order.`);
                setIsTradeInOpen(false);
              }}
              className="py-3 px-6 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <span>Lock in This Estimate</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

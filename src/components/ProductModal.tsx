import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { ConditionGrade } from '../types';
import {
  X,
  ShieldCheck,
  BatteryCharging,
  Check,
  Truck,
  RotateCcw,
  Sparkles,
  Award,
  Minus,
  Plus,
  ShoppingBag,
  Zap
} from 'lucide-react';

export const ProductModal: React.FC = () => {
  const { selectedProduct, setSelectedProduct, addToCart, formatPrice, setIsCartOpen } = useCart();

  const [selectedStorage, setSelectedStorage] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedGrade, setSelectedGrade] = useState<ConditionGrade>('Pristine (Grade A+)');
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  useEffect(() => {
    if (selectedProduct) {
      setSelectedStorage(selectedProduct.storageOptions[0]?.size || 'Standard');
      setSelectedColor(selectedProduct.colors[0]?.name || 'Standard');
      setSelectedGrade('Pristine (Grade A+)');
      setQuantity(1);
      setAddedToast(false);
    }
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  const storageOption = selectedProduct.storageOptions.find(o => o.size === selectedStorage);
  const storageMultiplier = storageOption ? storageOption.priceMultiplier : 1.0;
  
  const gradeModifier =
    selectedGrade === 'Pristine (Grade A+)' ? 1.0 :
    selectedGrade === 'Excellent (Grade A)' ? 0.92 : 0.85;

  const currentUnitPrice = Math.round(selectedProduct.basePriceZAR * storageMultiplier * gradeModifier);

  const handleAddToCart = () => {
    addToCart(selectedProduct, {
      color: selectedColor,
      storage: selectedStorage,
      grade: selectedGrade,
      quantity
    });
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, {
      color: selectedColor,
      storage: selectedStorage,
      grade: selectedGrade,
      quantity
    });
    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-in fade-in duration-150">
      <div
        className="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-zinc-200 overflow-hidden my-8"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          aria-label="Close dialog"
          className="absolute right-4 top-4 z-10 w-9 h-9 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 hover:text-zinc-950 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column: Product Imagery & Diagnostics summary */}
          <div className="p-6 sm:p-8 bg-zinc-50/80 border-b md:border-b-0 md:border-r border-zinc-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
                <span>{selectedProduct.category}</span>
                <span>·</span>
                <span className="text-blue-600">world-connect Certified</span>
              </div>

              {/* Main Product Image Stage */}
              <div className="w-full aspect-square bg-white rounded-2xl border border-zinc-200/80 p-8 flex items-center justify-center relative shadow-xs overflow-hidden">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  referrerPolicy="no-referrer"
                  className="max-h-full max-w-full object-contain"
                />
                <div className="absolute bottom-3 left-3 bg-zinc-950/90 text-white text-[11px] font-semibold px-3 py-1 rounded-full backdrop-blur-xs flex items-center gap-1.5 shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Grade A+ Inspected</span>
                </div>
              </div>
            </div>

            {/* Quality checklist */}
            <div className="mt-6 pt-6 border-t border-zinc-200 space-y-2.5 text-xs text-zinc-700">
              <div className="flex items-center gap-2">
                <BatteryCharging className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Battery Health:</strong> {selectedProduct.batteryHealth}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-blue-600 shrink-0" />
                <span><strong>Warranty:</strong> 12 Months full hardware guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-zinc-700 shrink-0" />
                <span><strong>Dispatch:</strong> Fast insured courier with live tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-zinc-700 shrink-0" />
                <span><strong>Returns:</strong> 14-day hassle-free return window</span>
              </div>
            </div>
          </div>

          {/* Right Column: Configuration & Purchase module */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Title & Price */}
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-950 tracking-tight">
                  {selectedProduct.title}
                </h2>
                
                <div className="mt-2 flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tabular-nums">
                    {formatPrice(currentUnitPrice)}
                  </span>
                  {selectedProduct.originalPriceZAR && (
                    <span className="text-sm text-zinc-400 line-through tabular-nums">
                      Retail {formatPrice(selectedProduct.originalPriceZAR)}
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-500 mt-1">
                  VAT included · Free delivery for orders over R1800
                </p>
              </div>

              {/* Description */}
              <p className="text-xs text-zinc-600 leading-relaxed">
                {selectedProduct.description}
              </p>

              {/* Refurbished Condition Grade Selector with rounded-xl buttons */}
              <div>
                <label className="block text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2">
                  Condition Grade: <span className="text-blue-600 font-semibold">{selectedGrade}</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Pristine (Grade A+)', 'Excellent (Grade A)', 'Good (Grade B)'] as ConditionGrade[]).map(grade => {
                    const isSelected = selectedGrade === grade;
                    const discountText =
                      grade === 'Pristine (Grade A+)' ? 'Like New' :
                      grade === 'Excellent (Grade A)' ? 'Save 8%' : 'Save 15%';
                    return (
                      <button
                        key={grade}
                        type="button"
                        onClick={() => setSelectedGrade(grade)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/40 text-blue-950 ring-2 ring-blue-600/20 shadow-xs'
                            : 'border-zinc-200 bg-white text-zinc-800 hover:border-zinc-300'
                        }`}
                      >
                        <div className="text-xs font-bold truncate">
                          {grade.replace(' (Grade ', ' ')}
                        </div>
                        <div className={`text-[10px] mt-0.5 font-semibold ${isSelected ? 'text-blue-600' : 'text-zinc-500'}`}>
                          {discountText}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Storage / Configuration options with rounded-xl buttons */}
              {selectedProduct.storageOptions && selectedProduct.storageOptions.length > 0 && (
                <div>
                  <label className="block text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2">
                    Storage &amp; Spec: <span className="text-blue-600 font-semibold">{selectedStorage}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.storageOptions.map(opt => {
                      const isSelected = selectedStorage === opt.size;
                      return (
                        <button
                          key={opt.size}
                          type="button"
                          onClick={() => setSelectedStorage(opt.size)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                            isSelected
                              ? 'border-blue-600 bg-blue-600 text-white shadow-xs'
                              : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300'
                          }`}
                        >
                          {opt.size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Color Finish Picker */}
              {selectedProduct.colors && selectedProduct.colors.length > 0 && (
                <div>
                  <label className="block text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2">
                    Color Finish: <span className="text-zinc-600 font-medium">{selectedColor}</span>
                  </label>
                  <div className="flex items-center gap-3">
                    {selectedProduct.colors.map(col => {
                      const isSelected = selectedColor === col.name;
                      return (
                        <button
                          key={col.name}
                          type="button"
                          onClick={() => setSelectedColor(col.name)}
                          className={`w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                            isSelected ? 'ring-2 ring-blue-600 ring-offset-2 scale-110' : 'hover:scale-105'
                          }`}
                          style={{ backgroundColor: col.hex }}
                          title={col.name}
                        >
                          {isSelected && (
                            <Check
                              className={`w-3.5 h-3.5 ${
                                col.name === 'White' || col.name === 'Starlight' ? 'text-zinc-900' : 'text-white'
                              }`}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity Selector with rounded-xl border */}
              <div className="flex items-center gap-4 pt-1">
                <span className="text-xs font-bold text-zinc-900 uppercase tracking-wider">Quantity:</span>
                <div className="flex items-center border border-zinc-200 rounded-xl bg-zinc-50 p-0.5">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Decrease quantity"
                    className="p-1.5 text-zinc-600 hover:text-zinc-950 rounded-lg hover:bg-zinc-200 transition-colors cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold text-zinc-900 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Increase quantity"
                    className="p-1.5 text-zinc-600 hover:text-zinc-950 rounded-lg hover:bg-zinc-200 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

            {/* CTAs with rounded-xl styling (no sharp corners) */}
            <div className="mt-8 pt-6 border-t border-zinc-200 space-y-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-4 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border border-zinc-200 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{addedToast ? 'Added to Bag!' : 'Add to Bag'}</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="flex-1 py-3.5 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-blue-600/30 cursor-pointer active:scale-98"
                >
                  <Zap className="w-4 h-4" />
                  <span>Instant Checkout</span>
                </button>
              </div>

              {addedToast && (
                <div className="text-center text-xs font-semibold text-emerald-600 animate-in fade-in">
                  ✓ {selectedProduct.title} ({selectedStorage}, {selectedColor}) added to bag!
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

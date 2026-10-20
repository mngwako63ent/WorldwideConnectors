import React from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Eye, ShieldCheck, BatteryCharging } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { formatPrice, setSelectedProduct, addToCart } = useCart();

  const handleCardClick = () => {
    setSelectedProduct(product);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  const hasMultipleOptions = product.storageOptions && product.storageOptions.length > 1;
  const lowestPrice = product.basePriceZAR;
  const highestPrice = hasMultipleOptions
    ? Math.round(product.basePriceZAR * product.storageOptions[product.storageOptions.length - 1].priceMultiplier)
    : product.basePriceZAR;

  return (
    <div
      onClick={handleCardClick}
      className="group bg-white rounded-2xl border border-zinc-200/90 p-5 flex flex-col justify-between hover:border-blue-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer relative"
    >
      <div>
        {/* Card Header: Category tag & badges */}
        <div className="flex items-center justify-between mb-3 text-[11px] font-bold tracking-wider uppercase">
          <span className="text-zinc-500 font-semibold">{product.categoryTag}</span>
          {product.isBestSeller && (
            <span className="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-md text-[10px] font-bold">
              BEST SELLER
            </span>
          )}
          {product.isNewArrival && !product.isBestSeller && (
            <span className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-md text-[10px] font-bold">
              REFURBISHED
            </span>
          )}
        </div>

        {/* Product Image Stage (elevated with subtle stage gradient, soft rounded container) */}
        <div className="w-full aspect-square flex items-center justify-center p-5 relative overflow-hidden bg-gradient-to-b from-zinc-50/80 to-zinc-100/40 rounded-xl border border-zinc-100">
          <img
            src={product.image}
            alt={product.title}
            referrerPolicy="no-referrer"
            className="max-h-full max-w-full object-contain group-hover:scale-108 transition-transform duration-300 ease-out"
          />

          {/* Quick-action overlay with rounded-xl buttons (no sharp corners) */}
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-2xs p-4">
            <button
              onClick={handleQuickAdd}
              aria-label={`Quick add ${product.title} to cart`}
              className="px-3.5 py-2 bg-zinc-950 hover:bg-blue-600 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Quick Add</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedProduct(product);
              }}
              aria-label={`Configure ${product.title}`}
              className="p-2 bg-white hover:bg-zinc-100 text-zinc-900 rounded-xl text-xs font-semibold shadow-md transition-all active:scale-95 cursor-pointer"
              title="Inspect specifications"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Product Title */}
        <h3 className="mt-4 text-sm sm:text-base font-bold text-zinc-900 group-hover:text-blue-600 transition-colors line-clamp-1">
          {product.title}
        </h3>

        {/* Specs snippet */}
        <p className="mt-1 text-xs text-zinc-500 line-clamp-1">
          {product.specs?.processor || product.description.slice(0, 50)}
        </p>

        {/* Diagnostics & Battery guarantee */}
        <div className="mt-2.5 flex items-center gap-2 text-[11px] text-zinc-600 font-medium">
          <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md font-semibold">
            <BatteryCharging className="w-3 h-3" />
            {product.batteryHealth.split(' ')[0]}
          </span>
          <span className="text-zinc-300">·</span>
          <span className="flex items-center gap-1 text-zinc-500">
            <ShieldCheck className="w-3 h-3 text-blue-600" />
            12M Warranty
          </span>
        </div>
      </div>

      {/* Price Baseline & Color options */}
      <div className="mt-5 pt-3.5 border-t border-zinc-100 flex items-end justify-between">
        <div>
          <div className="text-sm sm:text-base font-extrabold text-zinc-950 tabular-nums">
            {hasMultipleOptions && lowestPrice !== highestPrice ? (
              <span>
                {formatPrice(lowestPrice)} – {formatPrice(highestPrice)}
              </span>
            ) : (
              <span>{formatPrice(lowestPrice)}</span>
            )}
          </div>
          {product.originalPriceZAR && (
            <div className="text-[11px] text-zinc-400 line-through tabular-nums font-medium">
              Retail {formatPrice(product.originalPriceZAR)}
            </div>
          )}
        </div>

        {/* Available colors */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center -space-x-1.5 pb-0.5">
            {product.colors.slice(0, 3).map((c, i) => (
              <span
                key={i}
                className="w-3.5 h-3.5 rounded-full border-2 border-white shadow-xs inline-block"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
            {product.colors.length > 3 && (
              <span className="text-[10px] text-zinc-500 pl-2 font-bold">
                +{product.colors.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

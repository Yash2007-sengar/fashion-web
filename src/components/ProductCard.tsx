import React, { useState } from 'react';
import { Heart, Plus, Check } from 'lucide-react';
import { Product } from '../types';
import { SafeImage } from './SafeImage';

interface ProductCardProps {
  product: Product;
  index?: number;
  total?: number;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product, size: string) => void;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  index,
  total,
  isWishlisted,
  onToggleWishlist,
  onSelectProduct,
  onQuickAdd,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickSizes, setShowQuickSizes] = useState(false);
  const [addedSize, setAddedSize] = useState<string | null>(null);

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(product.price);

  const handleSizeClick = (e: React.MouseEvent, size: string) => {
    e.stopPropagation();
    onQuickAdd(product, size);
    setAddedSize(size);
    setTimeout(() => {
      setAddedSize(null);
      setShowQuickSizes(false);
    }, 1200);
  };

  return (
    <div
      className={`group relative flex flex-col cursor-pointer select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowQuickSizes(false);
      }}
      onClick={() => onSelectProduct(product)}
      data-cursor-view
    >
      {/* Editorial Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F4F0EB]">
        {/* Primary Image */}
        <SafeImage
          src={isHovered ? product.secondaryImage : product.primaryImage}
          alt={product.name}
          fallbackText={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />

        {/* Index/Number Indicator (e.g. 01 / 06) */}
        {index !== undefined && (
          <div className="absolute top-4 left-4 z-10 font-mono text-[10px] tracking-widest text-[#1A1A1A] bg-[#FDFDFD]/90 backdrop-blur-xs px-2 py-0.5 border border-[#E8E5E1]/60">
            {product.number} {total ? `/ 0${total}` : ''}
          </div>
        )}

        {/* Wishlist Heart Icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
          className={`absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-[#FDFDFD]/90 backdrop-blur-xs border border-[#E8E5E1] transition-all duration-300 hover:scale-110 active:scale-95 ${
            isWishlisted ? 'text-[#1A1A1A]' : 'text-[#666666] hover:text-[#1A1A1A]'
          }`}
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors ${
              isWishlisted ? 'fill-[#1A1A1A] text-[#1A1A1A]' : ''
            }`}
          />
        </button>

        {/* Quick Add Overlay Button on Hover */}
        <div className="absolute bottom-0 inset-x-0 p-3 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          {!showQuickSizes ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (product.sizes.length === 1) {
                  onQuickAdd(product, product.sizes[0]);
                  setAddedSize(product.sizes[0]);
                  setTimeout(() => setAddedSize(null), 1200);
                } else {
                  setShowQuickSizes(true);
                }
              }}
              className="w-full py-3 bg-[#1A1A1A] text-[#FDFDFD] text-[11px] uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 hover:bg-[#000000] active:scale-[0.99] transition-colors shadow-md"
            >
              {addedSize ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added {addedSize}</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Quick Add</span>
                </>
              )}
            </button>
          ) : (
            <div className="w-full bg-[#FDFDFD] border border-[#E8E5E1] p-2 flex items-center justify-between gap-1 shadow-lg">
              <span className="text-[10px] uppercase tracking-wider text-[#666666] px-1">
                Size:
              </span>
              <div className="flex items-center gap-1">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={(e) => handleSizeClick(e, sz)}
                    className={`px-2 py-1 text-[11px] font-mono border transition-colors ${
                      addedSize === sz
                        ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                        : 'border-[#E8E5E1] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Editorial Metadata (Zero-Pill Discipline) */}
      <div className="pt-4 flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-[#666666]">
          <span>{product.category}</span>
          <span className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full border border-black/15 inline-block"
              style={{ backgroundColor: product.colorHex }}
              title={product.colorName}
            />
            <span className="text-[10px] text-[#888888]">{product.colorName.split(' ')[0]}</span>
          </span>
        </div>

        <h3 className="font-serif text-lg sm:text-xl font-normal text-[#1A1A1A] tracking-tight group-hover:text-[#666666] transition-colors line-clamp-1">
          {product.name}
        </h3>

        <div className="flex items-baseline justify-between pt-0.5">
          <span className="font-mono text-xs sm:text-sm font-medium text-[#1A1A1A] tracking-tight tabular-nums">
            {formattedPrice}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-[#999999] opacity-0 group-hover:opacity-100 transition-opacity">
            View Piece →
          </span>
        </div>
      </div>
    </div>
  );
};

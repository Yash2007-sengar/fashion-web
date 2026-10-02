import React from 'react';
import { X, Trash2, ShoppingBag, Heart } from 'lucide-react';
import { Product } from '../types';
import { SafeImage } from './SafeImage';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onMoveToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onMoveToCart,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-[460px] bg-[#FDFDFD] flex flex-col shadow-2xl border-l border-[#E8E5E1]">
          {/* Header */}
          <div className="px-6 sm:px-8 py-6 border-b border-[#E8E5E1] flex items-center justify-between">
            <div className="flex items-baseline gap-3">
              <h2 className="font-serif text-2xl font-light tracking-wide text-[#1A1A1A] uppercase">
                Saved Pieces
              </h2>
              <span className="font-mono text-xs text-[#666666]">
                ({wishlistProducts.length})
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label="Close wishlist"
              className="p-2 -mr-2 text-[#1A1A1A] hover:opacity-60 transition-opacity"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          {/* List or Empty State */}
          <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 divide-y divide-[#E8E5E1]">
            {wishlistProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full border border-[#E8E5E1] flex items-center justify-center text-[#666666] mb-6">
                  <Heart className="w-6 h-6 stroke-[1.2]" />
                </div>
                <h3 className="font-serif text-2xl text-[#1A1A1A] mb-2 font-light">
                  Your wishlist is empty.
                </h3>
                <p className="text-sm text-[#666666] max-w-xs mb-8 font-light">
                  Save pieces to review their proportions, fabric composition, and availability.
                </p>
                <button
                  onClick={onClose}
                  className="bg-[#1A1A1A] text-[#FDFDFD] px-8 py-3.5 text-xs uppercase tracking-[0.22em] font-medium hover:bg-[#000000] transition-colors"
                >
                  Browse Storefront
                </button>
              </div>
            ) : (
              wishlistProducts.map((p) => (
                <div key={p.id} className="py-5 flex gap-4 first:pt-0">
                  <div
                    onClick={() => {
                      onClose();
                      onSelectProduct(p);
                    }}
                    className="w-20 h-26 shrink-0 overflow-hidden bg-[#F4F0EB] cursor-pointer"
                  >
                    <SafeImage
                      src={p.primaryImage}
                      alt={p.name}
                      fallbackText={p.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4
                          onClick={() => {
                            onClose();
                            onSelectProduct(p);
                          }}
                          className="font-serif text-base text-[#1A1A1A] font-normal cursor-pointer hover:underline"
                        >
                          {p.name}
                        </h4>
                        <button
                          onClick={() => onRemoveFromWishlist(p)}
                          aria-label={`Remove ${p.name} from wishlist`}
                          className="text-[#999999] hover:text-[#1A1A1A] transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] uppercase tracking-wider text-[#666666] mt-1">
                        {p.category} · {p.colorName}
                      </div>

                      <div className="font-mono text-xs font-medium text-[#1A1A1A] mt-2 tabular-nums">
                        ₹{new Intl.NumberFormat('en-IN').format(p.price)}
                      </div>
                    </div>

                    <div className="pt-3">
                      <button
                        onClick={() => onMoveToCart(p)}
                        className="w-full py-2 bg-[#1A1A1A] text-[#FDFDFD] text-[10px] uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 hover:bg-[#000000] transition-colors"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Move To Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { X, Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';
import { SafeImage } from './SafeImage';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
  onExploreCollection: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onExploreCollection,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const formattedSubtotal = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(subtotal);

  const freeShippingThreshold = 25000;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Slide-out Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-[460px] bg-[#FDFDFD] flex flex-col shadow-2xl border-l border-[#E8E5E1] animate-slideLeft">
          {/* Header */}
          <div className="px-6 sm:px-8 py-6 border-b border-[#E8E5E1] flex items-center justify-between">
            <div className="flex items-baseline gap-3">
              <h2 className="font-serif text-2xl font-light tracking-wide text-[#1A1A1A] uppercase">
                Your Bag
              </h2>
              <span className="font-mono text-xs text-[#666666]">
                ({items.reduce((acc, item) => acc + item.quantity, 0)})
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label="Close bag"
              className="p-2 -mr-2 text-[#1A1A1A] hover:opacity-60 transition-opacity"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          {/* Complimentary Shipping Progress */}
          {items.length > 0 && (
            <div className="px-6 sm:px-8 py-3 bg-[#F4F0EB]/60 border-b border-[#E8E5E1] text-[11px] text-[#666666]">
              <div className="flex justify-between items-center mb-1.5 font-medium">
                <span>
                  {isFreeShipping
                    ? '✓ Complimentary Global Express Shipping unlocked'
                    : `Add ₹${new Intl.NumberFormat('en-IN').format(
                        freeShippingThreshold - subtotal
                      )} for complimentary shipping`}
                </span>
                <span className="font-mono">{Math.round(progressToFreeShipping)}%</span>
              </div>
              <div className="w-full h-1 bg-[#E8E5E1] overflow-hidden">
                <div
                  className="h-full bg-[#1A1A1A] transition-all duration-500"
                  style={{ width: `${progressToFreeShipping}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Items List or Empty State */}
          <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 divide-y divide-[#E8E5E1]">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full border border-[#E8E5E1] flex items-center justify-center text-[#666666] mb-6">
                  <ShoppingBag className="w-6 h-6 stroke-[1.2]" />
                </div>
                <h3 className="font-serif text-2xl text-[#1A1A1A] mb-2 font-light">
                  Your bag is waiting.
                </h3>
                <p className="text-sm text-[#666666] max-w-xs mb-8 font-light">
                  Discover pieces made to stay. Considered silhouettes crafted with timeless intention.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onExploreCollection();
                  }}
                  className="bg-[#1A1A1A] text-[#FDFDFD] px-8 py-3.5 text-xs uppercase tracking-[0.22em] font-medium hover:bg-[#000000] transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="py-5 flex gap-4 first:pt-0">
                  <div className="w-20 h-26 shrink-0 overflow-hidden bg-[#F4F0EB]">
                    <SafeImage
                      src={item.image}
                      alt={item.name}
                      fallbackText={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-serif text-base text-[#1A1A1A] font-normal leading-snug">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          aria-label={`Remove ${item.name} from bag`}
                          className="text-[#999999] hover:text-[#1A1A1A] transition-colors p-1 -mr-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] uppercase tracking-wider text-[#666666] mt-1 flex items-center gap-2">
                        <span>Size: {item.size}</span>
                        <span>·</span>
                        <span>{item.color}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#E8E5E1]">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          disabled={item.quantity <= 1}
                          className="w-7 h-7 flex items-center justify-center text-[#1A1A1A] hover:bg-[#F4F0EB] disabled:opacity-30 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center font-mono text-xs text-[#1A1A1A]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#1A1A1A] hover:bg-[#F4F0EB] transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-mono text-sm text-[#1A1A1A] font-medium tabular-nums">
                        {new Intl.NumberFormat('en-IN', {
                          style: 'currency',
                          currency: 'INR',
                          maximumFractionDigits: 0,
                        }).format(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-6 sm:p-8 bg-[#FDFDFD] border-t border-[#E8E5E1] flex flex-col gap-4">
              <div className="flex justify-between items-baseline">
                <span className="text-xs uppercase tracking-[0.2em] text-[#666666]">
                  Subtotal
                </span>
                <span className="font-mono text-xl font-medium text-[#1A1A1A] tabular-nums">
                  {formattedSubtotal}
                </span>
              </div>

              <p className="text-[11px] text-[#666666] font-light">
                Taxes included. Duties and shipping calculated at checkout.
              </p>

              <button
                onClick={onProceedToCheckout}
                className="w-full py-4 bg-[#1A1A1A] text-[#FDFDFD] text-xs uppercase tracking-[0.22em] font-medium hover:bg-[#000000] flex items-center justify-center gap-3 transition-colors shadow-lg active:scale-[0.99]"
              >
                <span>Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onClose}
                className="w-full text-center text-xs uppercase tracking-[0.2em] text-[#666666] hover:text-[#1A1A1A] py-1 transition-colors hover-underline-animation"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

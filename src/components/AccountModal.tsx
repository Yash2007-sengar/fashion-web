import React from 'react';
import { X, User, Package, Heart, Shield, Bell } from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderCount: number;
  wishlistCount: number;
  onOpenWishlist: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  orderCount,
  wishlistCount,
  onOpenWishlist,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-8 animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#FDFDFD] border border-[#E8E5E1] shadow-2xl p-6 sm:p-10 flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close client portal"
          className="absolute top-6 right-6 p-1 text-[#1A1A1A] hover:opacity-60"
        >
          <X className="w-5 h-5 stroke-[1.5]" />
        </button>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-full bg-[#F4F0EB] border border-[#E8E5E1] flex items-center justify-center text-[#1A1A1A]">
            <User className="w-6 h-6 stroke-[1.2]" />
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#888888] block">
              Maison Member · VIP Tier
            </span>
            <h3 className="font-serif text-2xl text-[#1A1A1A] font-light">
              Eleanor Vance
            </h3>
            <span className="text-xs text-[#666666]">eleanor.vance@atelier.com</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="p-4 bg-[#F4F0EB]/60 border border-[#E8E5E1]">
            <span className="font-mono text-[10px] uppercase text-[#666666] block mb-1">
              Active Orders
            </span>
            <div className="font-mono text-2xl font-medium text-[#1A1A1A]">
              {orderCount}
            </div>
            <span className="text-[11px] text-[#888888]">Insured Courier</span>
          </div>

          <div
            onClick={() => {
              onClose();
              onOpenWishlist();
            }}
            className="p-4 bg-[#F4F0EB]/60 border border-[#E8E5E1] cursor-pointer hover:bg-[#F4F0EB] transition-colors"
          >
            <span className="font-mono text-[10px] uppercase text-[#666666] block mb-1">
              Saved Silhouettes
            </span>
            <div className="font-mono text-2xl font-medium text-[#1A1A1A]">
              {wishlistCount}
            </div>
            <span className="text-[11px] text-[#888888]">View Wishlist →</span>
          </div>
        </div>

        <div className="space-y-3 border-t border-[#E8E5E1] pt-6 text-xs uppercase tracking-wider text-[#1A1A1A]">
          <div className="flex items-center justify-between py-2 hover:opacity-70 cursor-pointer">
            <span className="flex items-center gap-2">
              <Package className="w-4 h-4" /> Order History & Invoices
            </span>
            <span className="font-mono text-[#888888]">Recent</span>
          </div>
          <div className="flex items-center justify-between py-2 hover:opacity-70 cursor-pointer">
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4" /> Bespoke Measurements Profile
            </span>
            <span className="font-mono text-[#888888]">Updated</span>
          </div>
          <div className="flex items-center justify-between py-2 hover:opacity-70 cursor-pointer">
            <span className="flex items-center gap-2">
              <Bell className="w-4 h-4" /> Private Releases & Invites
            </span>
            <span className="font-mono text-emerald-600">Active</span>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#E8E5E1] flex justify-between items-center text-xs text-[#888888]">
          <span>Client Concierge: concierge@atelierverite.com</span>
          <button
            onClick={onClose}
            className="text-[#1A1A1A] font-medium uppercase tracking-widest hover:underline"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

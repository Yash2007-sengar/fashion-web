import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Heart, User, Menu, X, PhoneCall } from 'lucide-react';
import { ActiveView } from '../types';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenWishlist: () => void;
  onOpenAccount: () => void;
  onOpenCall: () => void;
  activeView: ActiveView;
  onNavigate: (view: ActiveView, categoryFilter?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenSearch,
  onOpenWishlist,
  onOpenAccount,
  onOpenCall,
  activeView,
  onNavigate,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDarkHero = !isScrolled && activeView === 'home';

  const navLinks = [
    { label: 'New Arrivals', view: 'collection' as ActiveView, filter: 'all' },
    { label: 'Women', view: 'collection' as ActiveView, filter: 'Women' },
    { label: 'Men', view: 'collection' as ActiveView, filter: 'Men' },
    { label: 'Collections', view: 'collection' as ActiveView, filter: 'all' },
    { label: 'Lookbook', view: 'lookbook' as ActiveView },
    { label: 'About', view: 'story' as ActiveView },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#FDFDFD]/90 backdrop-blur-md border-b border-[#E8E5E1] py-4 text-[#1A1A1A] shadow-xs'
            : isDarkHero
            ? 'bg-transparent py-6 text-white'
            : 'bg-[#FDFDFD] py-5 text-[#1A1A1A] border-b border-[#E8E5E1]'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 flex items-center justify-between">
          {/* Mobile hamburger */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="p-1 -ml-1 transition-opacity hover:opacity-70 focus-visible:outline-hidden"
            >
              <Menu className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          {/* ZONE 1: BRAND LOGO */}
          <div className="flex-1 lg:flex-none text-center lg:text-left">
            <button
              onClick={() => {
                onNavigate('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="font-serif text-xl sm:text-2xl tracking-[0.22em] uppercase font-light focus-visible:outline-hidden inline-block"
            >
              ATELIER VÉRITÉ
            </button>
          </div>

          {/* ZONE 2: DESKTOP NAVIGATION (4-6 links, clean typography) */}
          <nav className="hidden lg:flex items-center gap-8 text-[12px] tracking-[0.18em] uppercase font-medium">
            {navLinks.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  onNavigate(item.view, item.filter);
                }}
                className={`relative py-1 transition-colors hover:opacity-100 ${
                  isDarkHero ? 'text-white/80 hover:text-white' : 'text-[#666666] hover:text-[#1A1A1A]'
                } ${
                  activeView === item.view ? (isDarkHero ? 'text-white font-semibold' : 'text-[#1A1A1A] font-semibold') : ''
                }`}
              >
                <span className="hover-underline-animation">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* ZONE 3: ACTIONS */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Direct Stylist Call */}
            <button
              onClick={onOpenCall}
              aria-label="Call Maison Concierge"
              title="Call Maison Concierge"
              className="relative p-1.5 transition-opacity hover:opacity-70 focus-visible:outline-hidden flex items-center gap-1.5 group"
            >
              <PhoneCall className="w-[17px] h-[17px] stroke-[1.5] text-emerald-500 group-hover:scale-110 transition-transform" />
              <span className="hidden xl:inline text-[11px] font-mono tracking-widest uppercase opacity-80">
                Call Concierge
              </span>
            </button>

            {/* Search */}
            <button
              onClick={onOpenSearch}
              aria-label="Search collection"
              className="p-1 transition-opacity hover:opacity-70 focus-visible:outline-hidden"
            >
              <Search className="w-[18px] h-[18px] stroke-[1.5]" />
            </button>

            {/* Account */}
            <button
              onClick={onOpenAccount}
              aria-label="User account"
              className="hidden sm:inline-block p-1 transition-opacity hover:opacity-70 focus-visible:outline-hidden"
            >
              <User className="w-[18px] h-[18px] stroke-[1.5]" />
            </button>

            {/* Wishlist */}
            <button
              onClick={onOpenWishlist}
              aria-label={`Wishlist with ${wishlistCount} items`}
              className="relative p-1 transition-opacity hover:opacity-70 focus-visible:outline-hidden"
            >
              <Heart className="w-[18px] h-[18px] stroke-[1.5]" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 text-[9px] w-4 h-4 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center font-mono">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart / Bag */}
            <button
              onClick={onOpenCart}
              aria-label={`Shopping bag with ${cartCount} items`}
              className="relative p-1 transition-opacity hover:opacity-70 focus-visible:outline-hidden flex items-center gap-1.5"
            >
              <ShoppingBag className="w-[18px] h-[18px] stroke-[1.5]" />
              <span className="text-[12px] font-mono tracking-tight font-medium">
                ({cartCount})
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* FULL-SCREEN MOBILE NAVIGATION DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#FDFDFD] flex flex-col justify-between p-8 animate-fadeIn lg:hidden">
          <div className="flex items-center justify-between border-b border-[#E8E5E1] pb-6">
            <span className="font-serif text-xl tracking-[0.2em] uppercase font-light">
              ATELIER VÉRITÉ
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              className="p-2 -mr-2 text-[#1A1A1A] hover:opacity-70"
            >
              <X className="w-6 h-6 stroke-[1.5]" />
            </button>
          </div>

          <div className="flex flex-col gap-6 py-10">
            {navLinks.map((item, idx) => (
              <button
                key={item.label}
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate(item.view, item.filter);
                }}
                className="text-left font-serif text-3xl tracking-wide text-[#1A1A1A] hover:text-[#666666] transition-colors flex items-baseline justify-between"
              >
                <span>{item.label}</span>
                <span className="font-mono text-xs text-[#999999] tracking-widest">
                  0{idx + 1}
                </span>
              </button>
            ))}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('try-on');
              }}
              className="text-left font-serif text-3xl tracking-wide text-[#1A1A1A] hover:text-[#666666] transition-colors flex items-baseline justify-between"
            >
              <span>Virtual Try-On</span>
              <span className="font-mono text-xs text-[#999999] tracking-widest">
                AR
              </span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCall();
              }}
              className="text-left font-serif text-3xl tracking-wide text-[#1A1A1A] hover:text-[#666666] transition-colors flex items-baseline justify-between pt-2 border-t border-[#E8E5E1]"
            >
              <span className="flex items-center gap-3">
                <PhoneCall className="w-5 h-5 text-emerald-600 inline" />
                <span>Call Concierge</span>
              </span>
              <span className="font-mono text-xs text-emerald-600 tracking-widest">
                LIVE
              </span>
            </button>
          </div>

          <div className="border-t border-[#E8E5E1] pt-6 flex flex-col gap-4 text-xs text-[#666666] uppercase tracking-widest">
            <div className="flex justify-between items-center">
              <span>Client Services</span>
              <span>concierge@atelierverite.com</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Currency</span>
              <span>INR (₹) / Global Delivery</span>
            </div>
            <div className="pt-2 text-[10px] text-[#999999]">
              © 2026 Atelier Vérité. All rights reserved.
            </div>
          </div>
        </div>
      )}
    </>
  );
};

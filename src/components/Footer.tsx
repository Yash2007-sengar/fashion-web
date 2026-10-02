import React from 'react';
import { ActiveView } from '../types';

interface FooterProps {
  onNavigate: (view: ActiveView, category?: string) => void;
  onOpenSizeGuide?: () => void;
  onOpenCall?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenCall }) => {
  return (
    <footer className="w-full bg-[#FDFDFD] text-[#1A1A1A] border-t border-[#E8E5E1]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 sm:gap-16 pb-16 border-b border-[#E8E5E1]">
          {/* LEFT: Large brand logo & statement */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl tracking-[0.2em] uppercase font-light text-[#1A1A1A] mb-4">
                ATELIER VÉRITÉ
              </h2>
              <p className="text-xs sm:text-sm text-[#666666] font-light max-w-sm leading-relaxed mb-6">
                Maison de haute confection contemporaine. Modern silhouettes engineered with timeless architectural intent.
              </p>
            </div>

            <div className="text-[11px] font-mono uppercase tracking-widest text-[#999999]">
              Milan · Paris · Biella
            </div>
          </div>

          {/* RIGHT / GRID: SHOP, ABOUT, HELP, FOLLOW */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {/* SHOP */}
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#1A1A1A] font-semibold block mb-5">
                Shop
              </span>
              <ul className="space-y-3 text-xs uppercase tracking-wider text-[#666666]">
                <li>
                  <button
                    onClick={() => onNavigate('collection', 'all')}
                    className="hover:text-[#1A1A1A] transition-colors"
                  >
                    New Arrivals
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('collection', 'Women')}
                    className="hover:text-[#1A1A1A] transition-colors"
                  >
                    Women
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('collection', 'Men')}
                    className="hover:text-[#1A1A1A] transition-colors"
                  >
                    Men
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('collection', 'Outerwear')}
                    className="hover:text-[#1A1A1A] transition-colors"
                  >
                    Outerwear
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('collection', 'Tops')}
                    className="hover:text-[#1A1A1A] transition-colors"
                  >
                    Tops & Knitwear
                  </button>
                </li>
              </ul>
            </div>

            {/* ABOUT */}
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#1A1A1A] font-semibold block mb-5">
                About
              </span>
              <ul className="space-y-3 text-xs uppercase tracking-wider text-[#666666]">
                <li>
                  <button
                    onClick={() => onNavigate('story')}
                    className="hover:text-[#1A1A1A] transition-colors"
                  >
                    Our Story
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('lookbook')}
                    className="hover:text-[#1A1A1A] transition-colors"
                  >
                    Lookbook
                  </button>
                </li>
                <li>
                  <span className="text-[#888888] cursor-default">Sustainability</span>
                </li>
                <li>
                  <span className="text-[#888888] cursor-default">Atelier Biella</span>
                </li>
                <li>
                  <span className="text-[#888888] cursor-default">Contact</span>
                </li>
              </ul>
            </div>

            {/* HELP */}
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#1A1A1A] font-semibold block mb-5">
                Help
              </span>
              <ul className="space-y-3 text-xs uppercase tracking-wider text-[#666666]">
                <li>
                  <span className="text-[#888888] cursor-default">Complimentary Shipping</span>
                </li>
                <li>
                  <span className="text-[#888888] cursor-default">Returns & Exchanges</span>
                </li>
                <li>
                  <span className="text-[#888888] cursor-default">Size Guide</span>
                </li>
                <li>
                  <span className="text-[#888888] cursor-default">Care Consultation</span>
                </li>
                <li>
                  <button
                    onClick={onOpenCall}
                    className="hover:text-[#1A1A1A] transition-colors flex items-center gap-1.5"
                  >
                    <span>Client Concierge (Live Call)</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* FOLLOW */}
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#1A1A1A] font-semibold block mb-5">
                Follow
              </span>
              <ul className="space-y-3 text-xs uppercase tracking-wider text-[#666666]">
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#1A1A1A] transition-colors"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://pinterest.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#1A1A1A] transition-colors"
                  >
                    Pinterest
                  </a>
                </li>
                <li>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#1A1A1A] transition-colors"
                  >
                    YouTube
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* BOTTOM METADATA & COPYRIGHT */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#888888] uppercase tracking-widest gap-4">
          <div>
            © 2026 ATELIER VÉRITÉ. All Rights Reserved.
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-[#1A1A1A] cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-[#1A1A1A] cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-[#1A1A1A] cursor-pointer transition-colors">Shipping Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

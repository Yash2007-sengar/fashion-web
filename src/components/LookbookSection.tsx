import React, { useState } from 'react';
import { X, ArrowRight, Eye } from 'lucide-react';
import { LOOKBOOK_ITEMS } from '../data/lookbook';
import { LookbookItem, Product } from '../types';
import { SafeImage } from './SafeImage';

interface LookbookSectionProps {
  onSelectProductById: (productId: string) => void;
  allProducts: Product[];
}

export const LookbookSection: React.FC<LookbookSectionProps> = ({
  onSelectProductById,
}) => {
  const [activeLightboxLook, setActiveLightboxLook] = useState<LookbookItem | null>(null);

  return (
    <section id="lookbook" className="w-full py-20 sm:py-32 bg-[#FDFDFD] border-t border-[#E8E5E1]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-24 gap-6">
          <div>
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-[#666666] block mb-3">
              Editorial Portfolio · Volume IX
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#1A1A1A] uppercase">
              The Lookbook
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-sm text-[#666666] font-light leading-relaxed">
              An intimate visual study in proportion, negative space, and architectural drape. Photographed on location with natural light.
            </p>
          </div>
        </div>

        {/* Asymmetrical Magazine Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 items-start">
          {/* Row 1: Portrait left (col-span-5), Landscape right (col-span-7) */}
          <div
            onClick={() => setActiveLightboxLook(LOOKBOOK_ITEMS[0])}
            className="md:col-span-5 cursor-pointer group flex flex-col gap-3"
            data-cursor-view
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F4F0EB]">
              <SafeImage
                src={LOOKBOOK_ITEMS[0].image}
                alt={LOOKBOOK_ITEMS[0].title}
                fallbackText={LOOKBOOK_ITEMS[0].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="bg-[#FDFDFD] text-[#1A1A1A] px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] font-medium flex items-center gap-2">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Look</span>
                </span>
              </div>
            </div>
            <div className="flex justify-between items-baseline pt-2">
              <span className="font-serif text-lg text-[#1A1A1A]">{LOOKBOOK_ITEMS[0].title}</span>
              <span className="font-mono text-xs text-[#888888]">Fig. 01</span>
            </div>
            <p className="text-xs text-[#666666] font-light">{LOOKBOOK_ITEMS[0].caption}</p>
          </div>

          <div
            onClick={() => setActiveLightboxLook(LOOKBOOK_ITEMS[1])}
            className="md:col-span-7 cursor-pointer group flex flex-col gap-3 md:mt-16"
            data-cursor-view
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F4F0EB]">
              <SafeImage
                src={LOOKBOOK_ITEMS[1].image}
                alt={LOOKBOOK_ITEMS[1].title}
                fallbackText={LOOKBOOK_ITEMS[1].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="bg-[#FDFDFD] text-[#1A1A1A] px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] font-medium flex items-center gap-2">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Look</span>
                </span>
              </div>
            </div>
            <div className="flex justify-between items-baseline pt-2">
              <span className="font-serif text-lg text-[#1A1A1A]">{LOOKBOOK_ITEMS[1].title}</span>
              <span className="font-mono text-xs text-[#888888]">Fig. 02</span>
            </div>
            <p className="text-xs text-[#666666] font-light">{LOOKBOOK_ITEMS[1].caption}</p>
          </div>

          {/* Row 2: Editorial Quote / Negative Space block (col-span-4) + Portrait (col-span-4) + Detail Portrait (col-span-4) */}
          <div className="md:col-span-4 p-8 sm:p-12 bg-[#F4F0EB]/60 flex flex-col justify-center min-h-[380px] border border-[#E8E5E1]">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#888888] mb-4">
              Stylist Note
            </span>
            <blockquote className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] leading-snug italic mb-6">
              “True luxury never shouts. It lingers in the weight of virgin wool and the precision of the seam.”
            </blockquote>
            <span className="text-[11px] uppercase tracking-widest text-[#666666]">
              Camille Laurent · Creative Director
            </span>
          </div>

          <div
            onClick={() => setActiveLightboxLook(LOOKBOOK_ITEMS[2])}
            className="md:col-span-4 cursor-pointer group flex flex-col gap-3"
            data-cursor-view
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F4F0EB]">
              <SafeImage
                src={LOOKBOOK_ITEMS[2].image}
                alt={LOOKBOOK_ITEMS[2].title}
                fallbackText={LOOKBOOK_ITEMS[2].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="bg-[#FDFDFD] text-[#1A1A1A] px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] font-medium flex items-center gap-2">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Look</span>
                </span>
              </div>
            </div>
            <div className="flex justify-between items-baseline pt-2">
              <span className="font-serif text-lg text-[#1A1A1A]">{LOOKBOOK_ITEMS[2].title}</span>
              <span className="font-mono text-xs text-[#888888]">Fig. 03</span>
            </div>
          </div>

          <div
            onClick={() => setActiveLightboxLook(LOOKBOOK_ITEMS[3])}
            className="md:col-span-4 cursor-pointer group flex flex-col gap-3 md:mt-12"
            data-cursor-view
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F4F0EB]">
              <SafeImage
                src={LOOKBOOK_ITEMS[3].image}
                alt={LOOKBOOK_ITEMS[3].title}
                fallbackText={LOOKBOOK_ITEMS[3].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="bg-[#FDFDFD] text-[#1A1A1A] px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] font-medium flex items-center gap-2">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Look</span>
                </span>
              </div>
            </div>
            <div className="flex justify-between items-baseline pt-2">
              <span className="font-serif text-lg text-[#1A1A1A]">{LOOKBOOK_ITEMS[3].title}</span>
              <span className="font-mono text-xs text-[#888888]">Fig. 04</span>
            </div>
          </div>
        </div>
      </div>

      {/* FULL-SCREEN EDITORIAL LIGHTBOX WITH PRODUCT HOTSPOTS */}
      {activeLightboxLook && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-10 animate-fadeIn">
          {/* Close button */}
          <button
            onClick={() => setActiveLightboxLook(null)}
            aria-label="Close lookbook inspect"
            className="absolute top-6 right-6 z-40 text-white/80 hover:text-white p-2"
          >
            <X className="w-8 h-8 stroke-[1.2]" />
          </button>

          <div className="relative max-w-5xl w-full h-[88vh] flex flex-col md:flex-row bg-[#111111] overflow-hidden border border-white/10">
            {/* Image Canvas with Hotspots */}
            <div className="relative flex-1 h-full bg-black/40 overflow-hidden">
              <SafeImage
                src={activeLightboxLook.image}
                alt={activeLightboxLook.title}
                fallbackText={activeLightboxLook.title}
                className="w-full h-full object-contain md:object-cover"
              />

              {/* Interactive Hotspots */}
              {activeLightboxLook.hotspots.map((hs, i) => (
                <div
                  key={i}
                  style={{ top: `${hs.y}%`, left: `${hs.x}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group/hotspot z-30"
                >
                  {/* Pulsing indicator button */}
                  <button
                    onClick={() => {
                      setActiveLightboxLook(null);
                      onSelectProductById(hs.productId);
                    }}
                    className="relative w-8 h-8 rounded-full bg-white/90 text-[#1A1A1A] flex items-center justify-center shadow-2xl transition-transform group-hover/hotspot:scale-125"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A]" />
                    <span className="absolute inset-0 rounded-full bg-white/40 animate-ping pointer-events-none" />
                  </button>

                  {/* Tooltip Card */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-10 w-48 bg-[#FDFDFD] text-[#1A1A1A] p-3 shadow-2xl border border-[#E8E5E1] opacity-0 pointer-events-none group-hover/hotspot:opacity-100 group-hover/hotspot:pointer-events-auto transition-all duration-200">
                    <span className="text-[9px] uppercase tracking-widest text-[#666666] block">
                      Featured Piece
                    </span>
                    <h5 className="font-serif text-sm font-medium leading-tight my-1">
                      {hs.label}
                    </h5>
                    <div className="flex justify-between items-center pt-1 border-t border-[#E8E5E1] mt-2">
                      <span className="font-mono text-xs font-semibold">
                        ₹{new Intl.NumberFormat('en-IN').format(hs.price)}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-[#1A1A1A] font-semibold underline">
                        Shop →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Information Panel */}
            <div className="w-full md:w-80 bg-[#1A1A1A] text-white p-6 sm:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/50 block mb-3">
                  {activeLightboxLook.season}
                </span>
                <h3 className="font-serif text-2xl font-light mb-4">
                  {activeLightboxLook.title}
                </h3>
                <p className="text-xs text-white/70 font-light leading-relaxed mb-6">
                  {activeLightboxLook.caption}
                </p>

                <div className="border-t border-white/15 pt-4">
                  <span className="text-[10px] uppercase tracking-widest text-white/50 block mb-3">
                    Items Styled in this Look
                  </span>
                  <div className="flex flex-col gap-3">
                    {activeLightboxLook.hotspots.map((hs, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          setActiveLightboxLook(null);
                          onSelectProductById(hs.productId);
                        }}
                        className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer flex items-center justify-between"
                      >
                        <div>
                          <div className="text-xs font-serif">{hs.label}</div>
                          <div className="font-mono text-[11px] text-white/60">
                            ₹{new Intl.NumberFormat('en-IN').format(hs.price)}
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-white/70" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => {
                    const firstId = activeLightboxLook.hotspots[0]?.productId;
                    setActiveLightboxLook(null);
                    if (firstId) onSelectProductById(firstId);
                  }}
                  className="w-full py-3.5 bg-white text-[#1A1A1A] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#D8CBBE] transition-colors text-center"
                >
                  Shop This Look
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

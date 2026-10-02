import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SafeImage } from './SafeImage';

interface CategoryBlocksProps {
  onSelectCategory: (category: string) => void;
}

export const CategoryBlocks: React.FC<CategoryBlocksProps> = ({ onSelectCategory }) => {
  return (
    <div className="w-full bg-[#FDFDFD] flex flex-col">
      {/* 1. NEW ARRIVALS — Full-width Cinematic Image */}
      <section className="relative w-full h-[75vh] min-h-[500px] flex items-center justify-center overflow-hidden border-t border-[#E8E5E1] group">
        <div className="absolute inset-0 w-full h-full">
          <SafeImage
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=2200&q=85"
            alt="New Arrivals Campaign"
            fallbackText="New Arrivals Editorial"
            className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.05] transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 text-center text-white px-6 max-w-2xl flex flex-col items-center">
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-white/80 mb-4 block">
            Chapter 01 · Autumn / Winter
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-wide uppercase mb-4">
            New Arrivals
          </h2>
          <p className="text-sm sm:text-base text-white/90 font-light tracking-wide mb-8 max-w-md">
            Discover the latest expression of the collection. Architectural proportions cut from pure Biella wool.
          </p>
          <button
            onClick={() => onSelectCategory('all')}
            className="group/btn inline-flex items-center gap-3 bg-[#FDFDFD] text-[#1A1A1A] px-8 py-4 text-xs uppercase tracking-[0.22em] font-medium hover:bg-[#D8CBBE] transition-colors duration-300"
          >
            <span>Shop New Arrivals</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </button>
        </div>
      </section>

      {/* 2. ESSENTIALS — Asymmetric Split: Image Left / Text Right */}
      <section className="w-full border-t border-[#E8E5E1] grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        {/* Left Image */}
        <div className="lg:col-span-7 relative h-[450px] lg:h-auto overflow-hidden group">
          <SafeImage
            src="https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=1600&q=85"
            alt="The Essentials Collection"
            fallbackText="Essentials Collection"
            className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute bottom-6 left-6 font-mono text-[10px] uppercase tracking-widest text-[#1A1A1A] bg-[#FDFDFD]/90 backdrop-blur-xs px-3 py-1">
            Uniform Monolith · 100% Giza Cotton
          </div>
        </div>

        {/* Right Editorial Copy */}
        <div className="lg:col-span-5 p-8 sm:p-14 lg:p-16 flex flex-col justify-between bg-[#F4F0EB]/60">
          <div>
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-[#666666] block mb-6">
              Permanent Wardrobe · Chapter 02
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-[#1A1A1A] uppercase mb-4">
              Essentials
            </h2>
            <div className="w-8 h-[1px] bg-[#1A1A1A] mb-6" />
            <p className="text-lg sm:text-xl text-[#1A1A1A] font-serif italic mb-4">
              “Everyday pieces, refined.”
            </p>
            <p className="text-sm text-[#666666] leading-relaxed font-light mb-8 max-w-md">
              The permanent foundation of personal style. Reduced to pure form, our poplin button-downs and fresco trousers withstand trends through tactile integrity and engineered silhouettes.
            </p>
          </div>

          <div className="pt-6 border-t border-[#E8E5E1]">
            <button
              onClick={() => onSelectCategory('Tops')}
              className="group flex items-center gap-3 text-xs uppercase tracking-[0.22em] font-medium text-[#1A1A1A] hover:text-[#666666] transition-colors py-1 hover-underline-animation"
            >
              <span>Explore Essentials</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. OUTERWEAR — Asymmetric Split: Text Left / Image Right */}
      <section className="w-full border-t border-b border-[#E8E5E1] grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        {/* Left Editorial Copy */}
        <div className="order-2 lg:order-1 lg:col-span-5 p-8 sm:p-14 lg:p-16 flex flex-col justify-between bg-[#FDFDFD]">
          <div>
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-[#666666] block mb-6">
              Structural Forms · Chapter 03
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-[#1A1A1A] uppercase mb-4">
              Outerwear
            </h2>
            <div className="w-8 h-[1px] bg-[#1A1A1A] mb-6" />
            <p className="text-lg sm:text-xl text-[#1A1A1A] font-serif italic mb-4">
              “Structure. Texture. Presence.”
            </p>
            <p className="text-sm text-[#666666] leading-relaxed font-light mb-8 max-w-md">
              Heirloom-grade overcoats, vegetable-tanned nappa leather jackets, and virgin wool wraps designed to protect against the elements while asserting an unmistakable quiet command.
            </p>
          </div>

          <div className="pt-6 border-t border-[#E8E5E1]">
            <button
              onClick={() => onSelectCategory('Outerwear')}
              className="group flex items-center gap-3 text-xs uppercase tracking-[0.22em] font-medium text-[#1A1A1A] hover:text-[#666666] transition-colors py-1 hover-underline-animation"
            >
              <span>Shop Outerwear</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="order-1 lg:order-2 lg:col-span-7 relative h-[450px] lg:h-auto overflow-hidden group">
          <SafeImage
            src="https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=1600&q=85"
            alt="Outerwear Editorial"
            fallbackText="Outerwear Editorial"
            className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute top-6 right-6 font-mono text-[10px] uppercase tracking-widest text-[#1A1A1A] bg-[#FDFDFD]/90 backdrop-blur-xs px-3 py-1">
            Hand-Finished Biella Wool & Calfskin
          </div>
        </div>
      </section>
    </div>
  );
};

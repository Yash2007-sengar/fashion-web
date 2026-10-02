import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SafeImage } from './SafeImage';

interface BrandStoryProps {
  onDiscoverMore?: () => void;
}

export const BrandStory: React.FC<BrandStoryProps> = ({ onDiscoverMore }) => {
  return (
    <section id="story" className="w-full py-24 sm:py-36 bg-[#FDFDFD] border-t border-[#E8E5E1]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-[#666666] mb-6">
              House Heritage & Philosophy
            </span>

            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#1A1A1A] uppercase leading-[0.98] mb-8 text-balance">
              Crafted For The <br />
              <span className="italic font-normal">Unordinary.</span>
            </h2>

            <div className="w-12 h-[1px] bg-[#1A1A1A] mb-8" />

            <div className="space-y-6 text-[#666666] font-light text-base sm:text-lg leading-relaxed max-w-xl">
              <p>
                Atelier Vérité was founded on a singular conviction: that contemporary luxury should possess tectonic structure, uncompromising tactility, and zero decorative excess.
              </p>
              <p>
                Every garment begins with yarn selection in historic northern Italian mills, where raw cashmere, virgin wool, and long-staple organic flax are spun exclusively for our numbered editions.
              </p>
              <p className="text-sm sm:text-base text-[#1A1A1A] font-serif italic">
                “We do not follow seasonal trend cycles. We construct permanent garments that mold to the bearer’s posture over a lifetime.”
              </p>
            </div>

            <div className="pt-10">
              <button
                onClick={onDiscoverMore}
                className="group flex items-center gap-3 text-xs uppercase tracking-[0.22em] font-medium text-[#1A1A1A] hover:text-[#666666] transition-colors py-1 hover-underline-animation"
              >
                <span>Discover Our Story</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
              </button>
            </div>
          </div>

          {/* Right Visual Column (Cinematic Atelier Image with Inset Detail) */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F4F0EB]">
              <SafeImage
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=85"
                alt="Atelier Craftsmanship"
                fallbackText="Atelier Story"
                className="w-full h-full object-cover filter contrast-[1.04]"
              />
              <div className="absolute inset-0 bg-radial-at-c from-transparent to-black/20 pointer-events-none" />
            </div>

            {/* Overlapping Detail Frame */}
            <div className="hidden sm:block absolute -bottom-10 -left-10 w-52 sm:w-64 aspect-[3/4] bg-[#FDFDFD] p-3 shadow-2xl border border-[#E8E5E1]">
              <div className="w-full h-full overflow-hidden bg-[#E8E5E1] relative">
                <SafeImage
                  src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=85"
                  alt="Tailoring Handwork Detail"
                  fallbackText="Hand Stitching Detail"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="block mt-2 font-mono text-[9px] uppercase tracking-widest text-[#888888] text-center">
                Fig. 08 · Hand-Stitched Pick Lapel
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

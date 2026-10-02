import React from 'react';

export const BrandIntro: React.FC = () => {
  return (
    <section id="brand-intro" className="w-full py-28 sm:py-36 md:py-44 px-6 sm:px-12 bg-[#FDFDFD] text-[#1A1A1A]">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Subtle Brand Tag */}
        <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#666666] mb-8">
          Maison Manifeste · N° 09
        </span>

        {/* Large Centered Statement */}
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[-0.01em] text-[#1A1A1A] leading-[1.12] mb-8 text-balance max-w-3xl">
          Designed for those who <br />
          <span className="italic font-normal">move differently.</span>
        </h2>

        <div className="w-12 h-[1px] bg-[#D8CBBE] my-2 mb-8" />

        {/* Sub-text */}
        <p className="text-base sm:text-lg md:text-xl text-[#666666] font-light max-w-2xl leading-relaxed tracking-wide">
          We create considered pieces where contemporary silhouettes meet timeless craftsmanship.
          Each garment is conceived in our Milan studio and brought to life by master artisans across Biella and Lyon.
        </p>

        {/* Editorial detail chips - unboxed per Zero-Pill discipline */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-[11px] uppercase tracking-[0.2em] text-[#999999]">
          <span>Architectural Cut</span>
          <span aria-hidden="true">·</span>
          <span>Zero Synthetic Blends</span>
          <span aria-hidden="true">·</span>
          <span>Numbered Editions</span>
        </div>
      </div>
    </section>
  );
};

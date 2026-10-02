import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface HorizontalShowcaseProps {
  products: Product[];
  wishlistIds: Set<string>;
  onToggleWishlist: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product, size: string) => void;
  onViewAll: () => void;
}

export const HorizontalShowcase: React.FC<HorizontalShowcaseProps> = ({
  products,
  wishlistIds,
  onToggleWishlist,
  onSelectProduct,
  onQuickAdd,
  onViewAll,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const checkScroll = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [products]);

  const scrollByAmount = (amount: number) => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  // Drag to scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeftState(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    containerRef.current.scrollLeft = scrollLeftState - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  return (
    <section className="w-full py-16 sm:py-24 bg-[#FDFDFD] border-t border-[#E8E5E1]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 mb-8 sm:mb-12 flex items-end justify-between">
        <div>
          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-[#666666] block mb-2">
            Curated Selection · 01–06
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#1A1A1A] uppercase">
            New Arrivals
          </h2>
        </div>

        {/* View All & Arrow Navigation */}
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scrollByAmount(-400)}
              disabled={!canScrollLeft}
              aria-label="Scroll products left"
              className="w-10 h-10 border border-[#E8E5E1] flex items-center justify-center text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollByAmount(400)}
              disabled={!canScrollRight}
              aria-label="Scroll products right"
              className="w-10 h-10 border border-[#E8E5E1] flex items-center justify-center text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onViewAll}
            className="group flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#1A1A1A] hover:text-[#666666] transition-colors py-1 hover-underline-animation"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Horizontal Draggable/Scrollable Product Row */}
      <div
        ref={containerRef}
        onScroll={checkScroll}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        className={`w-full overflow-x-auto no-scrollbar scroll-smooth px-6 sm:px-12 flex gap-6 sm:gap-8 pb-8 ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        {products.map((product, idx) => (
          <div
            key={product.id}
            className="w-[280px] sm:w-[340px] md:w-[380px] shrink-0"
          >
            <ProductCard
              product={product}
              index={idx + 1}
              total={products.length}
              isWishlisted={wishlistIds.has(product.id)}
              onToggleWishlist={onToggleWishlist}
              onSelectProduct={onSelectProduct}
              onQuickAdd={onQuickAdd}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

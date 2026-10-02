import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, ChevronDown, Grid3X3, LayoutGrid, X } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface CollectionPageProps {
  products: Product[];
  initialCategory?: string;
  wishlistIds: Set<string>;
  onToggleWishlist: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product, size: string) => void;
}

export const CollectionPage: React.FC<CollectionPageProps> = ({
  products,
  initialCategory = 'all',
  wishlistIds,
  onToggleWishlist,
  onSelectProduct,
  onQuickAdd,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [gridCols, setGridCols] = useState<3 | 4>(4);

  // Sync if initialCategory prop changes
  React.useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const categories = ['all', 'Outerwear', 'Tops', 'Trousers', 'Knitwear'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', '30', '32', '34'];
  const colors = [
    { name: 'Noir', hex: '#141414' },
    { name: 'Alabaster', hex: '#F6F5F2' },
    { name: 'Espresso', hex: '#38332E' },
    { name: 'Sand', hex: '#D8CBBE' },
    { name: 'Camel', hex: '#C5A880' },
  ];

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedCategory !== 'all') {
          if (selectedCategory === 'Women' || selectedCategory === 'Men') {
            // Curated luxury line
            return true;
          }
          if (p.category !== selectedCategory) return false;
        }
        if (selectedSize && !p.sizes.includes(selectedSize)) return false;
        if (selectedColor && !p.colorName.toLowerCase().includes(selectedColor.toLowerCase())) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        return 0; // featured default
      });
  }, [products, selectedCategory, selectedSize, selectedColor, sortBy]);

  const activeFiltersCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedSize ? 1 : 0) +
    (selectedColor ? 1 : 0);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedSize(null);
    setSelectedColor(null);
    setSortBy('featured');
  };

  return (
    <div className="w-full pt-28 sm:pt-36 pb-24 bg-[#FDFDFD]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12">
        {/* Editorial Collection Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E8E5E1] pb-10 mb-8 gap-6">
          <div>
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-[#666666] block mb-2">
              Autumn / Winter Archive
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-tight text-[#1A1A1A] uppercase">
              {selectedCategory === 'all'
                ? 'Full Collection'
                : `${selectedCategory} Collection`}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#666666] font-light max-w-md leading-relaxed">
            Constructed silhouettes cut from pure virgin wool, Giza cotton, and Mongolian cashmere. Designed for effortless architectural elegance.
          </p>
        </div>

        {/* Filter & Sort Controls Bar */}
        <div className="flex flex-wrap items-center justify-between py-4 border-b border-[#E8E5E1] gap-4 mb-10 text-xs uppercase tracking-wider">
          {/* Filter Trigger & Categories */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setFilterDrawerOpen(!filterDrawerOpen)}
              className="flex items-center gap-2 font-medium text-[#1A1A1A] hover:text-[#666666] transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filter {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
            </button>

            {/* Category Quick Tabs (Zero-Pill Discipline) */}
            <div className="hidden md:flex items-center gap-6 text-[#666666]">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`hover:text-[#1A1A1A] transition-colors py-1 ${
                    selectedCategory === cat ? 'text-[#1A1A1A] font-semibold border-b border-[#1A1A1A]' : ''
                  }`}
                >
                  {cat === 'all' ? 'All Pieces' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Right Controls: Sort & Grid Switcher */}
          <div className="flex items-center gap-6">
            {/* Sort Select */}
            <div className="flex items-center gap-2">
              <span className="text-[#888888] hidden sm:inline">Sort:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  aria-label="Sort products"
                  className="appearance-none bg-transparent pr-6 text-xs uppercase tracking-wider font-medium text-[#1A1A1A] cursor-pointer outline-hidden"
                >
                  <option value="featured">Featured Editions</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest Releases</option>
                </select>
                <ChevronDown className="w-3 h-3 text-[#1A1A1A] absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Desktop Grid Switcher */}
            <div className="hidden lg:flex items-center gap-1 border-l border-[#E8E5E1] pl-6 text-[#666666]">
              <button
                onClick={() => setGridCols(3)}
                aria-label="3 columns grid"
                className={`p-1 hover:text-[#1A1A1A] ${gridCols === 3 ? 'text-[#1A1A1A]' : ''}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridCols(4)}
                aria-label="4 columns grid"
                className={`p-1 hover:text-[#1A1A1A] ${gridCols === 4 ? 'text-[#1A1A1A]' : ''}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Expandable Filter Drawer Panel */}
        {filterDrawerOpen && (
          <div className="p-6 sm:p-8 bg-[#F4F0EB]/60 border border-[#E8E5E1] mb-12 animate-fadeIn">
            <div className="flex justify-between items-center pb-4 border-b border-[#E8E5E1] mb-6">
              <span className="font-serif text-lg text-[#1A1A1A]">Refine Selection</span>
              <button
                onClick={resetFilters}
                className="text-xs uppercase tracking-widest text-[#666666] hover:text-[#1A1A1A] underline"
              >
                Reset All Filters
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {/* Category */}
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#666666] block mb-3">
                  Category
                </span>
                <div className="flex flex-wrap gap-2">
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedCategory(c)}
                      className={`px-3 py-1.5 text-xs uppercase tracking-wider border transition-colors ${
                        selectedCategory === c
                          ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white'
                          : 'border-[#E8E5E1] bg-white text-[#1A1A1A]'
                      }`}
                    >
                      {c === 'all' ? 'All' : c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#666666] block mb-3">
                  Size
                </span>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(selectedSize === s ? null : s)}
                      className={`w-9 h-9 font-mono text-xs border transition-colors flex items-center justify-center ${
                        selectedSize === s
                          ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white'
                          : 'border-[#E8E5E1] bg-white text-[#1A1A1A]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#666666] block mb-3">
                  Palette
                </span>
                <div className="flex flex-wrap gap-2">
                  {colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(selectedColor === c.name ? null : c.name)}
                      className={`px-3 py-1.5 text-xs border flex items-center gap-2 transition-colors ${
                        selectedColor === c.name
                          ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white'
                          : 'border-[#E8E5E1] bg-white text-[#1A1A1A]'
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-black/20"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Product Grid: 4-col desktop (or 3-col), 2-col mobile */}
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center">
            <h3 className="font-serif text-2xl text-[#1A1A1A] mb-3">
              No pieces match your chosen filters.
            </h3>
            <button
              onClick={resetFilters}
              className="text-xs uppercase tracking-widest text-[#1A1A1A] underline font-medium"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            className={`grid grid-cols-2 ${
              gridCols === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
            } gap-6 sm:gap-8`}
          >
            {filteredProducts.map((p, idx) => (
              <ProductCard
                key={p.id}
                product={p}
                index={idx + 1}
                total={filteredProducts.length}
                isWishlisted={wishlistIds.has(p.id)}
                onToggleWishlist={onToggleWishlist}
                onSelectProduct={onSelectProduct}
                onQuickAdd={onQuickAdd}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

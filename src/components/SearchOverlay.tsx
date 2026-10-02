import React, { useState, useEffect, useRef } from 'react';
import { X, Search as SearchIcon, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { SafeImage } from './SafeImage';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onSelectCategory: (category: string) => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onSelectCategory,
}) => {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Wool Coat',
    'Poplin Shirt',
    'Cashmere',
    'Trousers',
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const popularSearches = ['Atelier Coat', 'Giza Cotton', 'Leather Jacket', 'Pleated Trousers', 'Cashmere Knit'];
  const categories = ['Outerwear', 'Tops', 'Trousers', 'Knitwear'];

  const filteredProducts = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.colorName.toLowerCase().includes(query.toLowerCase()) ||
          p.composition.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSearchSubmit = (searchTerm: string) => {
    setQuery(searchTerm);
    if (!recentSearches.includes(searchTerm)) {
      setRecentSearches([searchTerm, ...recentSearches.slice(0, 3)]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#FDFDFD] flex flex-col animate-fadeIn">
      {/* Search Header */}
      <div className="max-w-[1440px] mx-auto w-full px-6 sm:px-12 py-6 flex items-center justify-between border-b border-[#E8E5E1]">
        <span className="font-serif text-xl tracking-[0.2em] uppercase font-light">
          ATELIER VÉRITÉ
        </span>
        <button
          onClick={onClose}
          aria-label="Close search"
          className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#1A1A1A] hover:opacity-70 transition-opacity"
        >
          <span>Close (ESC)</span>
          <X className="w-5 h-5 stroke-[1.5]" />
        </button>
      </div>

      {/* Main Search Input Area */}
      <div className="max-w-4xl mx-auto w-full px-6 sm:px-12 pt-12 sm:pt-16 pb-8">
        <div className="relative border-b-2 border-[#1A1A1A] pb-4">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="SEARCH THE COLLECTION"
            className="w-full font-serif text-3xl sm:text-5xl md:text-6xl font-light text-[#1A1A1A] placeholder-[#CCCCCC] bg-transparent outline-hidden tracking-tight"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-xs uppercase tracking-widest text-[#999999] hover:text-[#1A1A1A]"
            >
              Clear
            </button>
          ) : (
            <SearchIcon className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 text-[#999999] stroke-[1.2]" />
          )}
        </div>

        {/* Instant Search Results */}
        {query.trim() !== '' ? (
          <div className="pt-10">
            <div className="flex items-baseline justify-between mb-6">
              <span className="text-xs uppercase tracking-[0.2em] text-[#666666]">
                Results ({filteredProducts.length})
              </span>
              <span className="text-xs font-mono text-[#999999]">
                Showing matches for "{query}"
              </span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="py-16 text-center">
                <p className="font-serif text-2xl text-[#1A1A1A] mb-2 font-light">
                  No matching silhouettes found.
                </p>
                <p className="text-sm text-[#666666]">
                  Try searching for "Wool Coat", "Leather", "Shirt", or browse our categories.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-h-[60vh] overflow-y-auto pr-2">
                {filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      onClose();
                      onSelectProduct(p);
                    }}
                    className="cursor-pointer group flex flex-col gap-2"
                  >
                    <div className="aspect-[3/4] bg-[#F4F0EB] overflow-hidden">
                      <SafeImage
                        src={p.primaryImage}
                        alt={p.name}
                        fallbackText={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#888888] block">
                        {p.category}
                      </span>
                      <h4 className="font-serif text-sm font-medium text-[#1A1A1A] line-clamp-1 group-hover:underline">
                        {p.name}
                      </h4>
                      <span className="font-mono text-xs text-[#1A1A1A] tabular-nums">
                        ₹{new Intl.NumberFormat('en-IN').format(p.price)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Default Suggested / Popular State */
          <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Recent Searches */}
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#666666] block mb-4">
                Recent Searches
              </span>
              <ul className="space-y-2 text-sm text-[#1A1A1A]">
                {recentSearches.map((term) => (
                  <li key={term}>
                    <button
                      onClick={() => handleSearchSubmit(term)}
                      className="hover:text-[#666666] transition-colors py-1 flex items-center justify-between w-full text-left"
                    >
                      <span>{term}</span>
                      <ArrowRight className="w-3 h-3 text-[#999999]" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular Searches */}
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#666666] block mb-4">
                Popular Searches
              </span>
              <ul className="space-y-2 text-sm text-[#1A1A1A]">
                {popularSearches.map((term) => (
                  <li key={term}>
                    <button
                      onClick={() => handleSearchSubmit(term)}
                      className="hover:text-[#666666] transition-colors py-1 flex items-center justify-between w-full text-left"
                    >
                      <span>{term}</span>
                      <ArrowRight className="w-3 h-3 text-[#999999]" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Categories */}
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#666666] block mb-4">
                Browse Categories
              </span>
              <ul className="space-y-2 text-sm text-[#1A1A1A]">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => {
                        onClose();
                        onSelectCategory(cat);
                      }}
                      className="hover:text-[#666666] transition-colors py-1 flex items-center justify-between w-full text-left font-serif text-base"
                    >
                      <span>{cat}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#1A1A1A]" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

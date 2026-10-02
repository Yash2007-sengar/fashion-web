import React, { useState } from 'react';
import { X, Heart, ChevronDown, ChevronUp, Plus, Minus, ArrowRight, Check, Ruler, Share2, PhoneCall } from 'lucide-react';
import { Product } from '../types';
import { SafeImage } from './SafeImage';

interface ProductDetailModalProps {
  product: Product | null;
  allProducts: Product[];
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onOpenCall?: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  allProducts,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  onSelectProduct,
  onOpenCall,
}) => {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState<string>(product.primaryImage);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<string>(product.colorName);
  const [quantity, setQuantity] = useState(1);
  const [expandedSection, setExpandedSection] = useState<'details' | 'fit' | 'composition' | 'care' | null>('details');
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(product.price);

  const toggleSection = (section: 'details' | 'fit' | 'composition' | 'care') => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setIsAddedFeedback(true);
    setTimeout(() => setIsAddedFeedback(false), 1800);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 1500);
  };

  // Recommended products for "COMPLETE THE LOOK"
  const recommended = allProducts.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-0 sm:p-4 md:p-8">
      {/* Modal Container */}
      <div className="relative w-full max-w-6xl min-h-screen sm:min-h-0 bg-[#FDFDFD] sm:shadow-2xl flex flex-col max-h-[100vh] sm:max-h-[92vh] overflow-hidden">
        {/* Floating Close Button */}
        <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
          <button
            onClick={handleShare}
            aria-label="Share item"
            className="w-10 h-10 rounded-full bg-[#FDFDFD]/90 backdrop-blur-xs border border-[#E8E5E1] flex items-center justify-center text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors"
          >
            {copiedLink ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
          </button>
          <button
            onClick={onClose}
            aria-label="Close product view"
            className="w-10 h-10 rounded-full bg-[#FDFDFD]/90 backdrop-blur-xs border border-[#E8E5E1] flex items-center justify-center text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors"
          >
            <X className="w-4 h-4 stroke-[1.5]" />
          </button>
        </div>

        {/* Modal Body: Two column grid */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12">
          {/* LEFT: GALLERY */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col gap-4 bg-[#F4F0EB]/30">
            {/* Main Stage Image */}
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F4F0EB]">
              <SafeImage
                src={selectedImage}
                alt={product.name}
                fallbackText={product.name}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute bottom-4 left-4 font-mono text-[10px] tracking-widest text-[#1A1A1A] bg-[#FDFDFD]/90 backdrop-blur-xs px-2.5 py-1">
                Atelier Vérité Studio Archive
              </div>
            </div>

            {/* Thumbnail Navigation */}
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
              {product.galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-26 shrink-0 overflow-hidden border-2 transition-all ${
                    selectedImage === img
                      ? 'border-[#1A1A1A] opacity-100 scale-[0.98]'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <SafeImage
                    src={img}
                    alt={`${product.name} angle ${idx + 1}`}
                    fallbackText={`Thumb ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: CONTIGUOUS PURCHASE MODULE & INFO */}
          <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between bg-[#FDFDFD] border-t lg:border-t-0 lg:border-l border-[#E8E5E1]">
            <div>
              {/* Category & Numbering */}
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-[#666666] mb-3">
                <span>{product.category} · {product.subCategory || 'Collection'}</span>
                <span className="font-mono">{product.number}</span>
              </div>

              {/* Product Title */}
              <h1 className="font-serif text-3xl sm:text-4xl font-light text-[#1A1A1A] leading-tight mb-3">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-mono text-xl sm:text-2xl font-medium text-[#1A1A1A] tracking-tight tabular-nums">
                  {formattedPrice}
                </span>
                <span className="text-[11px] text-[#666666] uppercase tracking-wider">
                  VAT & Duties Included
                </span>
              </div>

              {/* Short Editorial Description */}
              <p className="text-sm text-[#666666] font-light leading-relaxed mb-8">
                {product.editorialDescription}
              </p>

              {/* Color Selector */}
              <div className="mb-6">
                <div className="flex justify-between text-xs uppercase tracking-wider mb-2.5">
                  <span className="text-[#666666]">Color</span>
                  <span className="text-[#1A1A1A] font-medium">{selectedColor}</span>
                </div>
                <div className="flex items-center gap-3">
                  {product.availableColors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => {
                        setSelectedColor(c.name);
                        setSelectedImage(c.image);
                      }}
                      className={`w-7 h-7 rounded-full p-0.5 border transition-all ${
                        selectedColor === c.name
                          ? 'border-[#1A1A1A] scale-110'
                          : 'border-transparent opacity-80 hover:opacity-100'
                      }`}
                      title={c.name}
                    >
                      <span
                        className="block w-full h-full rounded-full border border-black/10"
                        style={{ backgroundColor: c.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector & Size Guide */}
              <div className="mb-8">
                <div className="flex justify-between items-center text-xs uppercase tracking-wider mb-2.5">
                  <span className="text-[#666666]">Size</span>
                  <button
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                    className="flex items-center gap-1.5 text-[#1A1A1A] hover:underline"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Size Guide</span>
                  </button>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`py-3 text-xs font-mono tracking-wider border transition-colors ${
                        selectedSize === sz
                          ? 'border-[#1A1A1A] bg-[#1A1A1A] text-[#FDFDFD]'
                          : 'border-[#E8E5E1] text-[#1A1A1A] hover:border-[#1A1A1A]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>

                {showSizeGuide && (
                  <div className="mt-4 p-4 bg-[#F4F0EB]/60 border border-[#E8E5E1] text-xs space-y-2">
                    <div className="font-serif text-sm font-semibold text-[#1A1A1A]">
                      Garment Measurements (cm)
                    </div>
                    <div className="grid grid-cols-4 gap-2 font-mono text-[11px] text-[#666666] pt-1">
                      <span>Size</span>
                      <span>Chest</span>
                      <span>Shoulder</span>
                      <span>Length</span>
                      <span className="font-semibold text-[#1A1A1A]">S</span>
                      <span>108</span>
                      <span>48</span>
                      <span>112</span>
                      <span className="font-semibold text-[#1A1A1A]">M</span>
                      <span>114</span>
                      <span>50</span>
                      <span>114</span>
                      <span className="font-semibold text-[#1A1A1A]">L</span>
                      <span>120</span>
                      <span>52</span>
                      <span>116</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Quantity Stepper & Add to Bag CTA */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center border border-[#E8E5E1] h-12">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-full flex items-center justify-center text-[#1A1A1A] hover:bg-[#F4F0EB]"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center font-mono text-sm text-[#1A1A1A]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-full flex items-center justify-center text-[#1A1A1A] hover:bg-[#F4F0EB]"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className="flex-1 h-12 bg-[#1A1A1A] text-[#FDFDFD] text-xs uppercase tracking-[0.22em] font-medium hover:bg-[#000000] flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.99]"
                >
                  {isAddedFeedback ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <span>Add to Bag</span>
                  )}
                </button>

                <button
                  onClick={() => onToggleWishlist(product)}
                  aria-label="Wishlist item"
                  className={`w-12 h-12 border border-[#E8E5E1] flex items-center justify-center transition-colors ${
                    isWishlisted ? 'text-[#1A1A1A] bg-[#F4F0EB]' : 'text-[#666666] hover:text-[#1A1A1A]'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#1A1A1A]' : ''}`} />
                </button>
              </div>

              {/* Speak with Stylist Direct Call trigger */}
              {onOpenCall && (
                <div className="mb-6">
                  <button
                    onClick={() => onOpenCall(product)}
                    className="w-full py-2.5 px-3 bg-[#F4F0EB]/60 hover:bg-[#F4F0EB] border border-[#E8E5E1] text-[11px] uppercase tracking-[0.16em] text-[#1A1A1A] flex items-center justify-center gap-2.5 transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Discuss this piece with a Stylist (Instant Call)</span>
                  </button>
                </div>
              )}

              {/* Accordions: Details, Fit, Composition, Care */}
              <div className="border-t border-[#E8E5E1] divide-y divide-[#E8E5E1]">
                {/* Details */}
                <div className="py-3">
                  <button
                    onClick={() => toggleSection('details')}
                    className="w-full flex items-center justify-between text-xs uppercase tracking-[0.18em] font-medium text-[#1A1A1A] py-1"
                  >
                    <span>Details & Tailoring</span>
                    {expandedSection === 'details' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {expandedSection === 'details' && (
                    <ul className="pt-3 pb-2 text-xs text-[#666666] space-y-1.5 list-disc list-inside">
                      {product.details.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Fit */}
                <div className="py-3">
                  <button
                    onClick={() => toggleSection('fit')}
                    className="w-full flex items-center justify-between text-xs uppercase tracking-[0.18em] font-medium text-[#1A1A1A] py-1"
                  >
                    <span>Silhouette & Fit</span>
                    {expandedSection === 'fit' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {expandedSection === 'fit' && (
                    <p className="pt-3 pb-2 text-xs text-[#666666] leading-relaxed">
                      {product.fit}
                    </p>
                  )}
                </div>

                {/* Composition */}
                <div className="py-3">
                  <button
                    onClick={() => toggleSection('composition')}
                    className="w-full flex items-center justify-between text-xs uppercase tracking-[0.18em] font-medium text-[#1A1A1A] py-1"
                  >
                    <span>Composition & Provenance</span>
                    {expandedSection === 'composition' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {expandedSection === 'composition' && (
                    <p className="pt-3 pb-2 text-xs text-[#666666] leading-relaxed">
                      {product.composition}
                    </p>
                  )}
                </div>

                {/* Care */}
                <div className="py-3">
                  <button
                    onClick={() => toggleSection('care')}
                    className="w-full flex items-center justify-between text-xs uppercase tracking-[0.18em] font-medium text-[#1A1A1A] py-1"
                  >
                    <span>Garment Care</span>
                    {expandedSection === 'care' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {expandedSection === 'care' && (
                    <ul className="pt-3 pb-2 text-xs text-[#666666] space-y-1.5 list-disc list-inside">
                      {product.care.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            {/* Complete the look recommendation */}
            <div className="mt-8 pt-6 border-t border-[#E8E5E1]">
              <div className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#1A1A1A] mb-3">
                Complete The Look
              </div>
              <div className="grid grid-cols-3 gap-3">
                {recommended.map((rec) => (
                  <div
                    key={rec.id}
                    onClick={() => {
                      onSelectProduct(rec);
                      setSelectedImage(rec.primaryImage);
                      setSelectedSize(rec.sizes[0]);
                      setSelectedColor(rec.colorName);
                    }}
                    className="cursor-pointer group flex flex-col gap-1"
                  >
                    <div className="aspect-[3/4] w-full overflow-hidden bg-[#F4F0EB]">
                      <SafeImage
                        src={rec.primaryImage}
                        alt={rec.name}
                        fallbackText={rec.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <span className="text-[11px] font-serif text-[#1A1A1A] line-clamp-1 group-hover:underline">
                      {rec.name}
                    </span>
                    <span className="font-mono text-[10px] text-[#666666]">
                      ₹{new Intl.NumberFormat('en-IN').format(rec.price)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { LookbookItem } from '../types';

export const LOOKBOOK_ITEMS: LookbookItem[] = [
  {
    id: 'look-01',
    title: 'Look 01 — Architectural Silhouette',
    season: 'Autumn / Winter',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1400&q=85',
    aspect: 'portrait',
    caption: 'Atelier Wool Coat layered over Crisp Alabaster Shirt and Tailored Fresco Trousers. Photographed on travertine marble.',
    hotspots: [
      {
        x: 48,
        y: 35,
        productId: 'atelier-wool-coat',
        label: 'Atelier Wool Coat',
        price: 18900
      },
      {
        x: 52,
        y: 78,
        productId: 'essential-tailored-trousers',
        label: 'Essential Tailored Trousers',
        price: 11500
      }
    ]
  },
  {
    id: 'look-02',
    title: 'Look 02 — Sculptural Tension',
    season: 'Autumn / Winter',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1400&q=85',
    aspect: 'landscape',
    caption: 'Double-breasted tailoring in motion. Studio lighting with warm raw amber undertones.',
    hotspots: [
      {
        x: 45,
        y: 42,
        productId: 'atelier-wool-coat',
        label: 'Atelier Wool Coat (Melange)',
        price: 18900
      }
    ]
  },
  {
    id: 'look-03',
    title: 'Look 03 — The Essential Monolith',
    season: 'Autumn / Winter',
    image: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=1400&q=85',
    aspect: 'portrait',
    caption: 'Sculpted Oversized Poplin Shirt paired with minimalist hardware and leather accents.',
    hotspots: [
      {
        x: 50,
        y: 40,
        productId: 'sculpted-oversized-shirt',
        label: 'Sculpted Oversized Shirt',
        price: 8900
      }
    ]
  },
  {
    id: 'look-04',
    title: 'Look 04 — Modern Tactility',
    season: 'Autumn / Winter',
    image: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=1400&q=85',
    aspect: 'portrait',
    caption: 'Structured Full-Grain Leather Jacket with burnished finish and high-twist trousers.',
    hotspots: [
      {
        x: 48,
        y: 36,
        productId: 'structured-leather-jacket',
        label: 'Structured Leather Jacket',
        price: 24900
      }
    ]
  },
  {
    id: 'look-05',
    title: 'Look 05 — Cashmere Stillness',
    season: 'Autumn / Winter',
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=1400&q=85',
    aspect: 'landscape',
    caption: 'Signature 7-Gauge Cashmere Knit Sweater in Sandstone Melange. Natural window illumination.',
    hotspots: [
      {
        x: 52,
        y: 46,
        productId: 'signature-knit-sweater',
        label: 'Signature Knit Sweater',
        price: 9800
      }
    ]
  },
  {
    id: 'look-06',
    title: 'Look 06 — Considered Proportion',
    season: 'Autumn / Winter',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85',
    aspect: 'portrait',
    caption: 'Cashmere Cocoon Cape in raw camel with tonal layering.',
    hotspots: [
      {
        x: 55,
        y: 38,
        productId: 'cashmere-cocoon-cape',
        label: 'Cashmere Cocoon Cape',
        price: 21500
      }
    ]
  }
];

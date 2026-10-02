import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'atelier-wool-coat',
    number: '01',
    name: 'Atelier Wool Coat',
    category: 'Outerwear',
    subCategory: 'Coats',
    price: 18900,
    colorName: 'Noir Deep Black',
    colorHex: '#141414',
    availableColors: [
      { name: 'Noir Deep Black', hex: '#141414', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Oatmeal Heather', hex: '#D8CBBE', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Charcoal Melange', hex: '#2A2A2A', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    primaryImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85'
    ],
    shortDescription: 'Double-breasted tailored overcoat cut from heavy virgin wool with sharp drop-shoulders and horn buttons.',
    editorialDescription: 'The Atelier Wool Coat represents the pinnacle of our architectural tailoring. Engineered from 650gsm virgin wool sourced from historic Biella mills, this overcoat delivers dramatic silhouette volume while retaining an effortless, floating drape. Finished with hand-stitched pick lapels and unstructured shoulder pads.',
    details: [
      'Oversized sculptural silhouette with soft structured shoulders',
      'Double-breasted 6-button front closure with genuine horn buttons',
      'Deep back vent for fluid kinetic movement',
      'Fully lined in breathable cupro silk-touch jacquard',
      'Twin welt flap pockets and interior passport pocket'
    ],
    fit: 'Designed for a relaxed, commanding oversized fit. Take your true size for the intended editorial drape, or size down for a conventional tailored cut.',
    composition: '100% Virgin Melton Wool (Outer); 100% Bemberg Cupro (Lining). Sourced from Biella, Italy.',
    care: [
      'Specialist dry clean only',
      'Do not wash or tumble dry',
      'Steam with low heat from 10cm distance',
      'Store on wide-shoulder cedar wood hanger'
    ],
    isNewArrival: true,
    featured: true
  },
  {
    id: 'sculpted-oversized-shirt',
    number: '02',
    name: 'Sculpted Oversized Shirt',
    category: 'Tops',
    subCategory: 'Shirts',
    price: 8900,
    colorName: 'Crisp Alabaster',
    colorHex: '#F6F5F2',
    availableColors: [
      { name: 'Crisp Alabaster', hex: '#F6F5F2', image: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Onyx Black', hex: '#111111', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=85' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    primaryImage: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=1200&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=85'
    ],
    shortDescription: 'Crisp organic cotton poplin button-down with dropped shoulder line and elongated French cuffs.',
    editorialDescription: 'Conceived as the foundational core of the modern wardrobe. Spun from 120-two-ply Egyptian Giza cotton, this piece achieves crisp structural tension with skin-soft breathability. The exaggerated collar points and extended cuff placket lend an uncompromising modern edge.',
    details: [
      'Exaggerated pointed collar with removable stays',
      'Mother-of-pearl smoked buttons with cross-stitching',
      'Curved high-low hem with side gussets',
      'Clean hidden front placket'
    ],
    fit: 'Generous volume through body and sleeves. Model is 187cm wearing size Medium.',
    composition: '100% Giza Organic Long-Staple Cotton Poplin.',
    care: [
      'Machine wash gentle cold (30°C)',
      'Line dry in shade',
      'Warm iron while slightly damp'
    ],
    isNewArrival: true,
    isEssential: true,
    featured: true
  },
  {
    id: 'essential-tailored-trousers',
    number: '03',
    name: 'Essential Tailored Trousers',
    category: 'Trousers',
    subCategory: 'Pants',
    price: 11500,
    colorName: 'Espresso Mineral',
    colorHex: '#38332E',
    availableColors: [
      { name: 'Espresso Mineral', hex: '#38332E', image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Sand Dune', hex: '#C2B8A3', image: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=1200&q=85' }
    ],
    sizes: ['28', '30', '32', '34', '36'],
    primaryImage: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=1200&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=1200&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1200&q=85'
    ],
    shortDescription: 'Double-pleated straight wide-leg trousers in high-twist wool fresco with internal waistband curtain.',
    editorialDescription: 'A study in architectural lower-body proportion. Crafted from wrinkle-resistant high-twist fresco wool, these trousers hold a razor-sharp pressed front crease all day. Constructed with an artisanal sartorial split back waistband and curtain lining.',
    details: [
      'Deep double forward pleats for comfortable seat volume',
      'Extended tab waistband with concealed hook-and-bar closure',
      'Side slash pockets with bartack reinforcements',
      'Half-lined to knee in anti-static cupro'
    ],
    fit: 'Mid-to-high rise with wide straight leg pooling softly over dress shoes or boots.',
    composition: '98% High-Twist Fresco Wool, 2% Elastane.',
    care: [
      'Dry clean only',
      'Press with pressing cloth on medium heat'
    ],
    isNewArrival: true,
    isEssential: true,
    featured: true
  },
  {
    id: 'structured-leather-jacket',
    number: '04',
    name: 'Structured Leather Jacket',
    category: 'Outerwear',
    subCategory: 'Jackets',
    price: 24900,
    colorName: 'Espresso Burnished',
    colorHex: '#1F1A17',
    availableColors: [
      { name: 'Espresso Burnished', hex: '#1F1A17', image: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Pure Obsidian', hex: '#0B0B0B', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=85' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    primaryImage: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=1200&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=1200&q=85'
    ],
    shortDescription: 'Boxy aviator-cut jacket crafted from vegetable-tanned full-grain calfskin with custom matte silver hardware.',
    editorialDescription: 'A permanent investment in rebellious refinement. Cut from 1.2mm vegetable-tanned lambskin treated with artisanal waxes that develop a bespoke patina over years of wear. Features custom brushed metal RiRi zippers and an angular throat latch.',
    details: [
      'Boxy cropped body with ergonomic sleeve curves',
      'Heavyweight 2-way RiRi zipper with leather pull tags',
      'Dual chest storm flap pockets with concealed snaps',
      'Adjustable cinch tabs at lower side hem'
    ],
    fit: 'True to size for a sharp cropped boxy silhouette. Order one size up for layering over thick knitwear.',
    composition: '100% Full-Grain Vegetable-Tanned Nappa Leather. Lining: 100% Cotton Twill.',
    care: [
      'Specialist leather cleaner only',
      'Do not expose to prolonged direct moisture or heat',
      'Treat with neutral leather conditioner annually'
    ],
    isNewArrival: true,
    featured: true
  },
  {
    id: 'signature-knit-sweater',
    number: '05',
    name: 'Signature Knit Sweater',
    category: 'Knitwear',
    subCategory: 'Sweaters',
    price: 9800,
    colorName: 'Sandstone Melange',
    colorHex: '#D8CBBE',
    availableColors: [
      { name: 'Sandstone Melange', hex: '#D8CBBE', image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Deep Truffle', hex: '#2F2622', image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1200&q=85' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    primaryImage: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=1200&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1200&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1200&q=85'
    ],
    shortDescription: 'Heavy-gauge 5-ply cashmere-wool mockneck sweater with ribbed cuffs and drop shoulder.',
    editorialDescription: 'Spun from Mongolian grade-A cashmere and superfine Australian merino wool. Knitted on Japanese Shima Seiki seamless looms to eliminate interior bulk. The result is weightless thermal warmth and cloud-like tactile luxury.',
    details: [
      '7-gauge fisherman rib knit texture',
      'Engineered seamless tubular mockneck collar',
      'Reinforced cuffs with shape-retention elastane yarn',
      'Natural undyed fiber options available'
    ],
    fit: 'Slightly relaxed body with standard sleeve length. Falls neatly at the hip bone.',
    composition: '70% Superfine Merino Wool, 30% Mongolian Cashmere.',
    care: [
      'Hand wash cold in gentle wool shampoo',
      'Dry flat on towel, never wring or hang',
      'Comb gently with cashmere comb to remove pilling'
    ],
    isNewArrival: true,
    isEssential: true,
    featured: true
  },
  {
    id: 'relaxed-linen-overshirt',
    number: '06',
    name: 'Relaxed Linen Overshirt',
    category: 'Tops',
    subCategory: 'Overshirts',
    price: 7900,
    colorName: 'Muted Bone',
    colorHex: '#EAE6DF',
    availableColors: [
      { name: 'Muted Bone', hex: '#EAE6DF', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Olive Umber', hex: '#4A483E', image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1200&q=85' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    primaryImage: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1200&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1200&q=85'
    ],
    shortDescription: 'Substantial washed Normandy linen chore overshirt with patch chest pockets and corozo nut buttons.',
    editorialDescription: 'The bridge between tailored shirt and light jacket. Crafted from 280gsm pure Normandy flax that softens gracefully with every wear and wash. Designed for effortless layering throughout transitioning seasons.',
    details: [
      'Spread camp collar with top loop fastening',
      'Dual oversized patch pockets with pen slot divider',
      'Straight hem designed to be worn untucked',
      'Corozo nut buttons sustainably carved from palm trees'
    ],
    fit: 'Relaxed chore coat silhouette with ample room through chest and arms.',
    composition: '100% Pre-Washed Normandy Flax Linen.',
    care: [
      'Machine wash gentle at 30°C',
      'Do not bleach or dry clean',
      'Air dry flat in shade'
    ],
    isNewArrival: true,
    isEssential: true,
    featured: true
  },
  {
    id: 'cashmere-cocoon-cape',
    number: '07',
    name: 'Cashmere Cocoon Cape',
    category: 'Outerwear',
    subCategory: 'Capes',
    price: 21500,
    colorName: 'Raw Camel',
    colorHex: '#C5A880',
    availableColors: [
      { name: 'Raw Camel', hex: '#C5A880', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85' }
    ],
    sizes: ['One Size'],
    primaryImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85'
    ],
    shortDescription: 'Double-faced pure cashmere wrapping cape with raw fringed hemline and invisible magnetic closure.',
    editorialDescription: 'Pure enveloping luxury. Cut from an unlined double-faced cashmere blanket cloth that drapes effortlessly across the shoulders in motion.',
    details: [
      'Hand-finished fringed edge details',
      'Concealed interior magnetic clasp at throat',
      'Reversible two-tone camel and charcoal construction'
    ],
    fit: 'Fluid one-size cocoon silhouette designed to accommodate all body structures.',
    composition: '100% Mongolian Cashmere Double-Faced Fabric.',
    care: ['Specialist dry clean only.'],
    isNewArrival: false,
    featured: false
  },
  {
    id: 'pleated-silk-blend-dress',
    number: '08',
    name: 'Pleated Column Dress',
    category: 'Tops',
    subCategory: 'Dresses',
    price: 16800,
    colorName: 'Champagne Satin',
    colorHex: '#E2DAC8',
    availableColors: [
      { name: 'Champagne Satin', hex: '#E2DAC8', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    primaryImage: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85'
    ],
    shortDescription: 'High-neck floor-skimming column dress with micro accordion pleats in heavy silk georgette.',
    editorialDescription: 'Hypnotic kinetic grace. Thermal micro pleats retain their razor sharpness through movement, catching ambient light with quiet luminescence.',
    details: ['Concealed back neck teardrop button', 'Elasticated pleated structure provides flexible fit'],
    fit: 'Fluid column fit that contours subtly to the body.',
    composition: '70% Mulberry Silk, 30% Lyocell.',
    care: ['Dry clean with delicate solvent.'],
    isNewArrival: false,
    featured: false
  }
];

import React, { useState, useEffect } from 'react';
import { PRODUCTS } from './data/products';
import { Product, CartItem, ActiveView } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BrandIntro } from './components/BrandIntro';
import { HorizontalShowcase } from './components/HorizontalShowcase';
import { CategoryBlocks } from './components/CategoryBlocks';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchOverlay } from './components/SearchOverlay';
import { CollectionPage } from './components/CollectionPage';
import { LookbookSection } from './components/LookbookSection';
import { VirtualTryOn } from './components/VirtualTryOn';
import { BrandStory } from './components/BrandStory';
import { BrandValues } from './components/BrandValues';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { CheckoutModal } from './components/CheckoutModal';
import { AccountModal } from './components/AccountModal';
import { CustomCursor } from './components/CustomCursor';
import { Toast } from './components/Toast';
import { ConciergeCallModal } from './components/ConciergeCallModal';
import { ConciergeCallWidget } from './components/ConciergeCallWidget';

export default function App() {
  // Navigation & Views
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [collectionCategoryFilter, setCollectionCategoryFilter] = useState<string>('all');

  // Interactive Overlays
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [callModalOpen, setCallModalOpen] = useState(false);
  const [callingProduct, setCallingProduct] = useState<Product | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Cart State (Persisted in localStorage)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('atelier_verite_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist State (Persisted in localStorage)
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('atelier_verite_wishlist');
      return saved ? new Set(JSON.parse(saved)) : new Set(['atelier-wool-coat']);
    } catch {
      return new Set(['atelier-wool-coat']);
    }
  });

  // Order count for member profile
  const [orderCount, setOrderCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('atelier_verite_orders');
      return saved ? parseInt(saved, 10) : 1;
    } catch {
      return 1;
    }
  });

  // Save Cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('atelier_verite_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  // Save Wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        'atelier_verite_wishlist',
        JSON.stringify(Array.from(wishlistIds))
      );
    } catch (e) {
      console.error(e);
    }
  }, [wishlistIds]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3200);
  };

  // Cart Actions
  const handleAddToCart = (
    product: Product,
    size: string,
    color: string,
    quantity = 1
  ) => {
    const compositeId = `${product.id}-${size}-${color}`;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === compositeId);
      if (existing) {
        return prev.map((item) =>
          item.id === compositeId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: compositeId,
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.primaryImage,
          size,
          color,
          quantity,
        },
      ];
    });
    showToast(`${product.name} (Size ${size}) added to your bag`);
  };

  const handleQuickAdd = (product: Product, size: string) => {
    handleAddToCart(product, size, product.colorName, 1);
  };

  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Piece removed from bag');
  };

  // Wishlist Actions
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const next = new Set(prev);
      if (next.has(product.id)) {
        next.delete(product.id);
        showToast(`${product.name} removed from wishlist`);
      } else {
        next.add(product.id);
        showToast(`${product.name} saved to wishlist`);
      }
      return next;
    });
  };

  const handleMoveToCart = (product: Product) => {
    handleAddToCart(product, product.sizes[0] || 'M', product.colorName, 1);
    setWishlistIds((prev) => {
      const next = new Set(prev);
      next.delete(product.id);
      return next;
    });
  };

  // Navigation router
  const handleNavigate = (view: ActiveView, categoryFilter?: string) => {
    setActiveView(view);
    if (categoryFilter) {
      setCollectionCategoryFilter(categoryFilter);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProductById = (id: string) => {
    const found = PRODUCTS.find((p) => p.id === id);
    if (found) {
      setSelectedProduct(found);
    }
  };

  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.has(p.id));
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="relative min-h-screen bg-[#FDFDFD] text-[#1A1A1A] font-sans">
      {/* Minimal Desktop Custom Cursor */}
      <CustomCursor />

      {/* Top Sticky Header */}
      <Header
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.size}
        onOpenCart={() => setCartOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenAccount={() => setAccountOpen(true)}
        onOpenCall={() => {
          setCallingProduct(null);
          setCallModalOpen(true);
        }}
        activeView={activeView}
        onNavigate={handleNavigate}
      />

      {/* Main View Switcher */}
      <main>
        {activeView === 'home' && (
          <>
            {/* 1. Cinematic Hero Section */}
            <Hero
              onShopCollection={() => handleNavigate('collection', 'all')}
              onExploreLookbook={() => handleNavigate('lookbook')}
            />

            {/* 2. Editorial Brand Introduction */}
            <BrandIntro />

            {/* 3. Featured Products — Horizontal Scroll */}
            <HorizontalShowcase
              products={PRODUCTS.slice(0, 6)}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
              onSelectProduct={(p) => setSelectedProduct(p)}
              onQuickAdd={handleQuickAdd}
              onViewAll={() => handleNavigate('collection', 'all')}
            />

            {/* 4. Category Editorial Blocks */}
            <CategoryBlocks
              onSelectCategory={(cat) => handleNavigate('collection', cat)}
            />

            {/* 5. Editorial Lookbook Preview */}
            <LookbookSection
              onSelectProductById={handleSelectProductById}
              allProducts={PRODUCTS}
            />

            {/* 6. Virtual Try-On AR Module */}
            <VirtualTryOn
              products={PRODUCTS}
              onSelectProduct={(p) => setSelectedProduct(p)}
            />

            {/* 7. Brand Story & Craftsmanship */}
            <BrandStory
              onDiscoverMore={() => handleNavigate('story')}
            />

            {/* 8. Brand Values (4-Column) */}
            <BrandValues />

            {/* 9. Minimalist Newsletter */}
            <Newsletter />
          </>
        )}

        {activeView === 'collection' && (
          <CollectionPage
            products={PRODUCTS}
            initialCategory={collectionCategoryFilter}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onQuickAdd={handleQuickAdd}
          />
        )}

        {activeView === 'lookbook' && (
          <div className="pt-24">
            <LookbookSection
              onSelectProductById={handleSelectProductById}
              allProducts={PRODUCTS}
            />
            <Newsletter />
          </div>
        )}

        {activeView === 'story' && (
          <div className="pt-24">
            <BrandStory />
            <BrandValues />
            <Newsletter />
          </div>
        )}

        {activeView === 'try-on' && (
          <div className="pt-24">
            <VirtualTryOn
              products={PRODUCTS}
              onSelectProduct={(p) => setSelectedProduct(p)}
            />
          </div>
        )}
      </main>

      {/* Luxury Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenCall={() => {
          setCallingProduct(null);
          setCallModalOpen(true);
        }}
      />

      {/* Floating Concierge Direct Call Widget */}
      <ConciergeCallWidget
        onOpenCall={() => {
          setCallingProduct(null);
          setCallModalOpen(true);
        }}
      />

      {/* OVERLAYS & MODALS */}

      {/* Slide-out Shopping Bag Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
        onExploreCollection={() => {
          setCartOpen(false);
          handleNavigate('collection', 'all');
        }}
      />

      {/* Slide-out Wishlist Drawer */}
      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleToggleWishlist}
        onMoveToCart={handleMoveToCart}
        onSelectProduct={(p) => {
          setWishlistOpen(false);
          setSelectedProduct(p);
        }}
      />

      {/* Fullscreen Search Overlay */}
      <SearchOverlay
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={(p) => {
          setSearchOpen(false);
          setSelectedProduct(p);
        }}
        onSelectCategory={(cat) => {
          setSearchOpen(false);
          handleNavigate('collection', cat);
        }}
      />

      {/* Product Detail Modal (PDP) */}
      <ProductDetailModal
        product={selectedProduct}
        allProducts={PRODUCTS}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={selectedProduct ? wishlistIds.has(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onOpenCall={(p) => {
          setCallingProduct(p);
          setCallModalOpen(true);
        }}
      />

      {/* Maison Concierge VIP Call Modal */}
      <ConciergeCallModal
        isOpen={callModalOpen}
        onClose={() => setCallModalOpen(false)}
        activeProduct={callingProduct}
        allProducts={PRODUCTS}
        onAddToCart={handleAddToCart}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={cartItems}
        onOrderComplete={() => {
          setCartItems([]);
          const newCount = orderCount + 1;
          setOrderCount(newCount);
          try {
            localStorage.setItem('atelier_verite_orders', newCount.toString());
          } catch {}
          showToast('Order confirmed. Receipt dispatch initiated.');
        }}
      />

      {/* Member Account Portal */}
      <AccountModal
        isOpen={accountOpen}
        onClose={() => setAccountOpen(false)}
        orderCount={orderCount}
        wishlistCount={wishlistIds.size}
        onOpenWishlist={() => {
          setAccountOpen(false);
          setWishlistOpen(true);
        }}
      />

      {/* Feedback Toast */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}

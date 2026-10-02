import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';
import { SafeImage } from './SafeImage';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderComplete: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderComplete,
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    firstName: 'Eleanor',
    lastName: 'Vance',
    email: 'eleanor.vance@atelier.com',
    phone: '+91 98765 43210',
    address: '14 Kensington Crescent, Penthouse 4B',
    city: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '400050',
    paymentMethod: 'card' as 'card' | 'applepay' | 'cod' | 'upi',
  });
  const [orderRef, setOrderRef] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 25000 ? 0 : 1500;
  const total = subtotal + shipping;

  const formattedTotal = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(total);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedRef = `AV-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderRef(generatedRef);
    setStep(2);
    onOrderComplete();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-8 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#FDFDFD] shadow-2xl border border-[#E8E5E1] flex flex-col max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 sm:px-8 py-5 border-b border-[#E8E5E1] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-serif text-xl sm:text-2xl uppercase tracking-[0.18em] text-[#1A1A1A]">
              ATELIER VÉRITÉ
            </span>
            <span className="font-mono text-[10px] text-[#666666] tracking-widest hidden sm:inline-block">
              {step === 1 ? 'CONCIERGE CHECKOUT' : 'ORDER CONFIRMED'}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close checkout"
            className="p-1 hover:opacity-70 transition-opacity"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          {step === 1 ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
              {/* Form Left */}
              <form onSubmit={handleSubmitOrder} className="lg:col-span-7 flex flex-col gap-6">
                <div>
                  <h3 className="font-serif text-xl text-[#1A1A1A] font-light mb-4">
                    Client Details & Shipping
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-[#666666] block mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full px-3 py-2.5 bg-[#F4F0EB]/40 border border-[#E8E5E1] text-xs text-[#1A1A1A] outline-hidden focus:border-[#1A1A1A]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-[#666666] block mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full px-3 py-2.5 bg-[#F4F0EB]/40 border border-[#E8E5E1] text-xs text-[#1A1A1A] outline-hidden focus:border-[#1A1A1A]"
                      />
                    </div>
                  </div>

                  <div className="mt-3">
                    <label className="text-[10px] uppercase tracking-wider text-[#666666] block mb-1">
                      Email Address (Order Confirmation)
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2.5 bg-[#F4F0EB]/40 border border-[#E8E5E1] text-xs text-[#1A1A1A] outline-hidden focus:border-[#1A1A1A]"
                    />
                  </div>

                  <div className="mt-3">
                    <label className="text-[10px] uppercase tracking-wider text-[#666666] block mb-1">
                      Street Address & Apartment
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3 py-2.5 bg-[#F4F0EB]/40 border border-[#E8E5E1] text-xs text-[#1A1A1A] outline-hidden focus:border-[#1A1A1A]"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3 mt-3">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-[#666666] block mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3 py-2.5 bg-[#F4F0EB]/40 border border-[#E8E5E1] text-xs text-[#1A1A1A] outline-hidden focus:border-[#1A1A1A]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-[#666666] block mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full px-3 py-2.5 bg-[#F4F0EB]/40 border border-[#E8E5E1] text-xs text-[#1A1A1A] outline-hidden focus:border-[#1A1A1A]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-[#666666] block mb-1">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        className="w-full px-3 py-2.5 bg-[#F4F0EB]/40 border border-[#E8E5E1] text-xs text-[#1A1A1A] outline-hidden focus:border-[#1A1A1A]"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Selection */}
                <div>
                  <h3 className="font-serif text-xl text-[#1A1A1A] font-light mb-3">
                    Payment Method
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <label
                      onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                      className={`p-3 border flex flex-col justify-between cursor-pointer transition-colors ${
                        formData.paymentMethod === 'card'
                          ? 'border-[#1A1A1A] bg-[#F4F0EB]'
                          : 'border-[#E8E5E1]'
                      }`}
                    >
                      <span className="text-xs font-semibold text-[#1A1A1A]">Credit / Debit Card</span>
                      <span className="text-[10px] text-[#666666]">Visa, Mastercard, Amex</span>
                    </label>

                    <label
                      onClick={() => setFormData({ ...formData, paymentMethod: 'applepay' })}
                      className={`p-3 border flex flex-col justify-between cursor-pointer transition-colors ${
                        formData.paymentMethod === 'applepay'
                          ? 'border-[#1A1A1A] bg-[#F4F0EB]'
                          : 'border-[#E8E5E1]'
                      }`}
                    >
                      <span className="text-xs font-semibold text-[#1A1A1A]">Apple Pay / Google Pay</span>
                      <span className="text-[10px] text-[#666666]">One-touch express authorization</span>
                    </label>

                    <label
                      onClick={() => setFormData({ ...formData, paymentMethod: 'upi' })}
                      className={`p-3 border flex flex-col justify-between cursor-pointer transition-colors ${
                        formData.paymentMethod === 'upi'
                          ? 'border-[#1A1A1A] bg-[#F4F0EB]'
                          : 'border-[#E8E5E1]'
                      }`}
                    >
                      <span className="text-xs font-semibold text-[#1A1A1A]">Instant UPI</span>
                      <span className="text-[10px] text-[#666666]">GPay, PhonePe, Paytm</span>
                    </label>

                    <label
                      onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                      className={`p-3 border flex flex-col justify-between cursor-pointer transition-colors ${
                        formData.paymentMethod === 'cod'
                          ? 'border-[#1A1A1A] bg-[#F4F0EB]'
                          : 'border-[#E8E5E1]'
                      }`}
                    >
                      <span className="text-xs font-semibold text-[#1A1A1A]">Concierge On Delivery</span>
                      <span className="text-[10px] text-[#666666]">Verify fit upon courier arrival</span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#666666] pt-2">
                  <ShieldCheck className="w-4 h-4 text-[#1A1A1A]" />
                  <span>256-bit encrypted checkout. Certified luxury authentication.</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#1A1A1A] text-white text-xs uppercase tracking-[0.22em] font-medium hover:bg-[#000000] transition-colors flex items-center justify-center gap-3 shadow-xl"
                >
                  <span>Authorize & Place Order ({formattedTotal})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Order Summary Right */}
              <div className="lg:col-span-5 bg-[#F4F0EB]/60 p-6 border border-[#E8E5E1] flex flex-col justify-between">
                <div>
                  <h4 className="font-serif text-lg text-[#1A1A1A] font-light mb-4">
                    Order Summary ({items.length} pieces)
                  </h4>

                  <div className="divide-y divide-[#E8E5E1] max-h-[300px] overflow-y-auto pr-1">
                    {items.map((item) => (
                      <div key={item.id} className="py-3 flex gap-3 text-xs">
                        <div className="w-14 h-18 bg-white overflow-hidden shrink-0">
                          <SafeImage
                            src={item.image}
                            alt={item.name}
                            fallbackText={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="font-serif text-sm text-[#1A1A1A]">{item.name}</div>
                          <div className="text-[11px] text-[#666666]">
                            Size {item.size} · {item.color} · Qty {item.quantity}
                          </div>
                          <div className="font-mono text-xs font-medium text-[#1A1A1A] mt-1 tabular-nums">
                            ₹{new Intl.NumberFormat('en-IN').format(item.price * item.quantity)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-[#E8E5E1] pt-4 mt-6 space-y-2 text-xs">
                  <div className="flex justify-between text-[#666666]">
                    <span>Subtotal</span>
                    <span className="font-mono">
                      ₹{new Intl.NumberFormat('en-IN').format(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#666666]">
                    <span>Shipping</span>
                    <span className="font-mono">
                      {shipping === 0 ? 'Complimentary' : `₹${shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-serif text-[#1A1A1A] pt-2 border-t border-[#E8E5E1] font-semibold">
                    <span>Total Due</span>
                    <span className="font-mono tabular-nums">{formattedTotal}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Step 2: Order Confirmation Receipt */
            <div className="py-12 flex flex-col items-center text-center max-w-lg mx-auto">
              <CheckCircle className="w-14 h-14 text-[#1A1A1A] stroke-[1.2] mb-6" />

              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#666666] mb-2">
                Order Receipt Reference
              </span>

              <h3 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-light mb-4">
                Thank You, {formData.firstName}.
              </h3>

              <div className="font-mono text-sm bg-[#F4F0EB] px-4 py-2 border border-[#E8E5E1] mb-6 text-[#1A1A1A]">
                {orderRef}
              </div>

              <p className="text-sm text-[#666666] leading-relaxed mb-8">
                Your commission has been received by our atelier. A formal dispatch confirmation with insured tracking details will be sent to <strong>{formData.email}</strong>.
              </p>

              <div className="w-full bg-[#F4F0EB]/60 p-5 border border-[#E8E5E1] text-xs text-left mb-8 space-y-1.5 font-light">
                <div className="font-serif font-semibold text-sm mb-2 text-[#1A1A1A]">
                  Delivery Itinerary
                </div>
                <div>Recipient: {formData.firstName} {formData.lastName}</div>
                <div>Destination: {formData.address}, {formData.city}, {formData.postalCode}</div>
                <div>Estimated Dispatch: Within 24 Hours from Atelier Milan</div>
                <div>Payment Method: {formData.paymentMethod.toUpperCase()}</div>
              </div>

              <button
                onClick={onClose}
                className="bg-[#1A1A1A] text-white px-8 py-3.5 text-xs uppercase tracking-[0.22em] font-medium hover:bg-black transition-colors"
              >
                Return To Storefront
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

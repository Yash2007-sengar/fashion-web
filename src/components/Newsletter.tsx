import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubmitted(true);
  };

  return (
    <section className="w-full py-20 sm:py-28 bg-[#F4F0EB] text-[#1A1A1A] border-b border-[#E8E5E1]">
      <div className="max-w-2xl mx-auto px-6 sm:px-10 text-center flex flex-col items-center">
        <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#666666] mb-4">
          Private Client Dispatch
        </span>

        <h2 className="font-serif text-3xl sm:text-5xl font-light uppercase tracking-tight text-[#1A1A1A] mb-4">
          Stay In The Know.
        </h2>

        <p className="text-sm sm:text-base text-[#666666] font-light max-w-lg mb-8 leading-relaxed">
          Be the first to discover new collections, private releases, and stories from the house.
        </p>

        {submitted ? (
          <div className="bg-[#FDFDFD] border border-[#E8E5E1] p-6 max-w-md w-full flex items-center justify-center gap-3 animate-fadeIn">
            <Check className="w-5 h-5 text-[#1A1A1A]" />
            <span className="font-serif text-sm tracking-wide text-[#1A1A1A]">
              Thank you. You have been added to the private registry.
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col sm:flex-row gap-0 sm:gap-2">
            <div className="relative flex-1">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full px-5 py-4 bg-[#FDFDFD] border border-[#E8E5E1] text-xs text-[#1A1A1A] placeholder-[#999999] focus:outline-hidden focus:border-[#1A1A1A] transition-colors"
              />
            </div>
            <button
              type="submit"
              className="group px-7 py-4 bg-[#1A1A1A] text-[#FDFDFD] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#000000] flex items-center justify-center gap-2 transition-colors shrink-0 mt-2 sm:mt-0"
            >
              <span>Subscribe</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        )}

        <p className="text-[10px] uppercase tracking-wider text-[#888888] mt-4 font-light">
          By subscribing you agree to our Privacy Policy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

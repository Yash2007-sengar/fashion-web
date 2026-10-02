import React, { useRef, useState } from 'react';
import { ArrowRight, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { ActiveView } from '../types';

interface HeroProps {
  onShopCollection: () => void;
  onExploreLookbook: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopCollection, onExploreLookbook }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Reliable editorial luxury video loop
  // High fashion runway / fabric movement video from public CDN
  const videoSrc = 'https://assets.mixkit.co/videos/preview/mixkit-model-posing-in-a-studio-fashion-shoot-41484-large.mp4';
  const posterImg = 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=2000&q=85';

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const scrollToExplore = () => {
    const el = document.getElementById('brand-intro');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-[95vh] sm:h-screen min-h-[640px] flex items-end overflow-hidden bg-[#111111] text-white">
      {/* Background Video with Poster Fallback */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* High-res image fallback while video is loading or if failed */}
        <img
          src={posterImg}
          alt="Atelier Vérité Autumn / Winter Campaign"
          className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-0' : 'opacity-100'
          }`}
          referrerPolicy="no-referrer"
        />

        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster={posterImg}
          onCanPlay={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.82] contrast-[1.08] transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>

        {/* Cinematic Scrim Gradient Overlays for Luxury Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/25 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/20 to-black/60 pointer-events-none" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-12 pb-14 sm:pb-20">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-3 text-[11px] sm:text-xs uppercase tracking-[0.3em] font-medium text-white/90 mb-4 sm:mb-6">
            <span>The Autumn / Winter Edit</span>
            <span className="w-8 h-[1px] bg-white/40" />
            <span className="font-mono text-[10px] text-white/70">COLLECTION N° 09</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[100px] leading-[0.92] tracking-[-0.01em] font-light text-white mb-6 uppercase">
            The Art of <br />
            <span className="italic font-normal">Becoming.</span>
          </h1>

          {/* Supporting Text */}
          <p className="text-sm sm:text-base md:text-lg text-white/80 font-light tracking-wide max-w-lg mb-8 sm:mb-10 leading-relaxed">
            Modern silhouettes. Timeless intention. Engineered with uncompromised
            sartorial precision in pure Biella wool and raw cashmere.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8">
            <button
              onClick={onShopCollection}
              className="group relative inline-flex items-center gap-4 bg-[#FDFDFD] text-[#1A1A1A] px-7 sm:px-9 py-4 text-xs uppercase tracking-[0.22em] font-semibold hover:bg-[#D8CBBE] transition-all duration-300 shadow-2xl active:scale-[0.98]"
            >
              <span>Shop The Collection</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </button>

            <button
              onClick={onExploreLookbook}
              className="text-xs uppercase tracking-[0.22em] text-white/90 hover:text-white transition-colors duration-300 py-2 hover-underline-animation font-medium"
            >
              Explore The Lookbook
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar: Scroll Indicator & Video Controls */}
      <div className="absolute bottom-6 left-6 sm:left-12 right-6 sm:right-12 z-20 flex items-center justify-between pointer-events-none">
        <button
          onClick={scrollToExplore}
          className="pointer-events-auto flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-white/60 hover:text-white transition-colors"
        >
          <span>Scroll to explore</span>
          <span className="animate-bounce">↓</span>
        </button>

        <div className="pointer-events-auto flex items-center gap-3 bg-black/30 backdrop-blur-md px-3 py-1.5 border border-white/10 text-white/80">
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
            className="p-1 hover:text-white transition-colors"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <div className="w-[1px] h-3 bg-white/20" />
          <button
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            className="p-1 hover:text-white transition-colors"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </section>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  PhoneOff,
  PhoneCall,
  Video,
  VideoOff,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  ShoppingBag,
  Check,
  User,
  Clock,
  Shield,
  MessageSquare,
  Globe,
  ArrowRight,
  ExternalLink,
  X
} from 'lucide-react';
import { Product } from '../types';
import { SafeImage } from './SafeImage';
import { conciergeAudio } from '../utils/callAudio';

interface ConciergeCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeProduct?: Product | null;
  allProducts: Product[];
  onAddToCart: (product: Product, size: string, color: string, quantity: number) => void;
}

export const ConciergeCallModal: React.FC<ConciergeCallModalProps> = ({
  isOpen,
  onClose,
  activeProduct,
  allProducts,
  onAddToCart,
}) => {
  const [callState, setCallState] = useState<'idle' | 'ringing' | 'connected' | 'ended'>('idle');
  const [activeTab, setActiveTab] = useState<'live' | 'directory'>('live');
  const [callType, setCallType] = useState<'video' | 'audio'>('video');
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isSpeakerMuted, setIsSpeakerMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [selectedStylist, setSelectedStylist] = useState<'camille' | 'marco'>('camille');
  const [stylistNoteIndex, setStylistNoteIndex] = useState(0);
  const [addedItemName, setAddedItemName] = useState<string | null>(null);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stylists = {
    camille: {
      name: 'Camille Laurent',
      title: 'Head of Private Client Styling',
      location: 'Atelier Milan · Via Montenapoleone',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-model-posing-in-a-studio-fashion-shoot-41484-large.mp4',
    },
    marco: {
      name: 'Marco Bellini',
      title: 'Master Sartorialist & Tailor',
      location: 'Atelier Biella · Northern Italy',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=85',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-dancing-under-the-rain-43187-large.mp4',
    },
  };

  const stylistNotes = [
    '“The Atelier Wool Coat is cut with soft drop-shoulders; for an intentional oversized drape, stick to your true chest measurement.”',
    '“We recommend pairing the Alabaster Poplin Shirt untucked beneath the fresco trousers for clean architectural balance.”',
    '“Our Biella wool is untreated with silicones, allowing natural breathability across transitioning autumn temperatures.”',
    '“We have reserved one piece in your size from the Paris private stockroom for priority dispatch.”',
  ];

  // Direct dialing phone directory for global salons
  const atelierSalons = [
    { city: 'Milan Flagship & Studio', phone: '+39 02 7600 1234', address: 'Via Montenapoleone 8', hours: '10:00 – 19:00 CET' },
    { city: 'Paris Private Salon', phone: '+33 1 40 20 50 50', address: '24 Rue du Faubourg Saint-Honoré', hours: '10:00 – 19:00 CET' },
    { city: 'New York Madison Salon', phone: '+1 212 555 0199', address: '740 Madison Avenue, Penthouse', hours: '10:00 – 18:00 EST' },
    { city: 'London Mayfair Salon', phone: '+44 20 7946 0920', address: '14 Old Bond Street', hours: '10:00 – 18:30 GMT' },
    { city: 'Tokyo Ginza Suite', phone: '+81 3 5555 0142', address: '6-10-1 Ginza, Chuo-ku', hours: '11:00 – 20:00 JST' },
    { city: 'Mumbai Concierge Flagship', phone: '+91 22 6789 0123', address: 'Alibaug House, Colaba', hours: '10:00 – 20:00 IST' },
  ];

  // Recommended pieces presented during consultation
  const featuredPiece = activeProduct || allProducts[0];
  const pairedPiece = allProducts.find((p) => p.id !== featuredPiece?.id) || allProducts[1];

  // Call timer effect
  useEffect(() => {
    let interval: any = null;
    if (callState === 'connected') {
      interval = setInterval(() => {
        setCallDuration((d) => d + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(interval);
  }, [callState]);

  // Rotate stylist notes during call
  useEffect(() => {
    let noteInterval: any = null;
    if (callState === 'connected') {
      noteInterval = setInterval(() => {
        setStylistNoteIndex((prev) => (prev + 1) % stylistNotes.length);
      }, 7000);
    }
    return () => clearInterval(noteInterval);
  }, [callState]);

  // Clean up audio & camera stream on unmount or close
  useEffect(() => {
    if (!isOpen) {
      handleHangUp(false);
    }
    return () => {
      conciergeAudio.stopRinging();
      stopCameraStream();
    };
  }, [isOpen]);

  const startCameraStream = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        streamRef.current = stream;
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      }
    } catch (e) {
      console.warn('Webcam not permitted or unavailable, using private avatar mode:', e);
    }
  };

  const stopCameraStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const handleStartCall = (type: 'video' | 'audio') => {
    setCallType(type);
    setCallState('ringing');
    conciergeAudio.startRinging();

    // Auto connect after 3 seconds of realistic European ringing
    setTimeout(() => {
      conciergeAudio.stopRinging();
      conciergeAudio.playConnectedChime();
      setCallState('connected');
      if (type === 'video') {
        startCameraStream();
      }
    }, 3200);
  };

  const handleHangUp = (showEndedScreen = true) => {
    conciergeAudio.stopRinging();
    conciergeAudio.playHangupChime();
    stopCameraStream();
    if (showEndedScreen && callState === 'connected') {
      setCallState('ended');
    } else {
      setCallState('idle');
    }
  };

  const handleQuickAddDuringCall = (product: Product) => {
    onAddToCart(product, product.sizes[0] || 'M', product.colorName, 1);
    setAddedItemName(product.name);
    setTimeout(() => setAddedItemName(null), 2500);
  };

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  const currentStylist = stylists[selectedStylist];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#141414] text-[#FDFDFD] border border-white/10 shadow-2xl flex flex-col max-h-[96vh] sm:max-h-[92vh] overflow-hidden">
        {/* Top Bar */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#1A1A1A]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <div>
              <span className="font-serif text-lg tracking-[0.16em] uppercase text-white font-light">
                Maison Concierge
              </span>
              <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest block">
                VIP Private Client Styling Suite · Encrypted Live Line
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {callState === 'idle' && (
              <div className="flex items-center border border-white/20 text-xs">
                <button
                  onClick={() => setActiveTab('live')}
                  className={`px-3 py-1.5 uppercase tracking-wider transition-colors ${
                    activeTab === 'live' ? 'bg-white text-[#1A1A1A] font-semibold' : 'text-white/70 hover:text-white'
                  }`}
                >
                  Direct Call
                </button>
                <button
                  onClick={() => setActiveTab('directory')}
                  className={`px-3 py-1.5 uppercase tracking-wider transition-colors ${
                    activeTab === 'directory' ? 'bg-white text-[#1A1A1A] font-semibold' : 'text-white/70 hover:text-white'
                  }`}
                >
                  Global Salons
                </button>
              </div>
            )}

            <button
              onClick={() => {
                handleHangUp(false);
                onClose();
              }}
              aria-label="Close concierge"
              className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto">
          {/* TAB 1: LIVE CONCIERGE CALL */}
          {activeTab === 'live' && (
            <div>
              {/* STATE: IDLE (Choose Stylist & Call Method) */}
              {callState === 'idle' && (
                <div className="p-6 sm:p-10 flex flex-col justify-between min-h-[480px]">
                  <div>
                    <div className="max-w-xl mb-8">
                      <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#D8CBBE] block mb-2">
                        Immediate Private Consultation
                      </span>
                      <h2 className="font-serif text-3xl sm:text-4xl text-white font-light uppercase tracking-tight mb-3">
                        Speak With An Atelier Stylist
                      </h2>
                      <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                        Connect live with our senior styling team in Milan or Biella for personalized wardrobe curation, silhouette sizing, fabric drape inspection, and bespoke commissions.
                      </p>
                    </div>

                    {/* Stylist Selector */}
                    <div className="mb-8">
                      <span className="text-[11px] font-mono uppercase tracking-widest text-white/50 block mb-3">
                        Select Available Stylist
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {(['camille', 'marco'] as const).map((key) => {
                          const s = stylists[key];
                          const isSelected = selectedStylist === key;
                          return (
                            <div
                              key={key}
                              onClick={() => setSelectedStylist(key)}
                              className={`p-4 border cursor-pointer transition-all flex items-center gap-4 ${
                                isSelected
                                  ? 'border-white bg-white/10'
                                  : 'border-white/15 bg-white/5 hover:border-white/40'
                              }`}
                            >
                              <div className="w-14 h-16 bg-neutral-800 overflow-hidden shrink-0">
                                <SafeImage
                                  src={s.avatar}
                                  alt={s.name}
                                  fallbackText={s.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-serif text-base text-white">{s.name}</h4>
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                </div>
                                <div className="text-[11px] text-white/80">{s.title}</div>
                                <div className="text-[10px] font-mono text-[#D8CBBE] truncate mt-0.5">
                                  {s.location}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Active Context Banner */}
                    {activeProduct && (
                      <div className="p-4 bg-white/5 border border-white/10 flex items-center justify-between gap-4 mb-8">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-12 bg-white/10 overflow-hidden shrink-0">
                            <SafeImage
                              src={activeProduct.primaryImage}
                              alt={activeProduct.name}
                              fallbackText={activeProduct.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <span className="text-[10px] uppercase tracking-wider text-white/50 block">
                              Active Inquiry Subject
                            </span>
                            <span className="font-serif text-sm text-white">
                              {activeProduct.name} (₹{new Intl.NumberFormat('en-IN').format(activeProduct.price)})
                            </span>
                          </div>
                        </div>
                        <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest hidden sm:inline">
                          Dossier Loaded
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Call Launch Buttons */}
                  <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center gap-4">
                    <button
                      onClick={() => handleStartCall('video')}
                      className="w-full sm:flex-1 py-4 bg-white text-[#1A1A1A] text-xs uppercase tracking-[0.22em] font-medium hover:bg-[#D8CBBE] transition-colors flex items-center justify-center gap-3 shadow-xl active:scale-[0.99]"
                    >
                      <Video className="w-4 h-4" />
                      <span>Start 1-on-1 Video Consultation</span>
                    </button>

                    <button
                      onClick={() => handleStartCall('audio')}
                      className="w-full sm:flex-1 py-4 bg-transparent border border-white/30 text-white text-xs uppercase tracking-[0.22em] font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-3 active:scale-[0.99]"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Direct Audio Call</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STATE: RINGING (Outgoing connection) */}
              {callState === 'ringing' && (
                <div className="p-12 sm:p-20 flex flex-col items-center justify-center text-center min-h-[480px]">
                  <div className="relative mb-8">
                    <div className="w-28 h-32 rounded-sm overflow-hidden border-2 border-white/30 shadow-2xl">
                      <SafeImage
                        src={currentStylist.avatar}
                        alt={currentStylist.name}
                        fallbackText={currentStylist.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Ringing pulse wave circles */}
                    <div className="absolute inset-0 border-2 border-white/40 rounded-sm animate-ping pointer-events-none" />
                  </div>

                  <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#D8CBBE] mb-2">
                    Connecting Private Line...
                  </span>

                  <h3 className="font-serif text-3xl text-white font-light mb-1">
                    {currentStylist.name}
                  </h3>
                  <p className="text-xs text-white/60 mb-8">{currentStylist.location}</p>

                  <div className="flex items-center gap-2 text-xs font-mono text-white/70 mb-10">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <span>Dialing Atelier Milan Salon (Encrypted)</span>
                  </div>

                  <button
                    onClick={() => handleHangUp(false)}
                    className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition-colors shadow-2xl active:scale-95"
                    title="Cancel Call"
                  >
                    <PhoneOff className="w-6 h-6" />
                  </button>
                </div>
              )}

              {/* STATE: CONNECTED (Active live call with video & interactive suite) */}
              {callState === 'connected' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
                  {/* Left Column: Live Call Stage */}
                  <div className="lg:col-span-8 relative bg-black flex flex-col justify-between p-4 sm:p-6 min-h-[420px] lg:min-h-[520px]">
                    {/* Background Visual: Stylist Video Stream or Audio Visualizer */}
                    {callType === 'video' ? (
                      <div className="absolute inset-0 overflow-hidden">
                        <SafeImage
                          src={currentStylist.avatar}
                          alt={currentStylist.name}
                          fallbackText="Stylist Live Feed"
                          className="w-full h-full object-cover filter contrast-[1.05]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/60 pointer-events-none" />
                      </div>
                    ) : (
                      /* Audio Call Mode Visualizer */
                      <div className="absolute inset-0 bg-gradient-to-b from-[#181818] to-[#0D0D0D] flex flex-col items-center justify-center p-8">
                        <div className="w-24 h-28 overflow-hidden border border-white/20 mb-6">
                          <SafeImage
                            src={currentStylist.avatar}
                            alt={currentStylist.name}
                            fallbackText={currentStylist.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="font-serif text-2xl text-white font-light">{currentStylist.name}</h4>
                        <span className="font-mono text-xs text-[#D8CBBE] mt-1">{currentStylist.title}</span>

                        {/* Animated Sound Wave Bars */}
                        <div className="flex items-center gap-1.5 mt-8 h-10">
                          {[30, 60, 90, 45, 80, 100, 70, 50, 85, 40, 65, 30].map((h, i) => (
                            <div
                              key={i}
                              style={{
                                height: isSpeakerMuted ? '4px' : `${h}%`,
                                animationDuration: `${0.6 + (i % 5) * 0.2}s`,
                              }}
                              className="w-1 bg-white/70 rounded-full animate-pulse transition-all duration-300"
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Top Call Info Bar */}
                    <div className="relative z-10 flex items-center justify-between bg-black/40 backdrop-blur-md px-4 py-2 border border-white/10">
                      <div className="flex items-center gap-3">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="font-serif text-sm text-white">{currentStylist.name}</span>
                        <span className="text-[10px] text-white/50 hidden sm:inline">· HD 1080p</span>
                      </div>
                      <div className="flex items-center gap-2 font-mono text-xs text-white/90">
                        <Clock className="w-3.5 h-3.5 text-[#D8CBBE]" />
                        <span>{formatSeconds(callDuration)}</span>
                      </div>
                    </div>

                    {/* Picture-in-Picture: Client Local Camera */}
                    {callType === 'video' && (
                      <div className="relative z-10 self-end w-28 sm:w-36 aspect-[3/4] bg-neutral-900 border border-white/30 overflow-hidden shadow-2xl">
                        {isCameraOn ? (
                          <video
                            ref={localVideoRef}
                            autoPlay
                            playsInline
                            muted
                            className="w-full h-full object-cover transform -scale-x-100"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center bg-neutral-900 text-white/50 text-[10px]">
                            <User className="w-6 h-6 mb-1 text-white/40" />
                            <span>Camera Off</span>
                          </div>
                        )}
                        <span className="absolute bottom-1 left-1.5 font-mono text-[8px] bg-black/60 px-1 py-0.5 text-white/70">
                          YOU
                        </span>
                      </div>
                    )}

                    {/* Bottom In-Call Controls */}
                    <div className="relative z-10 flex items-center justify-center gap-4 pt-4">
                      {/* Mic Toggle */}
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        aria-label={isMuted ? 'Unmute microphone' : 'Mute microphone'}
                        className={`w-11 h-11 rounded-full flex items-center justify-center border transition-all ${
                          isMuted
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                            : 'bg-white/15 border-white/20 text-white hover:bg-white/25'
                        }`}
                      >
                        {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                      </button>

                      {/* Video Toggle */}
                      {callType === 'video' && (
                        <button
                          onClick={() => setIsCameraOn(!isCameraOn)}
                          aria-label={isCameraOn ? 'Turn camera off' : 'Turn camera on'}
                          className={`w-11 h-11 rounded-full flex items-center justify-center border transition-all ${
                            !isCameraOn
                              ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                              : 'bg-white/15 border-white/20 text-white hover:bg-white/25'
                          }`}
                        >
                          {isCameraOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                        </button>
                      )}

                      {/* Speaker Mute */}
                      <button
                        onClick={() => setIsSpeakerMuted(!isSpeakerMuted)}
                        aria-label={isSpeakerMuted ? 'Unmute audio' : 'Mute audio'}
                        className="w-11 h-11 rounded-full bg-white/15 border border-white/20 text-white hover:bg-white/25 flex items-center justify-center transition-all"
                      >
                        {isSpeakerMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>

                      {/* Hang up button */}
                      <button
                        onClick={() => handleHangUp(true)}
                        aria-label="End call"
                        className="w-14 h-11 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition-colors shadow-2xl active:scale-95"
                      >
                        <PhoneOff className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Stylist Recommendations & Live Notes */}
                  <div className="lg:col-span-4 bg-[#1A1A1A] p-5 sm:p-6 border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col justify-between">
                    <div>
                      {/* Stylist Live Voice Note */}
                      <div className="mb-6">
                        <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#D8CBBE] mb-2">
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Stylist Commentary</span>
                        </div>
                        <div className="p-3.5 bg-white/5 border border-white/10 text-xs text-white/90 font-light leading-relaxed italic">
                          {stylistNotes[stylistNoteIndex]}
                        </div>
                      </div>

                      {/* Stylist Presented Garment */}
                      <div>
                        <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-white/60 mb-3">
                          <span>Piece Under Review</span>
                          <span className="text-emerald-400">Live Stage</span>
                        </div>

                        <div className="p-3 bg-white/5 border border-white/15 flex gap-3 mb-4">
                          <div className="w-16 h-20 bg-neutral-800 overflow-hidden shrink-0">
                            <SafeImage
                              src={featuredPiece.primaryImage}
                              alt={featuredPiece.name}
                              fallbackText={featuredPiece.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="flex-1 flex flex-col justify-between min-w-0">
                            <div>
                              <h5 className="font-serif text-sm text-white truncate">
                                {featuredPiece.name}
                              </h5>
                              <div className="font-mono text-xs text-[#D8CBBE] mt-0.5">
                                ₹{new Intl.NumberFormat('en-IN').format(featuredPiece.price)}
                              </div>
                              <span className="text-[10px] text-white/60">
                                100% Virgin Biella Wool
                              </span>
                            </div>

                            <button
                              onClick={() => handleQuickAddDuringCall(featuredPiece)}
                              className="w-full py-1.5 mt-2 bg-white text-[#1A1A1A] text-[10px] uppercase tracking-wider font-semibold hover:bg-[#D8CBBE] transition-colors flex items-center justify-center gap-1.5"
                            >
                              {addedItemName === featuredPiece.name ? (
                                <>
                                  <Check className="w-3 h-3" />
                                  <span>Added To Bag</span>
                                </>
                              ) : (
                                <>
                                  <ShoppingBag className="w-3 h-3" />
                                  <span>Add Directly To Bag</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Paired Recommendation */}
                        <div className="text-[10px] font-mono uppercase tracking-widest text-white/60 mb-2">
                          Curated Pairing
                        </div>

                        <div className="p-2.5 bg-white/5 border border-white/10 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-9 h-11 bg-neutral-800 overflow-hidden shrink-0">
                              <SafeImage
                                src={pairedPiece.primaryImage}
                                alt={pairedPiece.name}
                                fallbackText={pairedPiece.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="min-w-0">
                              <div className="font-serif text-xs text-white truncate">
                                {pairedPiece.name}
                              </div>
                              <div className="font-mono text-[10px] text-white/70">
                                ₹{new Intl.NumberFormat('en-IN').format(pairedPiece.price)}
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => handleQuickAddDuringCall(pairedPiece)}
                            className="px-2.5 py-1 text-[10px] uppercase tracking-wider border border-white/30 text-white hover:bg-white hover:text-[#1A1A1A] transition-colors shrink-0"
                          >
                            + Bag
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10 text-[10px] text-white/50 flex items-center justify-between">
                      <span>End-to-End Encryption</span>
                      <Shield className="w-3.5 h-3.5 text-white/40" />
                    </div>
                  </div>
                </div>
              )}

              {/* STATE: ENDED (Summary dossier & follow-up) */}
              {callState === 'ended' && (
                <div className="p-8 sm:p-14 flex flex-col items-center text-center max-w-lg mx-auto min-h-[480px] justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white mb-6">
                    <Check className="w-6 h-6 stroke-[1.5]" />
                  </div>

                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#D8CBBE] mb-2">
                    Consultation Concluded
                  </span>

                  <h3 className="font-serif text-3xl text-white font-light mb-3">
                    Thank You For Calling
                  </h3>

                  <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed mb-6">
                    Your session with {currentStylist.name} has concluded. Duration: <strong>{formatSeconds(callDuration)}</strong>. A bespoke sizing record and styling dossier have been generated for your client profile.
                  </p>

                  <div className="w-full p-4 bg-white/5 border border-white/10 text-left text-xs space-y-2 mb-8 text-white/80 font-mono">
                    <div className="flex justify-between border-b border-white/10 pb-2 font-serif text-white text-sm">
                      <span>Summary Receipt</span>
                      <span>#CL-2026-08</span>
                    </div>
                    <div className="flex justify-between">
                      <span>STYLIST:</span>
                      <span className="text-white">{currentStylist.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>RECOMMENDED SIZE:</span>
                      <span className="text-white">Medium (40/EU)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>HEM INSTRUCTIONS:</span>
                      <span className="text-white">Unhemmed tailored finish</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <button
                      onClick={() => setCallState('idle')}
                      className="flex-1 py-3 bg-white text-[#1A1A1A] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#D8CBBE] transition-colors"
                    >
                      New Call
                    </button>
                    <button
                      onClick={onClose}
                      className="flex-1 py-3 border border-white/30 text-white text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-colors"
                    >
                      Return to Boutique
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: GLOBAL ATELIER SALONS TELEPHONE DIRECTORY */}
          {activeTab === 'directory' && (
            <div className="p-6 sm:p-10">
              <div className="max-w-xl mb-8">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#D8CBBE] block mb-2">
                  Direct Worldwide Lines
                </span>
                <h3 className="font-serif text-3xl text-white font-light uppercase tracking-tight mb-2">
                  Atelier Telephone Directory
                </h3>
                <p className="text-xs text-white/70 font-light leading-relaxed">
                  Call our private client salons worldwide directly from your phone. Our bilingual concierges are available across Milan, Paris, London, New York, Tokyo, and Mumbai.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {atelierSalons.map((salon) => (
                  <div
                    key={salon.city}
                    className="p-5 bg-white/5 border border-white/10 flex flex-col justify-between hover:border-white/30 transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-serif text-lg text-white font-light">{salon.city}</h4>
                        <span className="text-[9px] font-mono uppercase tracking-widest text-[#D8CBBE]">
                          {salon.hours}
                        </span>
                      </div>
                      <p className="text-xs text-white/60 mb-4 font-light">{salon.address}</p>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      <span className="font-mono text-sm text-white font-medium">
                        {salon.phone}
                      </span>
                      <a
                        href={`tel:${salon.phone.replace(/\s+/g, '')}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-[#1A1A1A] text-[10px] uppercase tracking-wider font-semibold hover:bg-[#D8CBBE] transition-colors"
                      >
                        <Phone className="w-3 h-3" />
                        <span>Call Line</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-white/5 border border-white/10 flex items-center justify-between text-xs text-white/70">
                <span>Direct Toll-Free Global Concierge Hotline:</span>
                <a
                  href="tel:+18005550199"
                  className="font-mono font-semibold text-white hover:underline flex items-center gap-1.5"
                >
                  <span>1-800-ATELIER</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

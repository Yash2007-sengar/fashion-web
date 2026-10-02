import React, { useState } from 'react';
import { Camera, Sparkles, Upload, Scan, Check, RefreshCw, X, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { SafeImage } from './SafeImage';

interface VirtualTryOnProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const VirtualTryOn: React.FC<VirtualTryOnProps> = ({ products, onSelectProduct }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedGarment, setSelectedGarment] = useState<Product>(products[0]);
  const [modelType, setModelType] = useState<'model1' | 'model2' | 'user'>('model1');
  const [isScanning, setIsScanning] = useState(false);
  const [hasScanned, setHasScanned] = useState(false);
  const [uploadedUserImg, setUploadedUserImg] = useState<string | null>(null);

  const modelImages = {
    model1: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85',
    model2: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=85',
  };

  const handleStartScanning = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setHasScanned(true);
      setStep(3);
    }, 2200);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedUserImg(url);
      setModelType('user');
    }
  };

  return (
    <section id="try-on" className="w-full py-20 sm:py-32 bg-[#F4F0EB]/60 border-t border-[#E8E5E1]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Showcase with AR Scan Effect */}
          <div className="lg:col-span-6 relative aspect-[4/5] max-h-[640px] overflow-hidden bg-[#E8E5E1] border border-[#E8E5E1] group">
            <SafeImage
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85"
              alt="Virtual Try-On Simulation"
              fallbackText="Virtual Try-On Simulation"
              className="w-full h-full object-cover filter contrast-[1.05]"
            />

            {/* Simulated AR Wireframe Lines */}
            <div className="absolute inset-0 pointer-events-none border border-white/30 m-4 flex flex-col justify-between p-4">
              <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-white/90 bg-black/40 backdrop-blur-xs px-2.5 py-1">
                <span>AR KINETIC FIT ENGINE</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  3D MESH READY
                </span>
              </div>

              {/* Center Target Box */}
              <div className="self-center w-48 h-64 border border-dashed border-white/50 relative flex items-center justify-center">
                <span className="text-[10px] font-mono tracking-widest text-white/70 uppercase">
                  Silhouette Detection
                </span>
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono text-white/80">
                <span>ACCURACY: 99.4%</span>
                <span>BIELLA DRAPE MAPPING</span>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute bottom-8 right-8 bg-[#FDFDFD] text-[#1A1A1A] p-4 shadow-xl border border-[#E8E5E1] max-w-[200px]">
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#888888] block mb-1">
                Proprietary Tech
              </span>
              <p className="font-serif text-sm font-medium leading-tight">
                Sub-millimeter fabric drape simulation.
              </p>
            </div>
          </div>

          {/* Right Column: Information & Trigger */}
          <div className="lg:col-span-6 flex flex-col items-start lg:pl-8">
            <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-[#666666] mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#1A1A1A]" />
              <span>Digital Fitting Room</span>
            </div>

            <h2 className="font-serif text-4xl sm:text-6xl font-light tracking-tight text-[#1A1A1A] uppercase mb-6 leading-[1.05]">
              See It On You.
            </h2>

            <div className="w-12 h-[1px] bg-[#1A1A1A] mb-8" />

            <p className="text-base sm:text-lg text-[#666666] font-light leading-relaxed mb-8 max-w-xl">
              Experience the collection through our virtual styling technology. See how our structured overcoats, fluid silk dresses, and tailored trousers drape across your exact proportions before commissioning your piece.
            </p>

            <div className="grid grid-cols-3 gap-6 w-full max-w-md py-6 border-y border-[#E8E5E1] mb-10 text-xs">
              <div>
                <span className="font-mono text-[10px] text-[#999999] block mb-1">01</span>
                <span className="font-serif font-medium text-[#1A1A1A] block">Upload Photo</span>
                <span className="text-[11px] text-[#777777]">Or use editorial model</span>
              </div>
              <div>
                <span className="font-mono text-[10px] text-[#999999] block mb-1">02</span>
                <span className="font-serif font-medium text-[#1A1A1A] block">Select Piece</span>
                <span className="text-[11px] text-[#777777]">Any silhouette</span>
              </div>
              <div>
                <span className="font-mono text-[10px] text-[#999999] block mb-1">03</span>
                <span className="font-serif font-medium text-[#1A1A1A] block">See The Look</span>
                <span className="text-[11px] text-[#777777]">Real-time drape</span>
              </div>
            </div>

            <button
              onClick={() => {
                setModalOpen(true);
                setStep(1);
                setHasScanned(false);
              }}
              className="group inline-flex items-center gap-3 bg-[#1A1A1A] text-[#FDFDFD] px-8 py-4 text-xs uppercase tracking-[0.22em] font-medium hover:bg-[#000000] transition-colors shadow-lg active:scale-[0.99]"
            >
              <Camera className="w-4 h-4" />
              <span>Start Virtual Try-On</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>

      {/* INTERACTIVE VIRTUAL TRY-ON MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-8 animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-[#FDFDFD] shadow-2xl border border-[#E8E5E1] flex flex-col max-h-[92vh] overflow-hidden">
            {/* Header */}
            <div className="px-6 py-5 border-b border-[#E8E5E1] flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="font-serif text-xl uppercase tracking-wider text-[#1A1A1A]">
                  Virtual Try-On
                </span>
                <span className="font-mono text-[10px] text-[#666666] tracking-widest hidden sm:inline-block">
                  STEP 0{step} OF 03
                </span>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                aria-label="Close modal"
                className="p-1 hover:opacity-70 transition-opacity"
              >
                <X className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Left Preview Screen */}
              <div className="md:col-span-7 relative aspect-[3/4] bg-[#F4F0EB] overflow-hidden border border-[#E8E5E1]">
                {/* Active Model or Uploaded Photo */}
                <SafeImage
                  src={
                    modelType === 'user' && uploadedUserImg
                      ? uploadedUserImg
                      : modelImages[modelType === 'model2' ? 'model2' : 'model1']
                  }
                  alt="Fitting preview"
                  fallbackText="Virtual Model"
                  className="w-full h-full object-cover"
                />

                {/* Overlaid Garment Simulation */}
                {step === 3 && (
                  <div className="absolute inset-0 bg-black/20 flex flex-col justify-end p-6">
                    <div className="bg-[#FDFDFD]/95 backdrop-blur-xs p-4 border border-[#E8E5E1] text-[#1A1A1A] animate-fadeIn">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="text-[10px] font-mono uppercase text-[#666666] block">
                            Simulated Drapery
                          </span>
                          <h4 className="font-serif text-lg font-medium">{selectedGarment.name}</h4>
                        </div>
                        <span className="font-mono text-sm font-semibold">
                          ₹{new Intl.NumberFormat('en-IN').format(selectedGarment.price)}
                        </span>
                      </div>
                      <p className="text-xs text-[#666666] mb-3">
                        True-to-scale fit calibrated for selected model height & shoulder width.
                      </p>
                      <button
                        onClick={() => {
                          setModalOpen(false);
                          onSelectProduct(selectedGarment);
                        }}
                        className="w-full py-2 bg-[#1A1A1A] text-white text-[11px] uppercase tracking-wider font-medium hover:bg-black transition-colors"
                      >
                        Inspect Product Details →
                      </button>
                    </div>
                  </div>
                )}

                {/* Scanning Animation Line */}
                {isScanning && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="absolute top-0 inset-x-0 h-1 bg-white animate-bounce shadow-xl" />
                    <div className="flex flex-col items-center gap-2 bg-[#FDFDFD] px-6 py-4 border border-[#E8E5E1]">
                      <Scan className="w-6 h-6 animate-spin text-[#1A1A1A]" />
                      <span className="font-mono text-xs uppercase tracking-widest text-[#1A1A1A]">
                        Analyzing Biometrics & Drape...
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Steps Controls */}
              <div className="md:col-span-5 flex flex-col justify-between">
                <div>
                  {/* Step 1: Model Choice */}
                  {step === 1 && (
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#666666] block mb-2">
                        Step 01
                      </span>
                      <h3 className="font-serif text-2xl font-light mb-4">Choose Canvas</h3>
                      <p className="text-xs text-[#666666] mb-6 leading-relaxed">
                        Select an editorial mannequin or upload a full-body photograph to simulate your silhouette.
                      </p>

                      <div className="flex flex-col gap-3 mb-6">
                        <button
                          onClick={() => setModelType('model1')}
                          className={`p-3 text-left border flex items-center justify-between text-xs transition-colors ${
                            modelType === 'model1'
                              ? 'border-[#1A1A1A] bg-[#F4F0EB]'
                              : 'border-[#E8E5E1] hover:bg-[#FDFDFD]'
                          }`}
                        >
                          <div>
                            <div className="font-medium text-[#1A1A1A]">Editorial Model A</div>
                            <div className="text-[11px] text-[#666666]">Height: 178cm · Size 36/S</div>
                          </div>
                          {modelType === 'model1' && <Check className="w-4 h-4 text-[#1A1A1A]" />}
                        </button>

                        <button
                          onClick={() => setModelType('model2')}
                          className={`p-3 text-left border flex items-center justify-between text-xs transition-colors ${
                            modelType === 'model2'
                              ? 'border-[#1A1A1A] bg-[#F4F0EB]'
                              : 'border-[#E8E5E1] hover:bg-[#FDFDFD]'
                          }`}
                        >
                          <div>
                            <div className="font-medium text-[#1A1A1A]">Editorial Model B</div>
                            <div className="text-[11px] text-[#666666]">Height: 188cm · Size 48/M</div>
                          </div>
                          {modelType === 'model2' && <Check className="w-4 h-4 text-[#1A1A1A]" />}
                        </button>

                        <label className="p-3 border border-dashed border-[#1A1A1A]/40 flex items-center justify-center gap-2 text-xs uppercase tracking-wider text-[#1A1A1A] cursor-pointer hover:bg-[#F4F0EB] transition-colors">
                          <Upload className="w-4 h-4" />
                          <span>{uploadedUserImg ? 'Change Photo' : 'Upload Your Photo'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                        </label>
                      </div>

                      <button
                        onClick={() => setStep(2)}
                        className="w-full py-3.5 bg-[#1A1A1A] text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-black transition-colors"
                      >
                        Continue to Select Piece →
                      </button>
                    </div>
                  )}

                  {/* Step 2: Piece Selection */}
                  {step === 2 && (
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#666666] block mb-2">
                        Step 02
                      </span>
                      <h3 className="font-serif text-2xl font-light mb-4">Select A Piece</h3>
                      <p className="text-xs text-[#666666] mb-4">
                        Pick any archival piece from the Autumn / Winter edit:
                      </p>

                      <div className="flex flex-col gap-2.5 max-h-[300px] overflow-y-auto pr-1 mb-6">
                        {products.map((p) => (
                          <div
                            key={p.id}
                            onClick={() => setSelectedGarment(p)}
                            className={`p-2.5 border flex items-center gap-3 cursor-pointer transition-colors ${
                              selectedGarment.id === p.id
                                ? 'border-[#1A1A1A] bg-[#F4F0EB]'
                                : 'border-[#E8E5E1] hover:border-[#1A1A1A]/40'
                            }`}
                          >
                            <div className="w-12 h-14 bg-white overflow-hidden shrink-0">
                              <SafeImage
                                src={p.primaryImage}
                                alt={p.name}
                                fallbackText={p.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h5 className="font-serif text-xs text-[#1A1A1A] font-medium truncate">
                                {p.name}
                              </h5>
                              <span className="font-mono text-[11px] text-[#666666]">
                                ₹{new Intl.NumberFormat('en-IN').format(p.price)}
                              </span>
                            </div>
                            {selectedGarment.id === p.id && (
                              <Check className="w-4 h-4 text-[#1A1A1A] shrink-0" />
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => setStep(1)}
                          className="px-4 py-3 border border-[#E8E5E1] text-xs uppercase tracking-wider"
                        >
                          Back
                        </button>
                        <button
                          onClick={handleStartScanning}
                          className="flex-1 py-3 bg-[#1A1A1A] text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-black transition-colors"
                        >
                          Calculate Drape Simulation →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Result & Try-on Output */}
                  {step === 3 && (
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#666666] block mb-2">
                        Step 03 · Completed
                      </span>
                      <h3 className="font-serif text-2xl font-light mb-2">Simulated Fit</h3>
                      <div className="w-8 h-[1px] bg-[#1A1A1A] mb-4" />

                      <p className="text-xs text-[#666666] mb-6 leading-relaxed">
                        The {selectedGarment.name} has been calibrated onto your chosen profile. Fabric tension: optimal. Hem drop: true to design specs.
                      </p>

                      <div className="bg-[#F4F0EB] p-4 border border-[#E8E5E1] text-xs space-y-2 mb-6 font-mono text-[#666666]">
                        <div className="flex justify-between">
                          <span>SILHOUETTE:</span>
                          <span className="text-[#1A1A1A] font-semibold">Architectural Oversized</span>
                        </div>
                        <div className="flex justify-between">
                          <span>RECOMMENDED SIZE:</span>
                          <span className="text-[#1A1A1A] font-semibold">M (38–40)</span>
                        </div>
                        <div className="flex justify-between">
                          <span>DRAPE CONFIDENCE:</span>
                          <span className="text-[#1A1A1A] font-semibold">99.2%</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => setStep(2)}
                          className="w-full py-2.5 border border-[#1A1A1A] text-xs uppercase tracking-wider text-[#1A1A1A] flex items-center justify-center gap-2 hover:bg-[#1A1A1A] hover:text-white transition-colors"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>Try Another Garment</span>
                        </button>
                        <button
                          onClick={() => {
                            setModalOpen(false);
                            onSelectProduct(selectedGarment);
                          }}
                          className="w-full py-3 bg-[#1A1A1A] text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-black transition-colors"
                        >
                          Order This Silhouette →
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

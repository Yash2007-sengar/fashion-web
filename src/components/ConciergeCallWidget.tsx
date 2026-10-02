import React from 'react';
import { PhoneCall, Sparkles } from 'lucide-react';

interface ConciergeCallWidgetProps {
  onOpenCall: () => void;
}

export const ConciergeCallWidget: React.FC<ConciergeCallWidgetProps> = ({ onOpenCall }) => {
  return (
    <div className="fixed bottom-6 left-6 z-40">
      <button
        onClick={onOpenCall}
        aria-label="Call Maison Concierge"
        className="group relative flex items-center gap-3 bg-[#1A1A1A]/95 text-[#FDFDFD] backdrop-blur-md px-4 py-3 border border-white/20 shadow-2xl hover:bg-black transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
      >
        <span className="relative flex items-center justify-center">
          <PhoneCall className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </span>

        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#D8CBBE]">
              Maison Concierge
            </span>
          </div>
          <span className="text-xs font-serif tracking-wide text-white">
            Call An Atelier Stylist
          </span>
        </div>
      </button>
    </div>
  );
};

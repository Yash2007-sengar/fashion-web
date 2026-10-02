import React from 'react';
import { Check, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-[#1A1A1A] text-[#FDFDFD] px-5 py-3.5 shadow-2xl border border-white/10 flex items-center gap-3 animate-slideUp">
      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
      <span className="text-xs font-medium tracking-wide">{message}</span>
      <button
        onClick={onClose}
        aria-label="Dismiss notice"
        className="p-1 -mr-1 text-white/60 hover:text-white transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

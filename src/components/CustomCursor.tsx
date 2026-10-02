import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isImageHover, setIsImageHover] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Check if touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isClickable = Boolean(
        target.closest('button') ||
        target.closest('a') ||
        target.closest('input') ||
        target.closest('[role="button"]')
      );
      setIsPointer(isClickable);

      const isImg = Boolean(
        target.closest('[data-cursor-view]') ||
        target.closest('.cursor-view-target')
      );
      setIsImageHover(isImg);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Outer follow circle */}
      <div
        className="pointer-events-none fixed z-50 transition-transform duration-100 ease-out will-change-transform"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
        }}
      >
        {isImageHover ? (
          <div className="w-16 h-16 rounded-full bg-[#1A1A1A]/90 text-[#FDFDFD] flex items-center justify-center text-[10px] tracking-[0.25em] font-medium uppercase backdrop-blur-xs transition-all duration-300 scale-100 border border-white/20 shadow-xl">
            VIEW
          </div>
        ) : isPointer ? (
          <div className="w-8 h-8 rounded-full border border-[#1A1A1A]/40 bg-[#1A1A1A]/10 transition-all duration-200 scale-100" />
        ) : (
          <div className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A] transition-all duration-150" />
        )}
      </div>
    </>
  );
};

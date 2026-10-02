import React, { useState } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackText?: string;
  className?: string;
  wrapperClassName?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt = 'Luxury garment',
  fallbackText,
  className = '',
  wrapperClassName = '',
  ...props
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-[#F4F0EB] ${wrapperClassName}`}>
      {!loaded && !error && (
        <div className="absolute inset-0 bg-[#F4F0EB] animate-pulse" />
      )}

      {error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[#F4F0EB] border border-[#E8E5E1]">
          <span className="font-serif text-2xl tracking-widest text-[#1A1A1A] mb-2">A·V</span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#666666] font-medium">
            {fallbackText || alt || 'Maison Vérité Archive'}
          </span>
          <span className="text-[9px] uppercase tracking-widest text-[#999999] mt-2">
            Autumn / Winter Edit
          </span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`w-full h-full object-cover transition-opacity duration-700 ${
            loaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          {...props}
        />
      )}
    </div>
  );
};

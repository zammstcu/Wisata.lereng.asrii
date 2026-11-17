import { useState } from 'react';
import { Mountain } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}

export function SafeImage({ src, alt, className = '', fallbackLabel }: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#E8F0EA] via-[#F4EFE6] to-[#E6DFD1] text-[#1B4332] p-6 text-center ${className}`}
      >
        <Mountain className="w-8 h-8 mb-2 opacity-70" aria-hidden="true" />
        <span className="text-sm font-semibold tracking-tight opacity-85">
          {fallbackLabel || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}

'use client';

import type { LucideIcon } from 'lucide-react';
import Image from 'next/image';

interface ImagePreviewProps {
  src: string | null;
  alt: string;
  placeholderIcon: LucideIcon;
  onClick?: () => void;
  className?: string;
}

export function ImagePreview({
  src,
  alt,
  placeholderIcon: PlaceholderIcon,
  onClick,
  className = '',
}: ImagePreviewProps) {
  return (
    <div
      className={`w-full md:w-1/3 aspect-square bg-black/50 rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden relative ${
        onClick ? 'cursor-zoom-in' : ''
      } ${className}`}
      onClick={onClick}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
          unoptimized
        />
      ) : (
        <div className="text-neutral-700 text-6xl opacity-20">
          <PlaceholderIcon />
        </div>
      )}
    </div>
  );
}

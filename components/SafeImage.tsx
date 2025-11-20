"use client";

import { useState } from "react";

interface SafeImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
  fallbackSrc?: string;
}

export function SafeImage({
  src,
  alt,
  fill,
  className,
  priority,
  width,
  height,
  fallbackSrc = "https://via.placeholder.com/800x600/0ea5e9/ffffff?text=DCMS",
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  // Handle image load error
  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  // Use regular img tag for better compatibility with external images
  if (fill) {
    return (
      <img
        src={hasError ? fallbackSrc : imgSrc}
        alt={alt}
        className={className}
        style={{ objectFit: "cover", width: "100%", height: "100%" }}
        onError={handleError}
        loading={priority ? "eager" : "lazy"}
      />
    );
  }

  return (
    <img
      src={hasError ? fallbackSrc : imgSrc}
      alt={alt}
      className={className}
      width={width}
      height={height}
      onError={handleError}
      loading={priority ? "eager" : "lazy"}
    />
  );
}


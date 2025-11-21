"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useVideoTheme } from "./VideoThemeManager";

interface VideoBackgroundProps {
  videoSrc?: string;
  fallbackImage?: string;
  overlay?: boolean;
}

export function VideoBackground({
  videoSrc,
  fallbackImage,
  overlay = true,
}: VideoBackgroundProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { setIsVideoDark } = useVideoTheme();

  useEffect(() => {
    const video = videoRef.current;
    if (video && videoSrc) {
      // Set video quality and performance optimizations
      video.playsInline = true;
      video.setAttribute("playsinline", "true");
      video.setAttribute("webkit-playsinline", "true");
      
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsLoaded(true);
          })
          .catch(() => {
            setHasError(true);
          });
      }

      // Detect video brightness to determine if it's dark or light - optimized for faster updates
      let animationFrameId: number | null = null;
      let lastCheckTime = 0;
      const checkInterval = 300; // Check every 300ms for faster response
      
      const detectBrightness = () => {
        const now = performance.now();
        if (now - lastCheckTime < checkInterval) {
          animationFrameId = requestAnimationFrame(detectBrightness);
          return;
        }
        lastCheckTime = now;
        
        if (!video || video.readyState < 2) {
          animationFrameId = requestAnimationFrame(detectBrightness);
          return;
        }
        
        try {
          const canvas = document.createElement("canvas");
          canvas.width = 32; // Even smaller canvas for faster processing
          canvas.height = 32;
          const ctx = canvas.getContext("2d", { willReadFrequently: false });
          if (!ctx) {
            animationFrameId = requestAnimationFrame(detectBrightness);
            return;
          }

          ctx.drawImage(video, 0, 0, 32, 32);
          const imageData = ctx.getImageData(0, 0, 32, 32);
          const data = imageData.data;
          
          let brightness = 0;
          let pixelCount = 0;
          // Sample every 8th pixel for maximum performance
          for (let i = 0; i < data.length; i += 32) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            brightness += (r * 299 + g * 587 + b * 114) / 1000;
            pixelCount++;
          }
          brightness = brightness / pixelCount;
          
          // If average brightness is less than 128, consider it dark
          setIsVideoDark(brightness < 128);
        } catch (error) {
          // Fallback: assume light if detection fails
          setIsVideoDark(false);
        }
        
        // Continue checking
        animationFrameId = requestAnimationFrame(detectBrightness);
      };

      // Start detection immediately and on load
      detectBrightness();
      video.addEventListener("loadeddata", detectBrightness);

      return () => {
        if (animationFrameId !== null) {
          cancelAnimationFrame(animationFrameId);
        }
        video.removeEventListener("loadeddata", detectBrightness);
      };
    }
  }, [videoSrc, setIsVideoDark]);

  if (!videoSrc || hasError) {
    return (
      <div className="fixed inset-0 -z-10">
        {fallbackImage && (
          <img
            src={fallbackImage}
            alt="Background"
            className="w-full h-full object-cover"
          />
        )}
        {overlay && (
          <div className="absolute inset-0 bg-green-800/20" />
        )}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }} suppressHydrationWarning>
      {/* Premium Video Background with Enhanced Effects */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0.3 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full h-full"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
        suppressHydrationWarning
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          style={{
            filter: "brightness(1) contrast(1.1) saturate(1.1)",
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            willChange: 'auto',
            transform: 'translate3d(0, 0, 0)',
            backgroundColor: 'transparent',
            zIndex: -1,
          }}
          onLoadedData={() => setIsLoaded(true)}
          onCanPlay={() => setIsLoaded(true)}
          onLoadedMetadata={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          suppressHydrationWarning
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        
        {/* Light Overlay for Better Text Readability - Reduced for clearer video */}
        {overlay && (
          <>
            {/* Light base gradient overlay - much lighter */}
            <div 
              className="absolute inset-0 bg-green-800/10"
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                willChange: 'transform',
                transform: 'translate3d(0, 0, 0)',
              }}
            />
            
            {/* Very subtle vignette effect */}
            <div 
              className="absolute inset-0"
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.05) 100%)",
                willChange: 'transform',
                transform: 'translate3d(0, 0, 0)',
              }}
            />
          </>
        )}
      </motion.div>
    </div>
  );
}



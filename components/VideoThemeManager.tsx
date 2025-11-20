"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { VideoBackground } from "./VideoBackground";

interface VideoThemeContextType {
  isVideoDark: boolean;
  setIsVideoDark: (isDark: boolean) => void;
}

const VideoThemeContext = createContext<VideoThemeContextType | undefined>(undefined);

export function useVideoTheme() {
  const context = useContext(VideoThemeContext);
  if (context === undefined) {
    // Return default values if context is not available
    return { isVideoDark: false, setIsVideoDark: () => {} };
  }
  return context;
}

export function VideoThemeProvider({ children }: { children: ReactNode }) {
  const [isVideoDark, setIsVideoDark] = useState(false);

  return (
    <VideoThemeContext.Provider value={{ isVideoDark, setIsVideoDark }}>
      {children}
    </VideoThemeContext.Provider>
  );
}

// Video background is now enabled with your video!
export function VideoThemeManager() {
  // Your video is now set as the live background theme
  // Add cache-busting parameter - update this version number when you change the video
  const videoVersion = "3"; // Increment this when you update the video file
  const videoSrc = `/videos/deccandone.mp4?v=${videoVersion}`;

  return (
    <VideoBackground
      videoSrc={videoSrc}
      overlay={true}
      fallbackImage="/images/fallback-bg.jpg"
    />
  );
}



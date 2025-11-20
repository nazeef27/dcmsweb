"use client";

import { useEffect, useState } from "react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Only show custom cursor on desktop
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth > 768 && window.matchMedia("(pointer: fine)").matches);
    };
    
    checkDesktop();
    window.addEventListener("resize", checkDesktop);

    if (!isDesktop) return;

    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, [role='button'], input, textarea, select"
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    window.addEventListener("mousemove", updateCursor);

    return () => {
      window.removeEventListener("resize", checkDesktop);
      window.removeEventListener("mousemove", updateCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <>
      {/* Main Cursor */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${position.x - 10}px, ${position.y - 10}px)`,
        }}
      >
        <div
          className={`w-5 h-5 rounded-full bg-white transition-all duration-300 ${
            isHovering ? "scale-150" : "scale-100"
          }`}
        />
      </div>

      {/* Cursor Follower */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9998] transition-transform duration-500 ease-out"
        style={{
          transform: `translate(${position.x - 20}px, ${position.y - 20}px)`,
        }}
      >
        <div
          className={`w-10 h-10 rounded-full border-2 border-primary-500 transition-all duration-500 ${
            isHovering ? "scale-150 opacity-50" : "scale-100 opacity-100"
          }`}
        />
      </div>
    </>
  );
}


"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      color: string;
    }> = [];

    const colors = [
      "rgba(14, 165, 233, 0.3)", // primary-500 - reduced opacity
      "rgba(168, 85, 247, 0.3)", // secondary-500 - reduced opacity
      "rgba(59, 130, 246, 0.2)", // blue - reduced opacity
      "rgba(139, 92, 246, 0.2)", // purple - reduced opacity
    ];

    // Further reduce particle count for better performance
    for (let i = 0; i < 15; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animationFrameId: number;
    let lastTime = 0;
    const targetFPS = 20; // Further reduce to 20 FPS for better performance
    const frameInterval = 1000 / targetFPS;
    let isPaused = false;

    function animate(currentTime: number) {
      if (!ctx) return;
      
      const deltaTime = currentTime - lastTime;
      if (deltaTime < frameInterval) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      lastTime = currentTime - (deltaTime % frameInterval);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

          // Reduce connection distance check for performance - only check every 3rd particle
          if (i % 3 === 0) {
            particles.slice(i + 1, i + 4).forEach((p2) => {
              const dx = particle.x - p2.x;
              const dy = particle.y - p2.y;
              const distance = Math.sqrt(dx * dx + dy * dy);

              if (distance < 80) {
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = `rgba(14, 165, 233, ${0.1 * (1 - distance / 80)})`;
                ctx.lineWidth = 0.3;
                ctx.stroke();
              }
            });
          }
      });

      animationFrameId = requestAnimationFrame(animate);
    }

    animationFrameId = requestAnimationFrame(animate);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 opacity-10 dark:opacity-5"
      style={{ willChange: 'auto' }}
    />
  );
}



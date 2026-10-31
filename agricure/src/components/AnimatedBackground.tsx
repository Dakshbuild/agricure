"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-background">
      
      {/* Morphing Fluid Blob 1 - Top Right */}
      <motion.div
        className="absolute w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] opacity-40 dark:opacity-20 blur-[100px] mix-blend-multiply dark:mix-blend-screen"
        style={{
          background: "linear-gradient(120deg, var(--primary), var(--secondary))",
          top: "-20%",
          right: "-10%",
        }}
        animate={{
          x: [0, 50, -20, 0],
          y: [0, 30, -50, 0],
          scale: [1, 1.1, 0.9, 1],
          borderRadius: [
            "40% 60% 70% 30% / 40% 50% 60% 50%",
            "60% 40% 30% 70% / 50% 60% 40% 50%",
            "50% 50% 50% 50% / 50% 50% 50% 50%",
            "40% 60% 70% 30% / 40% 50% 60% 50%",
          ]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Morphing Fluid Blob 2 - Bottom Left */}
      <motion.div
        className="absolute w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] opacity-30 dark:opacity-15 blur-[120px] mix-blend-multiply dark:mix-blend-screen"
        style={{
          background: "linear-gradient(200deg, var(--primary-dark), var(--secondary-light))",
          bottom: "-30%",
          left: "-20%",
        }}
        animate={{
          x: [0, -60, 40, 0],
          y: [0, -40, 60, 0],
          scale: [1, 1.2, 0.8, 1],
          borderRadius: [
            "30% 70% 70% 30% / 30% 30% 70% 70%",
            "50% 50% 20% 80% / 25% 80% 20% 75%",
            "40% 60% 50% 50% / 50% 50% 50% 50%",
            "30% 70% 70% 30% / 30% 30% 70% 70%",
          ]
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Morphing Fluid Blob 3 - Center (Smaller and brighter) */}
      <motion.div
        className="absolute w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] opacity-20 dark:opacity-10 blur-[80px] mix-blend-multiply dark:mix-blend-screen hidden md:block"
        style={{
          background: "linear-gradient(45deg, var(--primary-light), #facc15)",
          top: "20%",
          left: "30%",
        }}
        animate={{
          x: [0, 100, -100, 0],
          y: [0, -100, 100, 0],
          scale: [1, 1.5, 0.9, 1],
          rotate: [0, 180, 360],
          borderRadius: [
            "60% 40% 30% 70% / 60% 30% 70% 40%",
            "30% 70% 70% 30% / 30% 30% 70% 70%",
            "60% 40% 30% 70% / 60% 30% 70% 40%",
          ]
        }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      />

      {/* Abstract Topography / Grid Lines Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] dark:invert mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000000' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Premium Glass Light Reflection */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/40 dark:from-white/5 dark:to-white/10 mix-blend-overlay" />
      
      {/* Noise filter */}
      <div 
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>
    </div>
  );
}

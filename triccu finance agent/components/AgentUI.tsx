'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, ShieldCheck } from 'lucide-react';

import Spline from '@splinetool/react-spline';

export const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    // Extend timer to allow Spline 3D scene to load and play
    const timer = setTimeout(onComplete, 4000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-[#061611] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-radial-gradient from-emerald-500/20 to-transparent blur-[120px]" />
      
      {/* Spline 3D Background / Main Object */}
      <div className="absolute inset-0 z-0 opacity-80 pointer-events-none flex items-center justify-center">
        <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
        className="relative z-10 flex flex-col items-center mt-32 pointer-events-none"
      >
        <div className="w-24 h-24 rounded-[32px] glass-card flex items-center justify-center text-white text-5xl font-black shadow-[0_0_40px_rgba(16,185,129,0.3)] mb-6 relative group border border-emerald-500/30 backdrop-blur-md bg-black/40">
           <span className="relative z-10 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]">T</span>
        </div>
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-4xl font-black text-white italic tracking-tighter drop-shadow-2xl"
        >
          TRICCU <span className="text-emerald-400 not-italic font-normal">AGENT</span>
        </motion.h1>
        <motion.p 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="mt-3 text-[11px] font-black text-emerald-400/70 uppercase tracking-[0.4em]"
        >
          Initializing 3D Workspace
        </motion.p>
      </motion.div>

      <div className="absolute bottom-12 flex flex-col items-center gap-2 z-10">
         <div className="flex items-center gap-2 px-4 py-2 glass-card border-white/10 rounded-full bg-black/50 backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-[9px] font-bold text-white/60 uppercase tracking-widest">Secure Gateway</span>
         </div>
         <div className="w-40 h-1.5 bg-black/50 rounded-full overflow-hidden mt-4 border border-white/5">
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 3.5, ease: "easeInOut" }}
              className="h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)]"
            />
         </div>
      </div>
    </motion.div>
  );
};

export const FloatingElements = () => {
  const [elements, setElements] = useState<{ id: number, emoji: string, style: any }[]>([]);

  useEffect(() => {
    const emojis = ['💵', '🪙', '📱', '💳', '🏦', '💎'];
    const newElements = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      style: {
        left: `${Math.random() * 100}vw`,
        animationDelay: `${Math.random() * 10}s`,
        animationDuration: `${15 + Math.random() * 20}s`,
        fontSize: `${16 + Math.random() * 24}px`,
        animationName: Math.random() > 0.5 ? 'flyUp1' : 'flyUp2'
      }
    }));
    
    const timer = setTimeout(() => setElements(newElements), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-10">
      {elements.map((el) => (
        <div 
          key={el.id} 
          className="absolute text-emerald-400/50"
          style={{
            ...el.style,
            animationDuration: el.style.animationDuration,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            top: '110vh'
          }}
        >
          {el.emoji}
        </div>
      ))}
    </div>
  );
};

export const TiltCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: rotate.x, rotateY: rotate.y }}
      transition={{ type: "spring", stiffness: 150, damping: 20 }}
      style={{ transformStyle: 'preserve-3d' }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
};

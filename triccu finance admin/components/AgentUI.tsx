'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, ShieldCheck } from 'lucide-react';

export const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-[#061611] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-radial-gradient from-emerald-500/20 to-transparent blur-[120px]" />
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="w-24 h-24 rounded-[32px] green-gradient-bg flex items-center justify-center text-white text-5xl font-black shadow-2xl mb-6 relative group">
           <span className="relative z-10">T</span>
           <motion.div 
             animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
             transition={{ duration: 2, repeat: Infinity }}
             className="absolute inset-0 bg-white/20 rounded-[inherit] blur-xl" 
           />
        </div>
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-black text-white italic tracking-tighter"
        >
          TRICCU <span className="text-emerald-400 not-italic font-normal">FINANCE</span>
        </motion.h1>
        <motion.p 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-2 text-[10px] font-black text-white/30 uppercase tracking-[0.4em]"
        >
          Powering Retail Lending
        </motion.p>
      </motion.div>

      <div className="absolute bottom-12 flex flex-col items-center gap-2">
         <div className="flex items-center gap-2 px-4 py-2 glass-card border-white/5 rounded-full">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span className="text-[8px] font-bold text-white/40 uppercase tracking-widest">Bank Grade Security</span>
         </div>
         <div className="w-32 h-1 bg-white/5 rounded-full overflow-hidden mt-4">
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
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

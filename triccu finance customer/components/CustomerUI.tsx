'use client';

import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck } from 'lucide-react';
import Spline from '@splinetool/react-spline';

export const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 4000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-radial-gradient from-red-500/20 to-transparent blur-[120px]" />
      
      <div className="absolute inset-0 z-0 opacity-80 pointer-events-none flex items-center justify-center">
        {/* Placeholder Spline ID for Customer */}
        <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
        className="relative z-10 flex flex-col items-center mt-32 pointer-events-none"
      >
        <div className="w-24 h-24 rounded-[32px] glass-card flex items-center justify-center text-white text-5xl font-black shadow-[0_0_40px_rgba(255,8,68,0.3)] mb-6 relative group border border-red-500/30 backdrop-blur-md bg-black/40">
           <span className="relative z-10 drop-shadow-[0_0_10px_rgba(255,8,68,0.8)]">T</span>
        </div>
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-4xl font-black text-white italic tracking-tighter drop-shadow-2xl"
        >
          TRICCU <span className="text-red-500 not-italic font-normal">FINANCE</span>
        </motion.h1>
      </motion.div>

      <div className="absolute bottom-12 flex flex-col items-center gap-2 z-10">
         <div className="flex items-center gap-2 px-4 py-2 glass-card border-white/10 rounded-full bg-black/50 backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-red-500" />
            <span className="text-[9px] font-bold text-white/60 uppercase tracking-widest">Customer Portal</span>
         </div>
         <div className="w-40 h-1.5 bg-black/50 rounded-full overflow-hidden mt-4 border border-white/5">
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 3.5, ease: "easeInOut" }}
              className="h-full bg-red-500 shadow-[0_0_15px_rgba(255,8,68,0.8)]"
            />
         </div>
      </div>
    </motion.div>
  );
};

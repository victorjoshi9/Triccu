'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Home, FileText, Wallet, UserCircle, QrCode } from 'lucide-react';
import { useState, useEffect } from 'react';
import { SplashScreen, FloatingElements } from '@/components/AgentUI';
import { PhoneAuth } from '@/components/PhoneAuth';

export default function AgentLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if splash has been shown in this session
    const hasShownSplash = sessionStorage.getItem('agent-splash-shown');
    const authSession = sessionStorage.getItem('agent-auth-session');
    
    if (authSession) {
      setIsAuthenticated(true);
    }
    
    if (hasShownSplash) {
      const timer = setTimeout(() => setLoading(false), 0);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSplashComplete = () => {
    setLoading(false);
    sessionStorage.setItem('agent-splash-shown', 'true');
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('agent-auth-session', 'true');
  };

  return (
    <>
      <AnimatePresence>
        {loading && <SplashScreen onComplete={handleSplashComplete} />}
      </AnimatePresence>

      <div className="flex flex-col min-h-[820px] relative bg-[#061611]">
        {/* Animated Background Orbs */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="floating-orb w-64 h-64 bg-emerald-500/10 -top-10 -left-10 blur-[100px]" />
          <div className="floating-orb w-96 h-96 bg-green-400/10 bottom-20 right-0 blur-[120px]" style={{ animationDelay: '2s' }} />
          <div className="floating-orb w-60 h-60 bg-emerald-300/5 top-1/2 left-1/4 blur-[80px]" style={{ animationDelay: '5s' }} />
        </div>

        <FloatingElements />

        {/* Main Content Area */}
        <div className="flex-1 pb-24 overflow-y-auto relative z-10">
            {!loading && !isAuthenticated ? (
              <PhoneAuth onLoginSuccess={handleLoginSuccess} />
            ) : (
              children
            )}
        </div>
        
        {/* Modern Floating Bottom Nav */}
        <AnimatePresence>
          {isAuthenticated && (
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-md px-6 z-40 pointer-events-none"
            >
              <div className="glass-card border-white/10 rounded-[32px] px-6 py-3 flex justify-between items-center shadow-[0_20px_50px_rgba(0,0,0,0.6)] pointer-events-auto bg-black/45 backdrop-blur-xl">
                <Link href="/agent" className="flex flex-col items-center gap-1.5 text-emerald-400 transition-all active:scale-90 group relative">
                  <Home className="w-5.5 h-5.5 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-transform group-hover:-translate-y-1" />
                  <span className="text-[9px] font-black uppercase tracking-widest neon-glow-text">Home</span>
                  <motion.div layoutId="nav-glow" className="absolute -bottom-1 w-1 h-1 bg-emerald-400 rounded-full neon-glow-green" />
                </Link>
                <Link href="/agent/loans" className="flex flex-col items-center gap-1.5 text-white/30 hover:text-emerald-400 transition-all active:scale-90 group">
                  <FileText className="w-5.5 h-5.5 group-hover:-translate-y-1 transition-transform" />
                  <span className="text-[9px] font-black uppercase tracking-widest">Loans</span>
                </Link>
                <div className="relative -top-7">
                  <div className="green-gradient-bg p-4 rounded-[24px] shadow-[0_10px_30px_rgba(16,185,129,0.4)] text-white cursor-pointer hover:scale-110 active:scale-95 transition-all duration-300 three-d-button neon-glow-green border border-white/10">
                    <QrCode className="w-6.5 h-6.5" />
                  </div>
                </div>
                <Link href="/agent/wallet" className="flex flex-col items-center gap-1.5 text-white/30 hover:text-emerald-400 transition-all active:scale-90 group">
                  <Wallet className="w-5.5 h-5.5 group-hover:-translate-y-1 transition-transform" />
                  <span className="text-[9px] font-black uppercase tracking-widest">Wallet</span>
                </Link>
                <Link href="/agent/profile" className="flex flex-col items-center gap-1.5 text-white/30 hover:text-emerald-400 transition-all active:scale-90 group">
                  <UserCircle className="w-5.5 h-5.5 group-hover:-translate-y-1 transition-transform" />
                  <span className="text-[9px] font-black uppercase tracking-widest">Profile</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

'use client';

import Link from 'next/link';
import { Home, Package, Wallet, UserCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SplashScreen } from '@/components/ShopUI';
import { PhoneAuth } from '@/components/PhoneAuth';

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const hasShownSplash = sessionStorage.getItem('shop-splash-shown');
    const authSession = sessionStorage.getItem('shop-auth-session');
    
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
    sessionStorage.setItem('shop-splash-shown', 'true');
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('shop-auth-session', 'true');
  };

  return (
    <>
      <AnimatePresence>
        {loading && <SplashScreen onComplete={handleSplashComplete} />}
      </AnimatePresence>

      <div className="flex flex-col min-h-[820px] bg-black">
        <div className="flex-1 pb-20 overflow-y-auto">
           {!loading && !isAuthenticated ? (
             <PhoneAuth onLoginSuccess={handleLoginSuccess} />
           ) : (
             children
           )}
        </div>
        
        <AnimatePresence>
          {isAuthenticated && (
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-md px-6 z-40 pointer-events-none"
            >
              <div className="glass-card border border-white/10 px-6 py-4 flex justify-between items-center rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.4)] pointer-events-auto bg-black/45 backdrop-blur-xl text-white">
                <Link href="/shop" className="flex flex-col items-center gap-1 text-blue-500 hover:text-blue-400 transition-colors">
                  <Home className="w-6 h-6" />
                  <span className="text-[10px] font-medium">Home</span>
                </Link>
                <Link href="/shop/inventory" className="flex flex-col items-center gap-1 text-white/50 hover:text-white transition-colors">
                  <Package className="w-6 h-6" />
                  <span className="text-[10px] font-medium">Inventory</span>
                </Link>
                <Link href="/shop/wallet" className="flex flex-col items-center gap-1 text-white/50 hover:text-white transition-colors">
                  <Wallet className="w-6 h-6" />
                  <span className="text-[10px] font-medium">Wallet</span>
                </Link>
                <Link href="/shop/profile" className="flex flex-col items-center gap-1 text-white/50 hover:text-white transition-colors">
                  <UserCircle className="w-6 h-6" />
                  <span className="text-[10px] font-medium">Profile</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

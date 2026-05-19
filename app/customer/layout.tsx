'use client';

import MobileSimulatorLayout from '@/components/MobileSimulatorLayout';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FileText, Lock, UserCircle } from 'lucide-react';

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isOnboarding = pathname === '/customer/onboarding';
  
  const isHome = pathname === '/customer';
  const isLoans = pathname === '/customer/loans';
  const isDeviceLock = pathname === '/customer/device-lock';
  const isProfile = pathname === '/customer/profile';

  return (
    <MobileSimulatorLayout>
      <div className="flex flex-col min-h-[820px]">
        <div className={`flex-1 overflow-y-auto ${!isOnboarding ? 'pb-20' : ''}`}>
           {children}
        </div>
        
        {!isOnboarding && (
          <div className="fixed bottom-0 w-full max-w-[366px] px-6 pb-6 pt-2 z-40 pointer-events-none">
            <div className="glass-card border-white/10 rounded-[28px] px-5 py-2.5 flex justify-between items-center shadow-[0_8px_32px_rgba(0,0,0,0.3)] pointer-events-auto">
              <Link href="/customer" className={`flex flex-col items-center gap-1 transition-transform active:scale-90 ${isHome ? 'text-red-500' : 'text-white/40 hover:text-white'}`}>
                <Home className={`w-4.5 h-4.5 ${isHome ? 'drop-shadow-[0_0_8px_rgba(255,8,68,0.5)]' : ''}`} />
                <span className="text-[8px] font-bold uppercase tracking-tight">Home</span>
              </Link>
              <Link href="/customer/loans" className={`flex flex-col items-center gap-1 transition-transform active:scale-90 ${isLoans ? 'text-red-500' : 'text-white/40 hover:text-white'}`}>
                <FileText className={`w-4.5 h-4.5 ${isLoans ? 'drop-shadow-[0_0_8px_rgba(255,8,68,0.5)]' : ''}`} />
                <span className="text-[8px] font-bold uppercase tracking-tight">Loans</span>
              </Link>
              <Link href="/customer/device-lock" className={`flex flex-col items-center gap-1 transition-transform active:scale-90 ${isDeviceLock ? 'text-red-500' : 'text-white/40 hover:text-white'}`}>
                <Lock className={`w-4.5 h-4.5 ${isDeviceLock ? 'drop-shadow-[0_0_8px_rgba(255,8,68,0.5)]' : ''}`} />
                <span className="text-[8px] font-bold uppercase tracking-tight">Lock</span>
              </Link>
              <Link href="/customer/profile" className={`flex flex-col items-center gap-1 transition-transform active:scale-90 ${isProfile ? 'text-red-500' : 'text-white/40 hover:text-white'}`}>
                <UserCircle className={`w-4.5 h-4.5 ${isProfile ? 'drop-shadow-[0_0_8px_rgba(255,8,68,0.5)]' : ''}`} />
                <span className="text-[8px] font-bold uppercase tracking-tight">Profile</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </MobileSimulatorLayout>
  );
}

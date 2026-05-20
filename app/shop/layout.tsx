import MobileSimulatorLayout from '@/components/MobileSimulatorLayout';
import Link from 'next/link';
import { Home, Package, Wallet, UserCircle } from 'lucide-react';

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <MobileSimulatorLayout>
      <div className="flex flex-col min-h-[820px]">
        <div className="flex-1 pb-20 overflow-y-auto">
           {children}
        </div>
        
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-md px-6 z-40 pointer-events-none">
          <div className="glass-card border border-white/10 px-6 py-4 flex justify-between items-center rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.4)] pointer-events-auto bg-black/45 backdrop-blur-xl text-white">
            <Link href="/shop" className="flex flex-col items-center gap-1 text-[var(--color-triccu-red)]">
              <Home className="w-6 h-6" />
              <span className="text-[10px] font-medium">Home</span>
            </Link>
            <Link href="/shop/inventory" className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-900 transition-colors">
              <Package className="w-6 h-6" />
              <span className="text-[10px] font-medium">Inventory</span>
            </Link>
            <Link href="/shop/wallet" className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-900 transition-colors">
              <Wallet className="w-6 h-6" />
              <span className="text-[10px] font-medium">Wallet</span>
            </Link>
            <Link href="/shop/profile" className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-900 transition-colors">
              <UserCircle className="w-6 h-6" />
              <span className="text-[10px] font-medium">Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </MobileSimulatorLayout>
  );
}

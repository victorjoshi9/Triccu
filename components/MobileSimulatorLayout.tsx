import { Smartphone } from 'lucide-react';

export default function MobileSimulatorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      {/* Phone Frame */}
      <div className="relative w-[390px] h-[844px] bg-black rounded-[48px] shadow-2xl border-[12px] border-gray-800 overflow-hidden flex flex-col">
        {/* Notch */}
        <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-50">
          <div className="w-40 h-7 bg-black rounded-b-3xl"></div>
        </div>
        
        {/* Screen Content */}
        <div className="flex-1 overflow-y-auto bg-[var(--color-surface-dark)] relative scrollbar-hide">
          {children}
        </div>
        
        {/* Home Indicator */}
        <div className="absolute bottom-2 inset-x-0 flex justify-center z-50 pointer-events-none">
          <div className="w-32 h-1.5 bg-black/20 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

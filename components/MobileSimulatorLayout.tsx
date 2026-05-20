export default function MobileSimulatorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#070b19] flex flex-col w-full relative overflow-x-hidden">
      {/* Background neon glows */}
      <div className="absolute top-0 left-1/4 w-[40rem] h-[40rem] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[35rem] h-[35rem] bg-emerald-500/5 rounded-full blur-[160px] pointer-events-none" />
      
      {/* Main Responsive content container */}
      <div className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10 flex flex-col">
        {children}
      </div>
    </div>
  );
}

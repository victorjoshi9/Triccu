import { ShieldCheck, Users, Briefcase, Lock, Wallet, FileText, Settings, Bell, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import './globals.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const navItems = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Users', href: '/users', icon: Users },
    { name: 'Loans', href: '/loans', icon: Briefcase },
    { name: 'Device Locks', href: '/locks', icon: Lock },
    { name: 'Shops & Wallets', href: '/wallets', icon: Wallet },
    { name: 'API & Integrations', href: '/api-hub', icon: Settings },
    { name: 'Reports', href: '/reports', icon: FileText },
  ];

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-[var(--color-surface-light)] flex">
          {/* Sidebar */}
          <aside className="w-72 border-r border-white/20 bg-white/40 backdrop-blur-3xl flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-20">
            <div className="p-8">
              <Link href="/" className="inline-block">
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-triccu-red)] to-[var(--color-triccu-orange)] flex items-center gap-2">
                  <ShieldCheck className="w-8 h-8 text-[var(--color-triccu-red)]" />
                  Triccu Admin
                </h1>
              </Link>
            </div>
            
            <nav className="flex-1 px-4 space-y-2">
              {navItems.map((item) => (
                <Link key={item.name} href={item.href} className="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-sm transition-all font-medium">
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {item.name}
                </Link>
              ))}
            </nav>
            
            <div className="p-6 mt-auto">
              <button className="w-full neo-card p-4 flex items-center justify-center gap-2 font-medium hover:opacity-90 transition-opacity text-white">
                <Bell className="w-5 h-5" />
                Notifications
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-auto relative z-10">
            <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-[var(--color-triccu-red)] rounded-full mix-blend-multiply filter blur-[128px] opacity-10 pointer-events-none"></div>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

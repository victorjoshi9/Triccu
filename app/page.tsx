'use client';

import { motion } from 'motion/react';
import { ShieldCheck, Users, Store, Smartphone } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabase';

const roles = [
  {
    title: 'Admin Panel',
    description: 'System governance, approval workflows, and analytics.',
    icon: ShieldCheck,
    href: '/admin',
    color: 'from-[#FF0844] to-[#FF6B6B]',
  },
  {
    title: 'Agent App',
    description: 'Originate loans, manage customers, tracker commissions.',
    icon: Users,
    href: '/agent',
    color: 'from-[#FF6B6B] to-[#FFB347]',
  },
  {
    title: 'Shop Owner App',
    description: 'Manage inventory, track sales, and wallet withdrawals.',
    icon: Store,
    href: '/shop',
    color: 'from-[#FF0844] to-[#FFB347]',
  },
  {
    title: 'Customer App',
    description: 'Track loans, pay EMIs, and manage device locking.',
    icon: Smartphone,
    href: '/customer',
    color: 'from-[#FF6B6B] to-[#FF0844]',
  },
];

export default function Home() {
  const [configError, setConfigError] = useState<string | null>(null);

  useEffect(() => {
    try {
      getSupabase();
    } catch (err: any) {
      setTimeout(() => {
        setConfigError('Demo Mode: Supabase configuration is missing. The UI is fully interactive but backend operations are mocked.');
      }, 0);
    }
  }, []);

  return (
    <div className="min-h-screen p-8 flex flex-col items-center justify-center relative overflow-hidden bg-[var(--color-surface-light)]">
      {/* Background decoration elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[var(--color-triccu-red)] rounded-full mix-blend-multiply filter blur-[128px] opacity-20"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[var(--color-triccu-orange)] rounded-full mix-blend-multiply filter blur-[128px] opacity-20"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16 z-10"
      >
        <h1 className="text-5xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-triccu-red)] to-[var(--color-triccu-orange)] mb-6 tracking-tight">
          Triccu Finance
        </h1>
        <p className="text-xl text-gray-600 max-w-lg mx-auto font-medium">
          A consumer lending platform enabling seamless device financing
        </p>
      </motion.div>

      {configError && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-12 z-10 w-full max-w-4xl"
        >
          <div className="neo-card-light p-4 bg-orange-50 border-orange-200 text-orange-800 flex items-center space-x-3">
            <ShieldCheck className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-medium">{configError}</span>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl z-10">
        {roles.map((role, index) => (
          <Link key={role.title} href={role.href} className="block group">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="neo-card-light h-full p-8 flex flex-col items-center text-center cursor-pointer relative overflow-hidden transition-all duration-300"
            >
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${role.color} flex items-center justify-center text-white mb-6 shadow-xl transform group-hover:rotate-6 transition-transform duration-300`}>
                <role.icon className="w-10 h-10" />
              </div>
              <h2 className="text-xl font-bold mb-3 text-gray-900">{role.title}</h2>
              <p className="text-gray-500 text-sm leading-relaxed flex-grow">
                {role.description}
              </p>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}

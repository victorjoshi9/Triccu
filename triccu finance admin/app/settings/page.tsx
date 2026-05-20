'use client';

import React from 'react';
import { Settings as SettingsIcon, ShieldCheck, Key, Database, Globe } from 'lucide-react';
import { motion } from 'motion/react';

export default function SettingsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Platform Configuration</h1>
          <p className="text-gray-500 font-medium">Manage API keys, global parameters, and access controls.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="col-span-1 space-y-2">
           <button className="w-full text-left px-4 py-3 rounded-xl bg-white shadow-sm font-bold text-[var(--color-triccu-red)] border border-red-100 flex items-center gap-3">
              <Key className="w-5 h-5"/> API & Integrations
           </button>
           <button className="w-full text-left px-4 py-3 rounded-xl text-gray-600 hover:bg-white hover:shadow-sm font-medium transition-all flex items-center gap-3">
              <ShieldCheck className="w-5 h-5"/> Access Control
           </button>
           <button className="w-full text-left px-4 py-3 rounded-xl text-gray-600 hover:bg-white hover:shadow-sm font-medium transition-all flex items-center gap-3">
              <Database className="w-5 h-5"/> Database Sync
           </button>
           <button className="w-full text-left px-4 py-3 rounded-xl text-gray-600 hover:bg-white hover:shadow-sm font-medium transition-all flex items-center gap-3">
              <Globe className="w-5 h-5"/> Global Limits
           </button>
        </div>

        <div className="col-span-2 space-y-6">
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="neo-card-light p-6 space-y-6">
             <h3 className="font-bold text-lg text-gray-900 border-b border-gray-100 pb-3">Third-Party APIs</h3>
             
             <div className="space-y-4">
                <div>
                   <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Razorpay Key ID</label>
                   <input type="text" className="neo-input w-full font-mono text-sm" value="rzp_live_*****************" readOnly />
                </div>
                <div>
                   <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Razorpay Secret</label>
                   <input type="password" className="neo-input w-full font-mono text-sm" value="************************" readOnly />
                </div>
             </div>
             
             <h3 className="font-bold text-lg text-gray-900 border-b border-gray-100 pb-3 mt-8">Supabase Configuration</h3>
             <div className="space-y-4">
                <div>
                   <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Project URL</label>
                   <input type="text" className="neo-input w-full font-mono text-sm" value="https://tlvjyqfodafzdetzclnx.supabase.co" readOnly />
                </div>
             </div>

             <div className="pt-4 flex justify-end">
                <button className="px-6 py-2 bg-[var(--color-triccu-red)] text-white font-bold rounded-xl shadow-md">
                   Save Configuration
                </button>
             </div>
           </motion.div>
        </div>
      </div>
    </div>
  );
}

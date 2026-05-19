'use client';

import { motion } from 'motion/react';
import { IndianRupee, ShieldCheck, ChevronRight, Smartphone, Calendar, AlertCircle } from 'lucide-react';
import Link from 'next/link';

import Image from 'next/image';

export default function CustomerDashboard() {
  return (
    <div className="pt-12 px-6 pb-6 space-y-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-2">
        <div>
          <p className="text-xs text-white/50 font-medium mb-1">Welcome back,</p>
          <h2 className="text-xl font-bold text-white">Sneha Gupta</h2>
        </div>
        <div className="w-10 h-10 rounded-full overflow-hidden relative border border-white/10 shadow-sm glass-card">
           <Image src="https://picsum.photos/seed/sneha/100/100" alt="Profile" fill className="object-cover" referrerPolicy="no-referrer" />
        </div>
      </header>

      {/* Active Loan Card */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-card p-6 relative overflow-hidden flex flex-col border-white/10"
      >
        <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        
        <div className="flex justify-between items-start mb-6 z-10">
           <div>
             <h3 className="text-white font-bold text-lg">iPhone 15 Pro</h3>
             <p className="text-white/60 text-xs mt-1">Loan #TRC-8924</p>
           </div>
           <div className="bg-green-500/10 backdrop-blur-md px-3 py-1 rounded-full border border-green-500/20 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-green-400" />
              <span className="text-[10px] font-bold text-green-400 uppercase tracking-wide">Secured</span>
           </div>
        </div>
        
        <div className="flex justify-between items-end mb-6 z-10 border-b border-white/10 pb-4">
           <div>
             <p className="text-white/50 text-xs font-medium mb-1 uppercase tracking-wider">Outstanding</p>
             <h2 className="text-3xl font-outfit font-bold text-white">Rs. 64,500</h2>
           </div>
           <div className="text-right">
             <p className="text-white/50 text-xs font-medium mb-1 uppercase tracking-wider">Next EMI</p>
             <p className="text-lg font-bold text-white">05 Jun 2026</p>
           </div>
        </div>
        
        <div className="flex justify-between items-center z-10">
           <div>
              <p className="text-white/50 text-xs font-medium mb-1 uppercase tracking-wider">EMI Amount</p>
              <p className="text-lg font-bold text-white">Rs. 6,450</p>
           </div>
           <button className="red-gradient-bg text-white text-xs font-bold py-2.5 px-5 rounded-xl shadow-lg shadow-red-900/40 hover:scale-105 active:scale-95 transition-transform flex items-center gap-1 uppercase tracking-widest">
             Pay EMI <ChevronRight className="w-4 h-4" />
           </button>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/5 transition-colors border-white/5"
        >
          <div className="w-12 h-12 rounded-full bg-[#1A1A2E]/50 text-blue-400 flex items-center justify-center mb-2 border border-blue-500/20">
             <Calendar className="w-6 h-6" />
          </div>
          <p className="text-xs font-bold text-white">EMI Schedule</p>
        </motion.div>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/5 transition-colors border-white/5"
        >
          <div className="w-12 h-12 rounded-full bg-[#1A1A2E]/50 text-green-400 flex items-center justify-center mb-2 border border-green-500/20">
             <IndianRupee className="w-6 h-6" />
          </div>
          <p className="text-xs font-bold text-white">Auto-Pay (NACH)</p>
          <p className="text-[9px] text-green-400 font-bold uppercase tracking-widest mt-1">Active</p>
        </motion.div>
      </div>

      {/* Alert */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="glass-card border-yellow-500/20 bg-yellow-500/5 p-4 flex items-start gap-3"
      >
        <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-bold text-yellow-500">Maintain Bank Balance</h4>
          <p className="text-[11px] text-white/60 mt-1 leading-relaxed">
            Please ensure you have sufficient balance in your linked HDFC account before 05 Jun 2026 for auto-debit of Rs. 6,450.
          </p>
        </div>
      </motion.div>
      
      {/* Device Lock Info */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-4 border-white/5 flex items-center justify-between"
      >
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1A1A2E]/50 border border-white/10 flex items-center justify-center text-white/50">
               <Smartphone className="w-5 h-5" />
            </div>
            <div>
               <h4 className="text-sm font-bold text-white">Mobile Finance Lock</h4>
               <p className="text-[10px] text-green-400 uppercase tracking-widest font-bold mt-1">Active on device</p>
            </div>
         </div>
         <ChevronRight className="w-4 h-4 text-white/30" />
      </motion.div>
    </div>
  );
}

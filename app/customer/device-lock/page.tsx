'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Unlock, AlertTriangle, ShieldCheck, ArrowLeft, RefreshCw, AlertCircle, Smartphone } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function CustomerDeviceLock() {
  const [lockStatus, setLockStatus] = useState<'Active' | 'Locked'>('Active');
  const [testingProgress, setTestingProgress] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    'Finance Lock v4.2.1 initialized',
    'Hardware ID parsed successfully',
    'Connected to Triccu Node Core',
    'Mandate auto-compliance state: ACTIVE'
  ]);

  const testConnection = () => {
    setTestingProgress(true);
    setTimeout(() => {
      setTestingProgress(false);
      setLogs(prev => [
        `Device ping successful (${new Date().toLocaleTimeString()}) - Latency 14ms`,
        ...prev
      ]);
    }, 1500);
  };

  const simulateLockOverdue = () => {
    setLockStatus(prev => prev === 'Active' ? 'Locked' : 'Active');
    setLogs(prev => [
      `System State Change: ${lockStatus === 'Active' ? 'TEMPORARY FINANCE LOCK ENGAGED' : 'FINANCE LOCK ACTIVE (COMPLIANT)'}`,
      ...prev
    ]);
  };

  return (
    <div className="pt-8 px-6 pb-24 space-y-6 min-h-screen text-white bg-[#061611]">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link href="/customer" className="p-2.5 rounded-2xl glass-card-light border-white/5 text-white/70 active:scale-95 transition-all">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-bold font-outfit text-white tracking-tight">Security Lock</h1>
        <div className="w-10 h-10 rounded-full overflow-hidden relative border border-white/10 glass-card">
           <Image src="https://picsum.photos/seed/sneha/100/100" alt="Profile" fill className="object-cover" referrerPolicy="no-referrer" />
        </div>
      </div>

      {/* Main Lock Interactive Panel */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass-card p-6 border-white/10 relative overflow-hidden flex flex-col items-center justify-center text-center py-10"
      >
        <div className={`absolute -top-10 -left-10 w-40 h-40 rounded-full blur-[80px] pointer-events-none transition-colors ${lockStatus === 'Locked' ? 'bg-red-500/20' : 'bg-green-500/10'}`} />
        <div className={`absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-[80px] pointer-events-none transition-colors ${lockStatus === 'Locked' ? 'bg-orange-500/10' : 'bg-blue-500/15'}`} />

        {/* Floating Ring Outer lock */}
        <div className="relative mb-8">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: lockStatus === 'Locked' ? 4 : 12, repeat: Infinity, ease: 'linear' }}
            className={`absolute -inset-4 rounded-full border border-dashed transition-colors ${lockStatus === 'Locked' ? 'border-red-550/50' : 'border-emerald-500/30'}`}
          />
          <div className={`w-28 h-28 rounded-full flex items-center justify-center border transition-all ${
            lockStatus === 'Locked' 
              ? 'bg-red-500/20 border-red-500/40 shadow-[0_0_30px_rgba(239,68,68,0.4)]' 
              : 'bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
          }`}>
            {lockStatus === 'Locked' ? (
              <Lock className="w-12 h-12 text-red-500 animate-pulse" />
            ) : (
              <ShieldCheck className="w-12 h-12 text-emerald-400" />
            )}
          </div>
        </div>

        <h2 className="text-2xl font-black font-outfit text-white mb-2">
          {lockStatus === 'Locked' ? 'DEVICE FINANCES OVERDUE' : 'FINANCE SHIELD ACTIVE'}
        </h2>
        <span className={`text-[10px] uppercase tracking-[0.2em] font-black px-4 py-1.5 rounded-full border ${
          lockStatus === 'Locked' ? 'text-red-400 bg-red-500/10 border-red-500/25' : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25'
        }`}>
          {lockStatus === 'Locked' ? 'Temporary Overdue Lock' : 'Compliant Status'}
        </span>

        <p className="text-xs text-white/50 max-w-xs leading-relaxed mt-4">
          {lockStatus === 'Locked' 
            ? 'Access is temporarily restricted due to an open payment of Rs 6,450. Please make the payment immediately to restore full access.'
            : 'Your iPhone 15 Pro is fully protected and verified. Maintain your automatic NACH mandate transactions to keep the device active.'}
        </p>

        {/* Core Control actions */}
        <div className="w-full grid grid-cols-2 gap-3 mt-8">
          <button 
            onClick={simulateLockOverdue}
            className="py-3.5 px-4 bg-white/5 border border-white/15 rounded-xl text-xs font-bold text-white hover:bg-white/10 active:scale-95 transition-all text-center"
          >
            {lockStatus === 'Locked' ? 'Simulate Pay-Off' : 'Simulate Lock'}
          </button>

          <button 
            onClick={testConnection}
            disabled={testingProgress}
            className="py-3.5 px-4 bg-white text-gray-900 rounded-xl text-xs font-bold hover:bg-white/90 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-md shadow-white/5"
          >
            {testingProgress ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                Testing...
              </>
            ) : (
              <>
                <RefreshCw className="w-3.5 h-3.5" />
                Trigger Ping
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* Warnings & Notices */}
      <div className="glass-card p-5 border-white/5 space-y-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Lock Restriction Protocols</h4>
            <p className="text-[11px] text-white/50 leading-relaxed">
              When a finance lock is engaged by the Admin command dashboard, all user interfaces, browsing, and custom applications are closed. Emergency phone calls and instant payments remain active.
            </p>
          </div>
        </div>
      </div>

      {/* Embedded Terminal Logs */}
      <div className="bg-[#020907] rounded-2xl border border-white/5 p-4 font-mono space-y-2">
        <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2">
          <span className="text-[9px] font-black uppercase text-white/30 tracking-widest flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
            Shield Telemetry Logs
          </span>
          <span className="text-[8px] text-white/40 uppercase">v4.2</span>
        </div>
        <div className="space-y-1.5 max-h-[100px] overflow-y-auto text-[10px] text-emerald-400-subtle">
          {logs.map((log, i) => (
            <p key={i} className="leading-relaxed text-emerald-400/70 truncate">
              &gt; {log}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

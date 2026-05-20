'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, User, MapPin, CheckCircle2, Award, Clock, Smartphone, RefreshCw, Send, ShieldCheck, Database, Zap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function AgentProfilePage() {
  const [isCheckedIn, setIsCheckedIn] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState('All offline logs fully synchronized with Triccu Database.');

  const toggleAttendance = () => {
    setIsCheckedIn(!isCheckedIn);
  };

  const triggerManualSync = () => {
    setIsSyncing(true);
    setSyncStatus('Establishing connection to Cloud Database Nodes...');
    setTimeout(() => {
      setIsSyncing(false);
      setSyncStatus(`Offline records synchronized successfully at ${new Date().toLocaleTimeString()}!`);
    }, 1500);
  };

  return (
    <div className="pt-6 px-5 pb-28 space-y-6 text-white min-h-screen bg-[#061611]">
      <div className="flex justify-between items-center py-2">
        <Link href="/agent" className="p-2.5 rounded-2xl glass-card-light border-white/5 text-white/60 active:scale-95 transition-all">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h2 className="text-lg font-black font-outfit italic tracking-tight text-white uppercase">AGENT PROFILE</h2>
        <div className="w-9 h-9 rounded-xl border border-white/10 glass-card flex items-center justify-center">
          <User className="w-4 h-4 text-emerald-400" />
        </div>
      </div>

      {/* Main Agent Details */}
      <motion.div 
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-card p-6 border-white/15 relative overflow-hidden flex items-center gap-4 bg-gradient-to-br from-[#061611] to-[#0A2A1E]"
      >
        <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-500/10 rounded-full blur-[50px] pointer-events-none" />
        
        <div className="w-16 h-16 rounded-[22px] overflow-hidden border-2 border-emerald-500/40 relative shadow-lg shadow-emerald-900/30">
          <User className="w-full h-full p-3 text-emerald-400 bg-emerald-500/10" />
        </div>

        <div>
          <h2 className="text-xl font-black font-outfit text-white italic">Rahul Master</h2>
          <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Level 12 PLATINUM Zone Agent</p>
          <div className="flex gap-2.5 pt-2">
            <span className={`text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${isCheckedIn ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
              ● {isCheckedIn ? 'CHECKED IN (ACTIVE)' : 'OFF DUTY'}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Check-In / Out Attendance Card */}
      <motion.div 
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-5 border-white/5 space-y-4"
      >
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-emerald-505" />
          <div>
            <h3 className="text-xs font-black text-white uppercase tracking-wider">Geofenced Attendance</h3>
            <p className="text-[9px] text-white/40 mt-0.5">Route tracking accuracy active</p>
          </div>
        </div>

        <div className="flex gap-4 items-center justify-between">
          <div className="text-left">
            <p className="text-[9px] text-white/30 uppercase tracking-widest font-black">Today&apos;s shift start</p>
            <p className="text-xs font-bold text-white mt-1">Checked In: 10:14 AM</p>
          </div>

          <button 
            onClick={toggleAttendance}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all ${
              isCheckedIn 
                ? 'bg-red-500/10 border border-red-500/30 text-red-400 active:scale-95' 
                : 'green-gradient-bg border border-white/10 text-white active:scale-95 shadow-md'
            }`}
          >
            {isCheckedIn ? 'Check Out' : 'Check In'}
          </button>
        </div>
      </motion.div>

      {/* Sync Ledger Offline database card */}
      <motion.div 
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-5 border-white/5 space-y-4"
      >
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Database className="w-5 h-5 text-indigo-400" />
            <div>
              <h3 className="text-xs font-black text-white uppercase tracking-wider">Offline Sync Engine</h3>
              <p className="text-[9px] text-white/40 mt-0.5">Automated synchronization database v2</p>
            </div>
          </div>
          
          <button 
            onClick={triggerManualSync}
            disabled={isSyncing}
            className="p-2 bg-white/5 border border-white/15 rounded-xl text-white hover:bg-white/10 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin text-emerald-400' : ''}`} />
          </button>
        </div>

        <div className="p-3.5 bg-[#101423] border border-white/5 rounded-xl text-[10px] sm:text-xs text-white/60 leading-relaxed font-mono">
          &gt; {syncStatus}
        </div>
      </motion.div>

      {/* Lifetime Performance Statistics Dials list */}
      <div className="glass-card p-4 border-white/5 space-y-4">
        <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] italic ml-1">Rank Metrics</h3>
        {[
          { label: 'Weekly Collection Rate', val: '98.5%', bg: 'bg-emerald-500/10', color: 'text-emerald-400' },
          { label: 'Merchant Store Onboarding', val: '14 Active Stores', bg: 'bg-indigo-550/10', color: 'text-indigo-400' },
          { label: 'Risk Mitigation Level', val: '0.04% Default Rate', bg: 'bg-yellow-500/10', color: 'text-yellow-405' },
          { label: 'Active Repayment Streak', val: '112 Cycles Compliant', bg: 'bg-teal-500/10', color: 'text-teal-400' },
        ].map((met, idx) => (
          <div key={idx} className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
            <span className="text-xs font-semibold text-white/70">{met.label}</span>
            <span className={`text-xs font-black tracking-tight ${met.color} uppercase`}>{met.val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Shield, CreditCard, Award, ArrowLeft, Coins, Eye, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function CustomerProfile() {
  const [profile] = useState({
    name: 'Sneha Gupta',
    email: 'sneha.g@gmail.com',
    phone: '+91 88247 61999',
    kycStatus: 'Verified',
    creditScore: 785,
    joinedDate: 'Joined May 2026',
    linkedBank: 'HDFC BANK CORP',
    mandateReference: 'UMRN-HDFC-9912401'
  });

  const getScoreColor = (score: number) => {
    if (score >= 750) return 'text-emerald-400';
    if (score >= 650) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="pt-8 px-6 pb-24 space-y-6 min-h-screen text-white bg-[#061611]">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link href="/customer" className="p-2.5 rounded-2xl glass-card-light border-white/5 text-white/70 active:scale-95 transition-all">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-bold font-outfit text-white tracking-tight">Profile Hub</h1>
        <div className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
          <User className="w-4 h-4 text-emerald-400" />
        </div>
      </div>

      {/* Main Profile Info Card */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-card p-6 border-white/10 relative overflow-hidden flex items-center gap-4"
      >
        <div className="w-20 h-20 rounded-full overflow-hidden relative border-2 border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
          <Image src="https://picsum.photos/seed/sneha/200/200" alt="Sneha" fill className="object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-black font-outfit text-white">{profile.name}</h2>
          <p className="text-xs text-white/50">{profile.email}</p>
          <p className="text-[10px] text-white/40">{profile.joinedDate}</p>
          <div className="flex gap-2 pt-1">
            <span className="text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
              Verified User
            </span>
          </div>
        </div>
      </motion.div>

      {/* Dynamic Credit Score Widget */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-5 border-white/5 relative overflow-hidden"
      >
        <div className="absolute top-[-20%] right-[-10%] w-24 h-24 bg-yellow-500/5 rounded-full blur-[40px] pointer-events-none" />
        
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-yellow-500" />
            <h3 className="text-xs font-black text-white uppercase tracking-widest">Experian Credit Assessment</h3>
          </div>
          <span className="text-[9px] text-white/40 uppercase">Refreshed: 1h ago</span>
        </div>

        <div className="flex items-baseline gap-2.5">
          <span className={`text-4xl font-black font-outfit ${getScoreColor(profile.creditScore)}`}>
            {profile.creditScore}
          </span>
          <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/20 rounded-full">
            Tier-1 Premium
          </span>
        </div>

        <p className="text-[10px] text-white/50 leading-relaxed mt-3">
          Your credit score ranks high. You are eligible for zero-downpayment upgrades on all upcoming device product catalogs!
        </p>
      </motion.div>

      {/* e-NACH Mandate Lockdown Details (Crucial Rule) */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="glass-card border-l-4 border-red-500 bg-red-500/5 p-5 space-y-4"
      >
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="text-sm font-black text-white flex items-center gap-1.5 uppercase tracking-wider">
              e-NACH Mandate Status
            </h3>
            <p className="text-[11px] text-white/45">Registered on linked Bank Account</p>
          </div>
        </div>

        <div className="w-full bg-[#130d0d]/40 rounded-xl p-4 border border-white/5 space-y-2.5">
          <div className="flex justify-between">
            <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">UMRN ID</span>
            <span className="text-xs font-mono font-bold text-white">{profile.mandateReference}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Authorized Account</span>
            <span className="text-xs font-bold text-white">{profile.linkedBank}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Repayment Mandate Status</span>
            <span className="text-xs font-bold text-red-400 uppercase tracking-wider">LOCKED IN (NON-CANCELLABLE)</span>
          </div>
        </div>

        {/* Informative Mandate Lockdown Warning */}
        <div className="flex gap-2 p-3 bg-red-500/5 border border-red-500/10 rounded-xl text-[10px] text-white/70 leading-relaxed items-start">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-red-400">Strict Finance Lock Rule:</span> Under NP-COMP09 directive, active e-NACH auto-debit mandates **cannot be canceled or modified** by the customer. Only the primary administrator can disable or alter auto-debit schedules upon absolute debt liquidation.
          </div>
        </div>
      </motion.div>

      {/* General Settings */}
      <div className="glass-card p-4 border-white/5 space-y-3">
        <h4 className="text-[10px] text-white/30 uppercase tracking-widest font-black mb-1">Account Options</h4>
        {[
          { label: 'View Agreement PDF', icon: Eye },
          { label: 'Register New UPI / Cards', icon: CreditCard },
          { label: 'Triccu Super Club Rewards', icon: Coins },
          { label: 'Contact Support Center', icon: HelpCircle }
        ].map((item, idx) => (
          <div key={idx} className="flex justify-between items-center bg-white/5 hover:bg-white/10 p-3 rounded-xl border border-white/5 cursor-pointer active:scale-98 transition-all">
            <div className="flex items-center gap-3">
              <item.icon className="w-4 h-4 text-white/60" />
              <span className="text-xs font-semibold text-white">{item.label}</span>
            </div>
            <CheckCircle2 className="w-4 h-4 text-emerald-400/50" />
          </div>
        ))}
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, User, MessageSquare, Award, Smartphone, HelpCircle, ShieldAlert, CheckCircle2, QrCode } from 'lucide-react';
import Link from 'next/link';

export default function ShopProfilePage() {
  const storeMeta = {
    name: 'Sharma Electronics',
    owner: 'Arun Sharma',
    email: 'arun.sharma@sharmaelectronics.com',
    storePhone: '+91 91230 44820',
    address: 'Store #28M, Nehru Place Central, New Delhi',
    tier: 'Gold Authorized Vendor',
    referralCode: 'SHARMA-TRC-99'
  };

  return (
    <div className="pt-12 px-6 pb-24 space-y-6 text-white min-h-screen bg-[#070b19]">
      {/* Top Header */}
      <div className="flex justify-between items-center py-2">
        <Link href="/shop" className="p-2.5 rounded-2xl glass-card border-white/5 text-white/60 active:scale-95 transition-all">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h2 className="text-lg font-black font-outfit uppercase tracking-tight text-white">Store Profile</h2>
        <div className="w-9 h-9 rounded-xl border border-white/10 glass-card flex items-center justify-center">
          <User className="w-4 h-4 text-white/70" />
        </div>
      </div>

      {/* Store Banner Profile Card */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-card p-6 border-white/10 relative overflow-hidden flex items-center gap-4 bg-gradient-to-br from-[#070b19] to-[#12192f]"
      >
        <div className="absolute top-0 right-0 w-28 h-28 bg-indigo-500/10 rounded-full blur-[50px] pointer-events-none" />
        
        <div className="w-16 h-16 rounded-[22px] overflow-hidden bg-white/5 border border-white/15 flex items-center justify-center text-white text-3xl font-black">
          S
        </div>

        <div>
          <h2 className="text-xl font-black font-outfit text-white italic leading-tight">{storeMeta.name}</h2>
          <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider mt-0.5">{storeMeta.owner} • {storeMeta.tier}</p>
          <div className="flex gap-2.5 pt-2">
            <span className="text-[8px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
              Active Authorized Merchant
            </span>
          </div>
        </div>
      </motion.div>

      {/* QR Code generator placeholder display */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-5 border-white/5 flex flex-col items-center justify-center text-center space-y-4"
      >
        <div className="bg-white p-4 rounded-2xl border border-white/10">
          <QrCode className="w-40 h-40 text-gray-900" />
        </div>
        <div>
          <h3 className="text-xs font-black uppercase tracking-widest text-white leading-tight">Store QR Registration Scan</h3>
          <p className="text-[10px] text-white/40 mt-1 max-w-xs leading-relaxed">
            Scan this QR code using the Triccu Agent Hub application to link customer devices directly to your dealer payout ID: <span className="font-mono text-[9px] text-white font-bold">{storeMeta.referralCode}</span>.
          </p>
        </div>
      </motion.div>

      {/* Metadata Detail Rows in Grid */}
      <div className="glass-card p-5 border-white/5 space-y-4">
        <h4 className="text-[10px] text-white/30 uppercase tracking-widest font-black">Merchant Metadata</h4>
        
        <div className="space-y-3.5 text-xs text-white/50">
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="font-bold">Dealer Email Contact</span>
            <span className="font-semibold text-white">{storeMeta.email}</span>
          </div>
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="font-bold">Store Phone</span>
            <span className="font-semibold text-white">{storeMeta.storePhone}</span>
          </div>
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="font-bold">Establishment Locality</span>
            <span className="font-semibold text-white truncate max-w-[200px]">{storeMeta.address}</span>
          </div>
        </div>
      </div>

      {/* Merchant Security locks warning notice */}
      <div className="glass-card border-l-4 border-yellow-550 bg-yellow-500/5 p-4 flex gap-3 items-start">
        <ShieldAlert className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-[10px] font-black uppercase text-yellow-500 tracking-wider">De-authorization warning rules</h4>
          <p className="text-[10.5px] text-white/60 leading-relaxed">
            All devices sold under device financing are strictly security locked. Any manual security bypass of active customer finance lock protocols by store personnel is logged and subject to contract de-authorization metrics.
          </p>
        </div>
      </div>
    </div>
  );
}

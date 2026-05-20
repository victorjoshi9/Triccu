'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Wallet, HelpCircle, ArrowUpRight, DollarSign, SwitchCamera, CheckCircle, RefreshCw } from 'lucide-react';
import Link from 'next/link';

interface ShopTransaction {
  id: string;
  type: 'ReferralPayout' | 'CashBack' | 'Withdrawal';
  amount: number;
  date: string;
  bankName: string;
}

const LEDGER: ShopTransaction[] = [
  { id: 'SH-P-9941', type: 'ReferralPayout', amount: 4500, date: 'Today, 1:12 PM', bankName: 'Referral: iPhone 15 Pro' },
  { id: 'SH-P-9812', type: 'ReferralPayout', amount: 5000, date: 'Yesterday, 6:00 PM', bankName: 'Referral: Galaxy S24' },
  { id: 'SH-P-9140', type: 'Withdrawal', amount: -40000, date: '10 May 2026', bankName: 'SBI Current Account' }
];

export default function ShopWalletPage() {
  const [balance, setBalance] = useState(84500);
  const [ledger, setLedger] = useState<ShopTransaction[]>(LEDGER);
  const [showPayoutDialog, setShowPayoutDialog] = useState(false);
  const [payAmount, setPayAmount] = useState('20,000');
  const [processingState, setProcessingState] = useState(false);

  const handleWithdrawalRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseInt(payAmount.replace(/,/g, ''));
    if (isNaN(parsed) || parsed <= 0 || parsed > balance) return;

    setProcessingState(true);
    setTimeout(() => {
      setProcessingState(false);
      setBalance(prev => prev - parsed);

      const newTx: ShopTransaction = {
        id: `SH-P-${Math.floor(8000 + Math.random() * 1999)}`,
        type: 'Withdrawal',
        amount: -parsed,
        date: 'Just Now',
        bankName: 'SBI Current Account'
      };

      setLedger([newTx, ...ledger]);
      setShowPayoutDialog(false);
    }, 1500);
  };

  return (
    <div className="pt-12 px-6 pb-24 space-y-6 text-white min-h-screen bg-[#070b19]">
      {/* Top Header */}
      <div className="flex justify-between items-center py-2">
        <Link href="/shop" className="p-2.5 rounded-2xl glass-card border-white/5 text-white/60 active:scale-95 transition-all">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h2 className="text-lg font-black font-outfit uppercase tracking-tight text-white">Store Payouts</h2>
        <div className="w-9 h-9 rounded-xl border border-white/10 glass-card flex items-center justify-center">
          <Wallet className="w-4 h-4 text-white/70" />
        </div>
      </div>

      {/* Wallet Balance Board */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-card p-6 border-white/10 relative overflow-hidden text-center flex flex-col items-center"
      >
        <div className="absolute top-[-30%] right-[-10%] w-32 h-32 bg-white/5 rounded-full blur-[50px] pointer-events-none" />
        <p className="text-[10px] font-black uppercase text-white/35 tracking-widest">Withdrawal Fund Balance</p>
        <h2 className="text-4xl font-black font-outfit text-white italic tracking-tighter mt-1">
          Rs. {balance.toLocaleString()}
        </h2>

        <div className="grid grid-cols-2 gap-4 w-full mt-6 pt-5 border-t border-white/5 text-left">
          <div>
            <p className="text-[8px] font-bold text-white/30 uppercase tracking-widest">Store commissions MTD</p>
            <p className="text-sm font-black text-white mt-1">Rs. 94,000</p>
          </div>
          <div className="text-right">
            <p className="text-[8px] font-bold text-white/30 uppercase tracking-widest">Authorized Bank</p>
            <p className="text-sm font-black text-white mt-1">SBI CARDS</p>
          </div>
        </div>

        <button 
          onClick={() => setShowPayoutDialog(true)}
          className="w-full py-4 bg-white text-gray-900 rounded-xl text-xs font-bold uppercase tracking-widest mt-6 hover:bg-white/90 active:scale-95 transition-transform font-bold"
        >
          Withdraw to bank
        </button>
      </motion.div>

      {/* Instant Payout dialog overlay */}
      <AnimatePresence>
        {showPayoutDialog && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              className="glass-card w-full max-w-sm p-6 border-white/10 shadow-2xl bg-[#070b19]/95 text-white"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xs font-bold uppercase tracking-wider">Execute Bank Transfer</h3>
                <button onClick={() => setShowPayoutDialog(false)} className="text-white/40 hover:text-white uppercase text-xs p-1">Close</button>
              </div>

              <form onSubmit={handleWithdrawalRequest} className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold uppercase text-white/30 ml-1">Transfer Volume (Rs)</span>
                  <input 
                    type="text" 
                    required
                    value={payAmount}
                    onChange={e => setPayAmount(e.target.value)}
                    className="w-full bg-[#1A1A2E]/50 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-center text-white outline-none"
                  />
                </div>

                <div className="p-3.5 bg-white/5 border border-white/5 rounded-xl text-[10px] sm:text-xs text-white/50 leading-relaxed">
                  Funds are disbursed directly to SBI Current Account (•••• 9940). Standard settlement time is instantly under IMPS protocols.
                </div>

                <button 
                  type="submit"
                  disabled={processingState}
                  className="w-full py-3.5 bg-white font-bold rounded-xl text-gray-950 uppercase text-xs tracking-widest mt-4 flex items-center justify-center gap-2 h-11"
                >
                  {processingState ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-gray-950" />
                      Settling Ledger...
                    </>
                  ) : (
                    'Initiate Bank Transfer'
                  )}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Transaction log files inside shop wallet dashboard */}
      <div className="space-y-4">
        <h3 className="text-xs font-black uppercase tracking-widest italic text-white/40">Commissions Ledger</h3>
        <div className="space-y-3">
          {ledger.map((tx, idx) => (
            <div key={idx} className="glass-card p-4 border-white/5 flex items-center justify-between hover:border-white/10 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs border ${
                  tx.amount < 0 ? 'bg-red-500/10 border-red-500/15 text-red-400' : 'bg-emerald-500/10 border-emerald-500/15 text-emerald-400'
                }`}>
                  {tx.amount < 0 ? '↓' : '↑'}
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs leading-tight">
                    {tx.type === 'Withdrawal' ? 'Disbursed Current Account' : 'Referral Commission Payout'}
                  </h4>
                  <p className="text-[10px] text-white/45 mt-1">{tx.date} • {tx.bankName}</p>
                </div>
              </div>

              <div className="text-right">
                <span className={`text-xs sm:text-sm font-black italic ${tx.amount < 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                  {tx.amount < 0 ? '-' : '+'}Rs. {Math.abs(tx.amount).toLocaleString()}
                </span>
                <p className="text-[7px] text-white/30 tracking-widest font-bold uppercase mt-1">ID: {tx.id}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

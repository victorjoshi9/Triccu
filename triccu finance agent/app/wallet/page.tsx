'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Wallet, TrendingUp, HelpCircle, ArrowUpRight, ShieldCheck, CheckCircle, RefreshCw, Smartphone, Award, DollarSign } from 'lucide-react';
import Link from 'next/link';

interface Transaction {
  id: string;
  type: 'Commission' | 'SuperBonus' | 'Payout';
  amount: number;
  date: string;
  ref: string;
  status: 'Disbursed' | 'Processing';
}

const LEDGER: Transaction[] = [
  { id: 'TX-99021', type: 'Commission', amount: 8450, date: 'Today, 2:30 PM', ref: 'iPhone 15 (Sneha Gupta)', status: 'Disbursed' },
  { id: 'TX-98440', type: 'SuperBonus', amount: 1500, date: 'Yesterday, 10:15 AM', ref: 'Festival Bonus Multiplier', status: 'Disbursed' },
  { id: 'TX-98112', type: 'Payout', amount: -65000, date: '14 May 2026', ref: 'Bank Transfer (HDFC Savings)', status: 'Disbursed' },
  { id: 'TX-97401', type: 'Commission', amount: 4800, date: '12 May 2026', ref: 'OnePlus 12 (Rahul Kumar)', status: 'Disbursed' }
];

export default function AgentWalletPage() {
  const [balance, setBalance] = useState(124800);
  const [ledger, setLedger] = useState<Transaction[]>(LEDGER);
  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('50,000');
  const [withdrawingInProgress, setWithdrawingInProgress] = useState(false);

  const triggerWithdrawal = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseInt(withdrawAmount.replace(/,/g, ''));
    if (isNaN(parsedAmount) || parsedAmount <= 0 || parsedAmount > balance) return;

    setWithdrawingInProgress(true);
    setTimeout(() => {
      setWithdrawingInProgress(false);
      setBalance(prev => prev - parsedAmount);
      
      const newTx: Transaction = {
        id: `TX-${Math.floor(90000 + Math.random() * 9999)}`,
        type: 'Payout',
        amount: -parsedAmount,
        date: 'Just Now',
        ref: 'Bank Transfer (HDFC Savings)',
        status: 'Processing'
      };
      
      setLedger([newTx, ...ledger]);
      setShowWithdrawDialog(false);
    }, 2000);
  };

  return (
    <div className="pt-6 px-5 pb-28 space-y-6 text-white min-h-screen bg-[#061611]">
      <div className="flex justify-between items-center py-2">
        <Link href="/agent" className="p-2.5 rounded-2xl glass-card-light border-white/5 text-white/60 active:scale-95 transition-all">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h2 className="text-lg font-black font-outfit italic tracking-tight text-white uppercase">COMMISSIONS</h2>
        <div className="w-9 h-9 rounded-xl border border-white/10 glass-card flex items-center justify-center">
          <Wallet className="w-4 h-4 text-emerald-400" />
        </div>
      </div>

      {/* Main Glass Payout Balance Widget */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-card p-6 border-white/10 relative overflow-hidden text-center flex flex-col items-center"
      >
        <div className="absolute top-[-30%] right-[-10%] w-36 h-36 bg-emerald-500/10 rounded-full blur-[60px]" />
        
        <p className="text-[10px] font-black uppercase text-white/30 tracking-[0.25em]">Unwithdrawn Balance</p>
        <h2 className="text-4xl font-black font-outfit text-white italic tracking-tighter mt-1">
          ₹{balance.toLocaleString()}
        </h2>

        <div className="grid grid-cols-2 gap-4 w-full mt-6 pt-5 border-t border-white/5">
          <div className="text-left">
            <p className="text-[8px] font-bold text-white/30 uppercase tracking-widest">Earnings MTD</p>
            <p className="text-base font-black text-white mt-0.5">₹1,24,800</p>
          </div>
          <div className="text-right">
            <p className="text-[8px] font-bold text-white/30 uppercase tracking-widest">Lifetime Payout</p>
            <p className="text-base font-black text-emerald-450 mt-0.5">₹4,89,500</p>
          </div>
        </div>

        <button 
          onClick={() => setShowWithdrawDialog(true)}
          className="w-full py-4 mt-6 green-gradient-bg rounded-xl font-bold uppercase tracking-[0.3em] text-xs transition-transform active:scale-95 border border-white/10 shadow-lg shadow-emerald-900/30"
        >
          Withdraw to HDFC Account
        </button>
      </motion.div>

      {/* Withdrawal Dialog Overlay */}
      <AnimatePresence>
        {showWithdrawDialog && (
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
              className="glass-card w-full max-w-sm p-6 border-white/15 shadow-2xl relative bg-[#061611]/95 text-white flex flex-col"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-black font-outfit italic tracking-tight uppercase">EXECUTE TRANSFER</h3>
                <button onClick={() => setShowWithdrawDialog(false)} className="text-white/40 hover:text-white uppercase text-xs font-bold tracking-widest p-2">Close</button>
              </div>

              <form onSubmit={triggerWithdrawal} className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[9px] font-black uppercase text-white/30 tracking-widest ml-1">Transfer Volume (Rs)</span>
                  <input 
                    type="text" 
                    required
                    value={withdrawAmount}
                    onChange={e => setWithdrawAmount(e.target.value)}
                    placeholder="e.g. 50,000"
                    className="w-full bg-[#1A1A2E]/50 border border-white/15 rounded-xl px-4 py-3 text-sm text-center font-bold text-white outline-none focus:border-emerald-500/50"
                  />
                </div>

                <div className="bg-[#11231f]/90 p-4 border border-white/5 rounded-xl space-y-2">
                  <div className="flex justify-between text-[11px] text-white/50">
                    <span>Beneficiary Bank:</span>
                    <span className="font-bold text-white">HDFC BANK CORP</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-white/50">
                    <span>Account Suffix:</span>
                    <span className="font-mono font-bold text-white">•••• 6112</span>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={withdrawingInProgress}
                  className="w-full py-4 bg-emerald-500 font-bold rounded-xl text-white tracking-[0.2em] uppercase text-xs shadow-lg shadow-emerald-950/40 border border-white/10 mt-4 h-12 flex items-center justify-center gap-2"
                >
                  {withdrawingInProgress ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Disbursing Funds...
                    </>
                  ) : (
                    'Initiate Instant Withdrawal'
                  )}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Target multiplier status indicator */}
      <div className="glass-card p-4 border-white/5 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 shrink-0">
          <Award className="w-6 h-6 animate-pulse" />
        </div>
        <div className="flex-1">
          <h4 className="text-xs font-black text-white uppercase tracking-wider">SuperClub multiplier</h4>
          <p className="text-[10px] text-white/50 mt-1 leading-relaxed">
            Close 3 more device loans by Sunday to reach Level 13 and trigger 1.5x commission multiplier payouts.
          </p>
        </div>
      </div>

      {/* Transaction Records */}
      <div className="space-y-4">
        <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] italic ml-1">Ledger Statements</h3>
        <div className="space-y-3">
          {ledger.map((tx, i) => (
            <div key={tx.id} className="glass-card p-4 border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold border ${
                  tx.type === 'Payout' 
                    ? 'bg-red-500/10 border-red-500/20 text-red-400' 
                    : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-450'
                }`}>
                  {tx.type === 'Payout' ? '↓' : '↑'}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5 leading-tight">
                    {tx.type === 'Commission' ? 'Application commission' : tx.type === 'SuperBonus' ? 'SuperClub Bonus Payout' : 'Instant Wallet Withdrawal'}
                  </h4>
                  <p className="text-[10px] text-white/40 mt-1">{tx.date} • {tx.ref}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-xs font-black italic tracking-tight ${
                  tx.amount < 0 ? 'text-red-400' : 'text-emerald-400'
                }`}>
                  {tx.amount < 0 ? '-' : '+'}₹{Math.abs(tx.amount).toLocaleString()}
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

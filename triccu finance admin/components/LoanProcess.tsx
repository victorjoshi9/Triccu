'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  User, 
  Smartphone, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  Banknote
} from 'lucide-react';

interface LoanProcessProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function LoanProcess({ onClose, onSuccess }: LoanProcessProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loanFrequency, setLoanFrequency] = useState<'monthly' | 'bi-weekly'>('monthly');
  const [allowAgentBiWeekly, setAllowAgentBiWeekly] = useState(true);

  const particles = [
    { id: 0, x: -120, duration: 2.5 },
    { id: 1, x: 80, duration: 3.2 },
    { id: 2, x: -40, duration: 2.1 },
    { id: 3, x: 140, duration: 3.8 },
    { id: 4, x: -90, duration: 2.9 },
    { id: 5, x: 30, duration: 3.5 },
    { id: 6, x: -150, duration: 2.2 },
    { id: 7, x: 110, duration: 3.1 },
    { id: 8, x: -10, duration: 2.7 },
    { id: 9, x: 60, duration: 3.4 },
    { id: 10, x: -70, duration: 2.8 },
    { id: 11, x: 45, duration: 3.6 },
    { id: 12, x: -130, duration: 2.3 },
    { id: 13, x: 95, duration: 3.3 },
    { id: 14, x: -25, duration: 2.6 },
    { id: 15, x: 120, duration: 3.7 },
  ];

  const nextStep = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(prev => prev + 1);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ scale: 0.9, y: 40, opacity: 0, rotateX: 10 }}
        animate={{ scale: 1, y: 0, opacity: 1, rotateX: 0 }}
        exit={{ scale: 0.9, y: 40, opacity: 0, rotateX: 10 }}
        className="w-full max-w-[420px] glass-card border border-white/20 rounded-[44px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative z-10"
      >
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-outfit font-black text-white tracking-tighter italic">NEW APPLICATION</h2>
              <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em] neon-glow-text">Fintech Pro Suite</p>
            </div>
            <button onClick={onClose} className="p-2.5 rounded-2xl glass-card-light border-white/10 text-white/40 hover:text-white transition-colors">
              <X className="w-5.5 h-5.5" />
            </button>
          </div>

          <div className="flex gap-2.5 mb-10">
            {[1, 2, 3].map(s => (
              <div 
                key={s} 
                className={`h-2 rounded-full flex-1 transition-all duration-500 ${s <= step ? 'green-gradient-bg neon-glow-green' : 'bg-white/5'}`} 
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="customer-info"
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -30, opacity: 0 }}
                className="space-y-6"
              >
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em] ml-2">Personal Identity</label>
                  <div className="neu-input p-1 hover:border-emerald-500/30 transition-colors group">
                    <div className="flex items-center px-4">
                      <User className="w-5 h-5 text-emerald-500/40 group-focus-within:text-emerald-500 transition-colors" />
                      <input type="text" placeholder="FULL NAME" className="w-full bg-transparent px-4 py-4 text-sm font-black text-white outline-none placeholder:text-white/10 uppercase tracking-widest" />
                    </div>
                  </div>
                  <div className="neu-input p-1 hover:border-emerald-500/30 transition-colors group">
                    <div className="flex items-center px-4">
                      <Smartphone className="w-5 h-5 text-emerald-500/40 group-focus-within:text-emerald-500 transition-colors" />
                      <input type="tel" placeholder="MOBILE CONTACT" className="w-full bg-transparent px-4 py-4 text-sm font-black text-white outline-none placeholder:text-white/10 uppercase tracking-widest" />
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em] ml-2">Asset Details</label>
                  <div className="neu-input p-1 hover:border-emerald-500/30 transition-colors">
                    <input type="text" placeholder="DEVICE MODEL (E.G. IPHONE 15)" className="w-full bg-transparent px-8 py-4 text-sm font-black text-white outline-none placeholder:text-white/10 uppercase tracking-widest" />
                  </div>
                </div>
                <button 
                  onClick={nextStep}
                  disabled={loading}
                  className="w-full py-5 green-gradient-bg rounded-[24px] font-black text-xs text-white uppercase tracking-[0.25em] shadow-2xl active:scale-95 transition-all mt-6 three-d-button neon-glow-green"
                >
                  {loading ? 'ANALYZING...' : 'CONTINUE TO NACH'} <ArrowRight className="w-5 h-5 inline ml-2" />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="nach-mandate"
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -30, opacity: 0 }}
                className="space-y-6 text-center"
              >
                <div className="w-24 h-24 rounded-[32px] bg-white/5 border border-emerald-500/20 flex items-center justify-center mx-auto shadow-inner relative group">
                   <div className="absolute inset-0 bg-emerald-500/10 rounded-[inherit] blur-2xl group-hover:bg-emerald-500/20 transition-all" />
                   <div className="relative">
                      <CreditCard className="w-12 h-12 text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                      <div className="absolute -top-3 -right-3 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-[10px] font-black italic border-4 border-[#061611] shadow-2xl">R</div>
                   </div>
                </div>
                <div>
                   <h3 className="text-2xl font-black text-white italic tracking-tighter">Razorpay <span className="text-emerald-400 font-normal not-italic tracking-normal">e-NACH</span></h3>
                   <p className="text-[11px] text-emerald-400/40 mt-1.5 uppercase font-black tracking-[0.3em] neon-glow-text">SECURE AUTOPAY SETUP</p>
                </div>

                {/* Switch to enable/disable alternative schedule selection */}
                <div className="bg-white/5 border border-white/10 p-3 rounded-2xl text-left text-xs flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-bold text-white text-[10px] uppercase tracking-wider">Alt Schedule Toggle</span>
                    <span className="text-white/40 text-[9px]">Allow bi-weekly scheduling for customers</span>
                  </div>
                  <button 
                    onClick={() => {
                      setAllowAgentBiWeekly(prev => {
                        const nextVal = !prev;
                        if (!nextVal) setLoanFrequency('monthly');
                        return nextVal;
                      });
                    }} 
                    className={`w-9 h-5 rounded-full p-0.5 transition-colors flex items-center ${allowAgentBiWeekly ? 'bg-emerald-500 justify-end' : 'bg-white/10 justify-start'}`}
                  >
                    <div className="w-3.5 h-3.5 bg-white rounded-full shadow-sm" />
                  </button>
                </div>

                {/* Dynamic Choice tabs */}
                {allowAgentBiWeekly && (
                  <div className="flex p-0.5 bg-white/5 border border-white/5 rounded-2xl relative z-20">
                    <button 
                      onClick={() => setLoanFrequency('monthly')}
                      className={`flex-1 py-2 rounded-xl font-bold text-[9px] uppercase tracking-widest transition-all ${loanFrequency === 'monthly' ? 'green-gradient-bg text-white shadow-md' : 'text-white/30'}`}
                    >
                      Monthly
                    </button>
                    <button 
                      onClick={() => setLoanFrequency('bi-weekly')}
                      className={`flex-1 py-2 rounded-xl font-bold text-[9px] uppercase tracking-widest transition-all ${loanFrequency === 'bi-weekly' ? 'green-gradient-bg text-white shadow-md' : 'text-white/30'}`}
                    >
                      Bi-Weekly
                    </button>
                  </div>
                )}
                
                <div className="glass-card-light space-y-5 text-left p-6 border-white/10 rounded-[32px] relative overflow-hidden group">
                   <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />
                   <div className="flex justify-between items-center pb-4 border-b border-white/5 relative z-10">
                     <span className="text-[10px] uppercase font-black text-white/30 tracking-widest">BORROWER</span>
                     <span className="text-sm font-black text-white neon-glow-text">VIKRIM SINGH</span>
                   </div>
                   <div className="grid grid-cols-2 gap-6 relative z-10">
                      <div>
                        <span className="text-[9px] uppercase font-black text-white/20 block mb-1.5 tracking-widest">
                          {loanFrequency === 'monthly' ? 'Monthly EMI' : 'Bi-Weekly Pay'}
                        </span>
                        <span className="text-lg font-black text-white green-gradient-text">
                          {loanFrequency === 'monthly' ? '₹ 5,240' : '₹ 2,420'}
                        </span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase font-black text-white/20 block mb-1.5 tracking-widest">FREQUENCY</span>
                        <span className="text-lg font-black text-white uppercase italic">
                          {loanFrequency === 'monthly' ? 'Monthly' : 'Bi-Weekly'}
                        </span>
                      </div>
                   </div>
                </div>

                <div className="flex gap-4 relative z-10">
                  <button onClick={() => setStep(step - 1)} className="flex-1 py-5 glass-card border-white/10 rounded-[22px] font-black text-[10px] uppercase tracking-widest text-white/30 hover:text-white/60 active:scale-95 transition-all">
                    BACK
                  </button>
                  <button 
                     onClick={nextStep}
                     disabled={loading}
                     className="flex-1 py-5 green-gradient-bg rounded-[22px] font-black text-[10px] uppercase tracking-widest text-white shadow-2xl shadow-emerald-900/40 active:scale-95 transition-all three-d-button neon-glow-green"
                  >
                    {loading ? 'Processing...' : 'Confirm e-Mandate'}
                  </button>
                </div>
                <div className="flex items-center justify-center gap-2.5 pt-2 opacity-40">
                   <ShieldCheck className="w-4 h-4 text-emerald-400" />
                   <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white">Bank Grade Encryption</span>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="success"
                initial={{ scale: 0.8, opacity: 0, rotateZ: -5 }}
                animate={{ scale: 1, opacity: 1, rotateZ: 0 }}
                className="text-center py-6 relative overflow-hidden"
              >
                {/* Simulated Confetti Effect */}
                <div className="absolute inset-0 pointer-events-none">
                  {particles.map((p) => (
                    <motion.div
                      key={p.id}
                      initial={{ y: -20, x: p.x, rotate: 0 }}
                      animate={{ y: 500, rotate: 360 }}
                      transition={{ duration: p.duration, repeat: Infinity, ease: "linear" }}
                      className="absolute w-1.5 h-1.5 bg-emerald-400/60 rounded-full blur-[1px]"
                    />
                  ))}
                </div>

                <div className="w-28 h-28 rounded-[36px] green-gradient-bg shadow-[0_20px_50px_rgba(16,185,129,0.5)] flex items-center justify-center mx-auto mb-10 transform -rotate-6 relative z-10 border border-white/20 neon-glow-green">
                   <CheckCircle2 className="w-14 h-14 text-white drop-shadow-lg" />
                </div>
                <h3 className="text-4xl font-outfit font-black text-white mb-4 tracking-tighter italic drop-shadow-2xl">CONGRATS!</h3>
                <p className="text-xs font-black text-emerald-400 uppercase tracking-[0.4em] mb-6 neon-glow-text">Loan Disbursed Instantly</p>
                
                <div className="glass-card-light p-8 rounded-[40px] border-emerald-500/30 mb-10 space-y-5 relative group overflow-hidden">
                   <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                   <div className="flex justify-between items-center relative z-10">
                      <span className="text-[11px] font-black text-white/40 uppercase tracking-widest">DISBURSED AMOUNT</span>
                      <span className="text-2xl font-black text-white green-gradient-text tracking-tighter italic">₹ 42,000</span>
                   </div>
                   <div className="flex justify-between items-center pt-4 border-t border-white/5 relative z-10">
                      <span className="text-[11px] font-black text-white/40 uppercase tracking-widest">DESTINATION</span>
                      <span className="text-xs font-black text-white tracking-widest uppercase">HDFC BANK ••••2104</span>
                   </div>
                </div>

                <button 
                  onClick={onSuccess}
                  className="w-full py-6 green-gradient-bg rounded-[28px] font-black text-xs uppercase tracking-[0.3em] text-white shadow-[0_20px_50px_rgba(0,0,0,0.5)] active:scale-95 transition-all three-d-button neon-glow-green border border-white/10"
                >
                  Back to Dashboard
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle, 
  User, 
  Bell, 
  Filter, 
  Zap, 
  TrendingUp, 
  Plus, 
  QrCode,
  Clock,
  FileText,
  Loader2
} from 'lucide-react';
import LoanProcess from '@/components/LoanProcess';
import { TiltCard } from '@/components/AgentUI';
import { getSupabase } from '@/lib/supabase';

// Keep mocked data as fallback
const FALLBACK_APPLICATIONS_DATA = [
  { 
    id: 1,
    name: 'Amit Kumar', 
    phone: '+91 98*** ***45', 
    device: 'Samsung S24 Ultra', 
    amount: '84,999', 
    status: 'Approved', 
    statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    time: '2 hours ago', 
    icon: CheckCircle 
  },
  { 
    id: 2,
    name: 'Priya Singh', 
    phone: '+91 97*** ***21', 
    device: 'Vivo V30 Pro', 
    amount: '42,500', 
    status: 'Pending', 
    statusColor: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    time: '5 hours ago', 
    icon: Clock 
  }
];

const SHOPS_DATA = [
  { id: 1, name: 'Mobile Hub Delhi', code: 'SHOP-12345', loans: 1247, volume: '₹8.2L', icon: '🏪', progress: 95 },
  { id: 2, name: 'TechZone Mumbai', code: 'SHOP-67890', loans: 986, volume: '₹6.5L', icon: '📱', progress: 78 },
];

const HOT_MOBILES = [
  { id: 1, name: 'iPhone 15 Pro', specs: '256GB • 24GB RAM', price: '1,12,000', badge: '🔥 Hot' },
  { id: 2, name: 'Samsung S24 Ultra', specs: '512GB • 12GB RAM', price: '85,000', badge: '🏆 Top' },
  { id: 3, name: 'OnePlus 12', specs: '256GB • 16GB RAM', price: '48,000', badge: '🔥 Hot' },
];

export default function AgentDashboard() {
  const [statusFilter, setStatusFilter] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [showLoanFlow, setShowLoanFlow] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const supabase = getSupabase();
        const { data, error } = await supabase
          .from('loans')
          .select('*, customers(full_name, phone)')
          .order('created_at', { ascending: false })
          .limit(5);

        if (error) throw error;

        if (data && data.length > 0) {
          const formatted = data.map((loan: any) => ({
            id: loan.id,
            name: loan.customers?.full_name || 'Unknown Customer',
            phone: loan.customers?.phone || 'N/A',
            device: loan.device_imei || 'Unknown Device',
            amount: loan.total_amount?.toLocaleString() || '0',
            status: loan.status,
            statusColor: loan.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
            time: 'Just now',
            icon: loan.status === 'Approved' ? CheckCircle : Clock
          }));
          setApplications(formatted);
        } else {
          setApplications(FALLBACK_APPLICATIONS_DATA);
        }
      } catch (err) {
        console.warn("Supabase fetch failed, using fallback data:", err);
        setApplications(FALLBACK_APPLICATIONS_DATA);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLoans();
  }, []);

  const filteredApplications = useMemo(() => {
    return applications.filter(app => {
      const statusMatch = statusFilter === 'All' || app.status === statusFilter;
      return statusMatch;
    });
  }, [statusFilter, applications]);

  return (
    <div className="pt-6 px-5 pb-28 space-y-8 relative">
      <AnimatePresence>
        {showLoanFlow && (
          <LoanProcess 
            onClose={() => setShowLoanFlow(false)} 
            onSuccess={() => {
              setShowLoanFlow(false);
              setShowToast(true);
              setTimeout(() => setShowToast(false), 3000);
            }} 
          />
        )}

        {showToast && (
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-28 left-5 right-5 z-[100]"
          >
            <div className="glass-card-light p-4 rounded-[24px] border border-emerald-500/30 flex items-center gap-3 shadow-2xl">
              <div className="w-10 h-10 rounded-xl green-gradient-bg flex items-center justify-center text-white">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Application Recorded</p>
                <p className="text-[11px] text-white/50">Tracking id: #TRC-2024-881</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Bar */}
      <div className="flex justify-between items-center glass-card px-4 py-3 rounded-[28px] border-white/10 shadow-2xl animate-slide-up">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 rounded-2xl green-gradient-bg flex items-center justify-center text-white font-black text-xl shadow-xl">T</div>
           <div className="flex flex-col">
             <span className="font-outfit font-black text-white tracking-tighter text-base leading-none">TRICCU</span>
             <span className="text-emerald-400 font-bold text-[9px] tracking-[0.3em] leading-none mt-1 uppercase">Agent Hub</span>
           </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <button className="p-2.5 rounded-2xl glass-card-light border-white/5 text-white/60 active:scale-95 transition-all">
              <Bell className="w-5.5 h-5.5" />
            </button>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-[10px] font-black flex items-center justify-center shadow-lg border-2 border-[#061611]">3</span>
          </div>
        </div>
      </div>

      {/* Bonus Banner */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="glass-card p-4 border-l-4 border-emerald-500 flex items-center gap-4 animate-slide-up delay-1"
      >
        <div className="w-12 h-12 rounded-2xl green-gradient-bg flex items-center justify-center text-white shadow-lg">
          <Zap className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-black text-white italic">FESTIVAL BONUS LIVE!</h4>
          <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest mt-0.5">Earn 15% extra commission this week</p>
        </div>
        <button className="text-[10px] font-black text-emerald-400 uppercase tracking-widest p-2">View</button>
      </motion.div>

      {/* Agent Level & Circular Progress */}
      <TiltCard className="animate-slide-up delay-2">
        <div className="glass-card p-6 border-white/20 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-[24px] overflow-hidden border-2 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                  <User className="w-full h-full p-3 text-emerald-400 bg-emerald-500/10" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-[#061611] flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-black text-white italic tracking-tight">Master Rahul 👋</h3>
                <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Level 12 • Platinum Zone</p>
              </div>
            </div>
            {/* Circular Progress */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-white/5" strokeWidth="4" />
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" strokeWidth="4" strokeDasharray="88, 100" strokeLinecap="round" />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-base font-black text-white leading-none">88</span>
                <span className="text-[6px] font-black text-white/30 uppercase">Score</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="glass-card-light p-3 text-center border-white/5 rounded-2xl">
              <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">Loans</p>
              <p className="text-xl font-black text-white italic">142</p>
            </div>
            <div className="glass-card-light p-3 text-center border-white/5 rounded-2xl">
              <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">Success</p>
              <p className="text-xl font-black text-emerald-400 italic">94%</p>
            </div>
            <div className="glass-card-light p-3 text-center border-white/5 rounded-2xl">
              <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">Earnings</p>
              <p className="text-xl font-black text-yellow-500 italic">₹1.2L</p>
            </div>
          </div>
        </div>
      </TiltCard>

      {/* Target & CTA */}
      <TiltCard className="animate-slide-up delay-3">
        <div className="glass-card p-8 border-white/20 shadow-2xl relative group overflow-hidden">
           <div className="absolute top-4 right-4 flex gap-1">
             <motion.span animate={{ rotateY: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="text-2xl">🪙</motion.span>
             <motion.span animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-2xl">💰</motion.span>
           </div>

           <div className="text-center space-y-1 mb-8">
             <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">Monthly Target</p>
             <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl font-black text-white italic tracking-tighter">12</span>
                <span className="text-xl font-black text-white/20 italic">/ 15</span>
             </div>
             <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mt-4">
                <motion.div initial={{ width: 0 }} whileInView={{ width: "80%" }} transition={{ duration: 1.5 }} className="h-full green-gradient-bg neon-glow-green" />
             </div>
           </div>

           <button 
             onClick={() => setShowLoanFlow(true)}
             className="w-full py-5 green-gradient-bg rounded-[24px] font-black text-sm uppercase tracking-[0.3em] text-white shadow-2xl three-d-button neon-glow-green border border-white/10 flex items-center justify-center gap-3"
           >
             <QrCode className="w-5 h-5" />
             Scan Shop QR
           </button>
        </div>
      </TiltCard>

      {/* Horizontal Recent Activity */}
      <div className="space-y-4 animate-slide-up delay-4">
        <div className="flex justify-between items-end px-2">
          <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] italic">📋 Live Activity</h3>
          <button className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">See All →</button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide px-1">
          {filteredApplications.map((app) => (
            <TiltCard key={app.id} className="min-w-[240px]">
              <div className="glass-card p-5 border-white/10 space-y-4">
                <div className="flex justify-between items-start">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10`}>
                    <app.icon className={`w-6 h-6 ${app.statusColor.split(' ')[1]}`} />
                  </div>
                  <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest border ${app.statusColor}`}>
                    {app.status}
                  </span>
                </div>
                <div>
                  <h4 className="font-outfit font-black text-white">{app.name}</h4>
                  <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest mt-1">{app.device}</p>
                </div>
                <div className="flex justify-between items-end pt-4 border-t border-white/5">
                  <span className="text-lg font-black text-white italic tracking-tighter">₹{app.amount}</span>
                  <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest">{app.time}</span>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      {/* Top Shop Sellers Grid */}
      <div className="space-y-4 animate-slide-up delay-5">
        <div className="flex justify-between items-end px-2">
          <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] italic">🏪 Top Shop Sellers</h3>
          <button className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">All Shops</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {SHOPS_DATA.map((shop) => (
            <TiltCard key={shop.id}>
              <div className="glass-card p-5 border-white/10 space-y-4 hover:border-emerald-500/30 transition-all">
                <div className="w-12 h-12 rounded-2xl green-gradient-bg flex items-center justify-center text-white text-2xl shadow-xl">
                  {shop.icon}
                </div>
                <div>
                  <h4 className="font-outfit font-black text-white leading-tight truncate">{shop.name}</h4>
                  <p className="text-[9px] text-white/30 font-bold uppercase tracking-widest mt-1">{shop.code}</p>
                </div>
                <div className="flex justify-between text-center pt-4 border-t border-white/5">
                  <div>
                    <p className="text-[8px] font-bold text-white/20 uppercase mb-1">Loans</p>
                    <p className="text-xs font-black text-white">{shop.loans}</p>
                  </div>
                  <div>
                    <p className="text-[8px] font-bold text-white/20 uppercase mb-1">Volume</p>
                    <p className="text-xs font-black text-emerald-400">{shop.volume}</p>
                  </div>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                   <div className="h-full green-gradient-bg" style={{ width: `${shop.progress}%` }} />
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      {/* Hot Selling Mobiles */}
      <div className="space-y-4 animate-slide-up delay-6">
        <div className="flex justify-between items-end px-2">
          <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] italic">📱 Hot Models</h3>
          <button className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Catalog</button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide px-1">
          {HOT_MOBILES.map((phone) => (
            <TiltCard key={phone.id} className="min-w-[170px]">
              <div className="glass-card p-5 border-white/10 text-center relative overflow-hidden group">
                <div className="absolute top-2 right-2 text-[8px] font-black bg-red-500 text-white px-2 py-0.5 rounded-full uppercase tracking-widest animate-pulse">
                  {phone.badge}
                </div>
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity }} className="text-5xl my-4">📱</motion.div>
                <h4 className="font-outfit font-black text-white text-sm">{phone.name}</h4>
                <p className="text-[9px] text-white/30 font-bold uppercase mt-1">{phone.specs}</p>
                <div className="mt-4 pt-4 border-t border-white/5">
                   <p className="text-[8px] font-bold text-white/20 uppercase mb-1">Loan From</p>
                   <p className="text-base font-black text-emerald-400 italic">₹{phone.price}</p>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      {/* Best Customer Award Luxury Card */}
      <div className="animate-slide-up delay-7 mb-10">
        <TiltCard>
          <div className="glass-card p-6 border-white/20 shadow-2xl relative overflow-hidden group bg-gradient-to-br from-[#061611] to-[#0A2A1E]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-[60px] group-hover:bg-yellow-500/20 transition-all duration-700" />
            <div className="flex items-center gap-5 relative z-10">
               <motion.div 
                 animate={{ rotateY: 360 }} 
                 transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                 className="text-6xl flex-shrink-0"
               >
                 🏆
               </motion.div>
               <div>
                  <span className="text-[8px] font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent uppercase tracking-[0.4em]">Platinum Winner</span>
                  <h3 className="text-xl font-black text-white italic tracking-tighter mt-1">Rajesh Kumar</h3>
                  <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-1">Perfect 12-month repayment streak</p>
                  <div className="flex gap-4 mt-4">
                     <div className="flex items-center gap-1.5">
                        <span className="text-sm">🪙</span>
                        <span className="text-xs font-black text-yellow-500 italic">12,000 pts</span>
                     </div>
                     <div className="flex items-center gap-1.5">
                        <span className="text-sm">⭐</span>
                        <span className="text-xs font-black text-emerald-400 italic">5-Star Ranking</span>
                     </div>
                  </div>
               </div>
            </div>
            
            <div className="flex gap-3 mt-6 pt-6 border-t border-white/5 relative z-10">
              {[
                { id: '🥈', name: 'Priya S.', pts: '9.8k' },
                { id: '🥉', name: 'Amit P.', pts: '8.5k' },
                { id: '4️⃣', name: 'Neha K.', pts: '7.2k' },
                { id: '5️⃣', name: 'Vikram J.', pts: '6.1k' },
              ].map(r => (
                <div key={r.name} className="flex-1 text-center group/runner transition-transform hover:-translate-y-1">
                  <span className="text-2xl block mb-1">{r.id}</span>
                  <p className="text-[8px] font-black text-white/30 truncate">{r.name}</p>
                  <p className="text-[8px] font-black text-yellow-400/60 uppercase">{r.pts}</p>
                </div>
              ))}
            </div>
          </div>
        </TiltCard>
      </div>

      {/* Live Updates Filters */}
      <div className="space-y-4">
          <div className="flex justify-between items-center px-1">
             <div className="flex items-center gap-3">
                <div className="w-1.5 h-6 green-gradient-bg rounded-full shadow-lg" />
                <h3 className="text-sm font-black text-white uppercase italic tracking-widest">Filters</h3>
             </div>
             <button onClick={() => setShowFilters(!showFilters)} className="p-2 transition-all active:scale-95">
                <Filter className={`w-5 h-5 ${showFilters ? 'text-emerald-400' : 'text-white/20'}`} />
             </button>
          </div>
          
          <AnimatePresence>
            {showFilters && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden flex gap-2">
                {['All', 'Pending', 'Approved', 'Disbursed'].map(f => (
                  <button 
                    key={f} 
                    onClick={() => setStatusFilter(f)}
                    className={`flex-1 py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all ${statusFilter === f ? 'green-gradient-bg text-white shadow-lg' : 'bg-white/5 text-white/30 border border-white/5'}`}
                  >
                    {f}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
      </div>

    </div>
  );
}

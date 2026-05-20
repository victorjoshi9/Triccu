'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  Filter, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Eye, 
  Award, 
  Upload, 
  UserPlus, 
  Smartphone,
  ChevronDown
} from 'lucide-react';
import Link from 'next/link';

interface AgentLoanApplication {
  id: string;
  name: string;
  phone: string;
  device: string;
  amount: number;
  tenure: string;
  shopName: string;
  status: 'Approved' | 'Pending' | 'Disbursed' | 'Declined';
  uploadedDocs: string[];
}

const APPLICATIONS: AgentLoanApplication[] = [
  {
    id: 'TRC-2024-881',
    name: 'Amit Kumar',
    phone: '+91 98124 10245',
    device: 'Samsung S24 Ultra',
    amount: 84999,
    tenure: '12 Months',
    shopName: 'Mobile Hub Delhi',
    status: 'Approved',
    uploadedDocs: ['Aadhaar', 'PAN Proof', 'Selfie']
  },
  {
    id: 'TRC-2024-912',
    name: 'Priya Singh',
    phone: '+91 97410 88321',
    device: 'Vivo V30 Pro',
    amount: 42500,
    tenure: '6 Months',
    shopName: 'Sharma Electronics',
    status: 'Pending',
    uploadedDocs: ['Aadhaar', 'Selfie']
  },
  {
    id: 'TRC-2024-741',
    name: 'Sneha Gupta',
    phone: '+91 88247 61999',
    device: 'iPhone 15 Pro',
    amount: 72000,
    tenure: '12 Months',
    shopName: ' शर्मा Electronics',
    status: 'Disbursed',
    uploadedDocs: ['Aadhaar', 'PAN Proof', 'Selfie', 'NACH Authorization']
  }
];

export default function AgentLoansPage() {
  const [apps, setApps] = useState<AgentLoanApplication[]>(APPLICATIONS);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Approved' | 'Pending' | 'Disbursed'>('All');
  const [showOnboardingForm, setShowOnboardingForm] = useState(false);

  // New Application form state
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newDevice, setNewDevice] = useState('iPhone 15 Pro');
  const [newAmount, setNewAmount] = useState('72,000');
  const [newTenure, setNewTenure] = useState('12 Months');

  const filteredApps = useMemo(() => {
    return apps.filter(app => {
      const matchSearch = app.name.toLowerCase().includes(search.toLowerCase()) || 
                          app.id.toLowerCase().includes(search.toLowerCase()) || 
                          app.device.toLowerCase().includes(search.toLowerCase());
      const matchStatus = filterStatus === 'All' || app.status === filterStatus;
      return matchSearch && matchStatus;
    });
  }, [apps, search, filterStatus]);

  const handleSubmitNewApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPhone) return;

    const newApp: AgentLoanApplication = {
      id: `TRC-2024-${Math.floor(100 + Math.random() * 900)}`,
      name: newName,
      phone: newPhone,
      device: newDevice,
      amount: parseInt(newAmount.replace(/,/g, '')),
      tenure: newTenure,
      shopName: 'Sharma Electronics',
      status: 'Pending',
      uploadedDocs: ['Aadhaar', 'Selfie']
    };

    setApps([newApp, ...apps]);
    setShowOnboardingForm(false);
    setNewName('');
    setNewPhone('');
  };

  return (
    <div className="pt-6 px-5 pb-28 space-y-6 text-white min-h-screen bg-[#061611]">
      <div className="flex justify-between items-center bg-transparent py-2">
        <Link href="/agent" className="p-2.5 rounded-2xl glass-card-light border-white/5 text-white/60 active:scale-95 transition-all">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h2 className="text-lg font-black font-outfit italic tracking-tight text-white uppercase">Loan Processing</h2>
        <button 
          onClick={() => setShowOnboardingForm(true)}
          className="p-2.5 rounded-2xl green-gradient-bg text-white shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center border border-white/10"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* New Onboarding Form Overlay */}
      <AnimatePresence>
        {showOnboardingForm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-card w-full max-w-md p-6 border-white/15 shadow-2xl relative bg-[#061611]/95 text-white flex flex-col"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-black font-outfit italic tracking-tight flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-emerald-400" />
                  CREATE CUSTOMER
                </h3>
                <button onClick={() => setShowOnboardingForm(false)} className="text-white/40 hover:text-white uppercase text-xs font-bold tracking-widest p-2">Close</button>
              </div>

              <form onSubmit={handleSubmitNewApp} className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[9px] font-black uppercase text-white/30 tracking-widest ml-1">Customer Full Name (Legal ID)</span>
                  <input 
                    type="text" 
                    required
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-[#1A1A2E]/50 border border-white/10 rounded-xl px-4 py-3 text-xs placeholder:text-white/30 text-white outline-none focus:border-emerald-500/50"
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] font-black uppercase text-white/30 tracking-widest ml-1">Mobile Contact Phone</span>
                  <input 
                    type="tel" 
                    required
                    value={newPhone}
                    onChange={e => setNewPhone(e.target.value)}
                    placeholder="e.g. +91 94110 39221"
                    className="w-full bg-[#1A1A2E]/50 border border-white/10 rounded-xl px-4 py-3 text-xs placeholder:text-white/30 text-white outline-none focus:border-emerald-500/50"
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] font-black uppercase text-white/30 tracking-widest ml-1">Target Device Financed</span>
                  <select 
                    value={newDevice}
                    onChange={e => setNewDevice(e.target.value)}
                    className="w-full bg-[#11231f]/90 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-emerald-500/50"
                  >
                    <option value="iPhone 15 Pro">iPhone 15 Pro</option>
                    <option value="Samsung S24 Ultra">Samsung S24 Ultra</option>
                    <option value="Vivo V30 Pro">Vivo V30 Pro</option>
                    <option value="OnePlus 12">OnePlus 12</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-[9px] font-black uppercase text-white/30 tracking-widest ml-1">Volume Amount (Rs)</span>
                    <input 
                      type="text" 
                      value={newAmount}
                      onChange={e => setNewAmount(e.target.value)}
                      className="w-full bg-[#1A1A2E]/50 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-emerald-500/50"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] font-black uppercase text-white/30 tracking-widest ml-1">Tenure Range</span>
                    <select 
                      value={newTenure}
                      onChange={e => setNewTenure(e.target.value)}
                      className="w-full bg-[#11231f]/90 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-emerald-500/50"
                    >
                      <option value="6 Months">6 Months</option>
                      <option value="12 Months">12 Months</option>
                      <option value="18 Months">18 Months</option>
                    </select>
                  </div>
                </div>

                {/* Simulated Docs checklist */}
                <div className="p-4 bg-white/5 border border-white/5 rounded-xl space-y-2">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Initial KYC files uploaded</span>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1.5 text-[10px] text-white/60">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Selfie Captured
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-white/60">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Aadhaar Front/Back
                    </div>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-emerald-500 font-bold rounded-xl text-white tracking-[0.2em] uppercase text-xs shadow-lg shadow-emerald-950/40 border border-white/10 mt-4 h-12 flex items-center justify-center hover:bg-emerald-400 transition-colors"
                >
                  Create Application
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* KPI mini row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="glass-card-light p-3.5 text-center border-white/5 rounded-xl">
          <p className="text-[8px] font-bold text-white/30 uppercase tracking-wider">Approved Volume</p>
          <p className="text-sm font-black text-white italic mt-1">₹1.56L</p>
        </div>
        <div className="glass-card-light p-3.5 text-center border-white/5 rounded-xl">
          <p className="text-[8px] font-bold text-white/30 uppercase tracking-wider">Pending Checks</p>
          <p className="text-sm font-black text-yellow-400 mt-1">1 Applications</p>
        </div>
        <div className="glass-card-light p-3.5 text-center border-white/5 rounded-xl">
          <p className="text-[8px] font-bold text-white/30 uppercase tracking-wider">Disbursement Rate</p>
          <p className="text-sm font-black text-emerald-400 mt-1">100%</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-3">
        <div className="relative">
          <span className="absolute inset-y-0 left-4 flex items-center pr-3 pointer-events-none">
            <Search className="h-4 w-4 text-white/40" />
          </span>
          <input 
            type="text" 
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search matching names or phone..." 
            className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-xs text-white placeholder-white/30 focus:border-white/20 focus:outline-none transition-colors"
          />
        </div>

        {/* Categories Tab slider */}
        <div className="flex gap-2.5 overflow-x-auto pb-1">
          {(['All', 'Approved', 'Pending', 'Disbursed'] as const).map(tab => (
            <button 
              key={tab}
              onClick={() => setFilterStatus(tab)}
              className={`px-4 py-2 text-[10px] uppercase font-bold tracking-widest rounded-xl border transition-all ${
                filterStatus === tab 
                  ? 'green-gradient-bg border-white/10 text-white shadow-md' 
                  : 'bg-white/5 hover:bg-white/10 text-white/40 border-white/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Applications list */}
      <div className="space-y-4">
        {filteredApps.length === 0 ? (
          <div className="glass-card p-8 border-white/5 flex flex-col items-center justify-center text-center text-white/40 space-y-2">
            <Clock className="w-8 h-8 text-white/20" />
            <p className="text-xs">No customer portfolio matching query.</p>
          </div>
        ) : (
          filteredApps.map((app, idx) => (
            <motion.div 
              key={app.id}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="glass-card p-5 border-white/10 space-y-4 relative overflow-hidden group"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/15 flex items-center justify-center text-emerald-400">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-outfit font-black text-sm text-white">{app.name}</h3>
                    <p className="text-[10px] text-white/45 mt-0.5">{app.phone}</p>
                  </div>
                </div>
                <span className={`text-[8px] font-black tracking-widest uppercase px-2.5 py-1 rounded-full border ${
                  app.status === 'Approved' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' :
                  app.status === 'Disbursed' ? 'text-blue-405 bg-blue-500/10 border-blue-500/20' : 'text-yellow-405 bg-yellow-500/10 border-yellow-500/20'
                }`}>
                  {app.status}
                </span>
              </div>

              <div className="flex justify-between items-end pt-3 border-t border-white/5 text-xs text-white/50">
                <div>
                  <p className="text-[9px] uppercase font-bold text-white/30 tracking-wider">Device Model</p>
                  <p className="font-bold text-white text-xs mt-0.5">{app.device}</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase font-bold text-white/30 tracking-wider text-right">Financed Cost</p>
                  <p className="font-bold text-emerald-400 text-xs mt-0.5 text-right">₹{app.amount.toLocaleString()}</p>
                </div>
              </div>

              {/* Uploaded Documents List inside file status tracker */}
              <div className="flex gap-1.5 flex-wrap pt-1.5">
                {app.uploadedDocs.map(doc => (
                  <span key={doc} className="text-[8px] font-bold uppercase tracking-wide bg-emerald-500/5 text-emerald-405/70 border border-emerald-500/15 px-2 py-0.5 rounded-md">
                    ✓ {doc}
                  </span>
                ))}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

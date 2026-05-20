'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Calendar, 
  ShieldCheck, 
  Clock, 
  FileText, 
  Search, 
  Smartphone, 
  CheckCircle, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp, 
  CreditCard, 
  ArrowUpRight, 
  Lock
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Installment {
  number: number;
  dueDate: string;
  amount: number;
  status: 'Paid' | 'Scheduled' | 'Failed' | 'Pending';
  paidOn?: string;
  paymentMethod?: string;
}

interface Loan {
  id: string;
  device: string;
  imageUrl: string;
  originalAmount: number;
  outstandingAmount: number;
  appliedDate: string;
  status: 'Active' | 'Processing' | 'Completed' | 'Declined';
  frequency: 'Monthly' | 'Bi-Weekly';
  installmentAmount: number;
  tenure: string;
  downpayment: number;
  interestRate: string;
  linkedAccount: string;
  deviceLockStatus: 'Active' | 'Not Applicable' | 'Pending Activation';
  installments: Installment[];
}

const LOANS_DATA: Loan[] = [
  {
    id: 'TRC-8924',
    device: 'iPhone 15 Pro',
    imageUrl: 'https://picsum.photos/seed/iphone15/200/200',
    originalAmount: 72000,
    outstandingAmount: 64500,
    appliedDate: '12 May 2026',
    status: 'Active',
    frequency: 'Monthly',
    installmentAmount: 6450,
    tenure: '12 Months',
    downpayment: 12000,
    interestRate: '11.5% p.a.',
    linkedAccount: 'HDFC Bank (•••• 4920)',
    deviceLockStatus: 'Active',
    installments: [
      { number: 1, dueDate: '05 Jun 2026', amount: 6450, status: 'Scheduled' },
      { number: 2, dueDate: '05 Jul 2026', amount: 6450, status: 'Scheduled' },
      { number: 3, dueDate: '05 Aug 2026', amount: 6450, status: 'Scheduled' },
      { number: 4, dueDate: '05 Sep 2026', amount: 6450, status: 'Scheduled' },
      { number: 5, dueDate: '05 Oct 2026', amount: 6450, status: 'Scheduled' },
    ]
  },
  {
    id: 'TRC-9104',
    device: 'iPad Air (5th Gen)',
    imageUrl: 'https://picsum.photos/seed/ipadair/200/200',
    originalAmount: 54000,
    outstandingAmount: 54000,
    appliedDate: '18 May 2026',
    status: 'Processing',
    frequency: 'Bi-Weekly',
    installmentAmount: 2420,
    tenure: '12 Months',
    downpayment: 8000,
    interestRate: '12.0% p.a.',
    linkedAccount: 'HDFC Bank (•••• 4920)',
    deviceLockStatus: 'Pending Activation',
    installments: [
      { number: 1, dueDate: '01 Jun 2026', amount: 2420, status: 'Pending' },
      { number: 2, dueDate: '15 Jun 2026', amount: 2420, status: 'Pending' },
      { number: 3, dueDate: '29 Jun 2026', amount: 2420, status: 'Pending' },
    ]
  },
  {
    id: 'TRC-4120',
    device: 'Vivo V29 Pro',
    imageUrl: 'https://picsum.photos/seed/vivov29/200/200',
    originalAmount: 38000,
    outstandingAmount: 0,
    appliedDate: '10 Aug 2024',
    status: 'Completed',
    frequency: 'Monthly',
    installmentAmount: 3800,
    tenure: '10 Months',
    downpayment: 5000,
    interestRate: '11.0% p.a.',
    linkedAccount: 'State Bank of India (•••• 7811)',
    deviceLockStatus: 'Not Applicable',
    installments: [
      { number: 1, dueDate: '10 Sep 2024', amount: 3800, status: 'Paid', paidOn: '08 Sep 2024', paymentMethod: 'Auto-Debit' },
      { number: 2, dueDate: '10 Oct 2024', amount: 3800, status: 'Paid', paidOn: '09 Oct 2024', paymentMethod: 'Auto-Debit' },
      { number: 3, dueDate: '10 Nov 2024', amount: 3800, status: 'Paid', paidOn: '10 Nov 2024', paymentMethod: 'Auto-Debit' },
      { number: 4, dueDate: '10 Dec 2024', amount: 3800, status: 'Paid', paidOn: '07 Dec 2024', paymentMethod: 'Google Pay' },
      { number: 5, dueDate: '10 Jan 2025', amount: 3800, status: 'Paid', paidOn: '09 Jan 2025', paymentMethod: 'Auto-Debit' },
    ]
  },
  {
    id: 'TRC-3029',
    device: 'Samsung Galaxy Watch 6',
    imageUrl: 'https://picsum.photos/seed/samwatch/200/200',
    originalAmount: 24000,
    outstandingAmount: 0,
    appliedDate: '10 Jan 2026',
    status: 'Declined',
    frequency: 'Monthly',
    installmentAmount: 2400,
    tenure: '10 Months',
    downpayment: 4000,
    interestRate: '12.5% p.a.',
    linkedAccount: 'HDFC Bank (•••• 4920)',
    deviceLockStatus: 'Not Applicable',
    installments: []
  }
];

export default function LoanHistoryPage() {
  const [activeTab, setActiveTab] = useState<'All' | 'Active' | 'Processing' | 'Completed'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedLoan, setExpandedLoan] = useState<string | null>('TRC-8924'); // Default open first loan

  const filteredLoans = useMemo(() => {
    return LOANS_DATA.filter(loan => {
      // Filter by Status Tab
      if (activeTab !== 'All') {
        if (activeTab === 'Active' && loan.status !== 'Active') return false;
        if (activeTab === 'Processing' && loan.status !== 'Processing') return false;
        if (activeTab === 'Completed' && loan.status !== 'Completed') return false;
      }

      // Filter by Search Query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = loan.device.toLowerCase().includes(query);
        const matchesId = loan.id.toLowerCase().includes(query);
        return matchesName || matchesId;
      }

      return true;
    });
  }, [activeTab, searchQuery]);

  const toggleExpand = (loanId: string) => {
    setExpandedLoan(expandedLoan === loanId ? null : loanId);
  };

  const getStatusStyle = (status: Loan['status']) => {
    switch (status) {
      case 'Active':
        return 'text-emerald-450 bg-emerald-500/10 border-emerald-500/20';
      case 'Processing':
        return 'text-sky-450 bg-sky-500/10 border-sky-500/20';
      case 'Completed':
        return 'text-slate-300 bg-white/5 border-white/15';
      case 'Declined':
        return 'text-red-400 bg-red-500/10 border-red-500/20';
      default:
        return 'text-white/55 bg-white/5';
    }
  };

  return (
    <div className="pt-8 px-6 pb-24 space-y-6 min-h-screen text-white bg-[#061611]">
      
      {/* Top Header */}
      <div className="flex items-center justify-between mb-2">
        <Link href="/customer" className="p-2.5 rounded-2xl glass-card-light border-white/5 text-white/70 active:scale-95 transition-all">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-bold font-outfit text-white tracking-tight">Loan Portfolio</h1>
        <div className="w-10 h-10 rounded-full overflow-hidden relative border border-white/10 glass-card">
           <Image src="https://picsum.photos/seed/sneha/100/100" alt="Profile" fill className="object-cover" referrerPolicy="no-referrer" />
        </div>
      </div>

      {/* Portfolio Overview Widget */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-card p-6 border-white/10 relative overflow-hidden"
      >
        <div className="absolute top-[-20%] right-[-10%] w-28 h-28 bg-[var(--color-triccu-leaf)]/10 rounded-full blur-2xl pointer-events-none" />
        <h4 className="text-[10px] text-white/40 uppercase tracking-[0.25em] font-black">Net outstanding liability</h4>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-3xl font-black font-outfit text-white">Rs. 1,18,500</span>
          <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/25 px-2 py-0.5 rounded-full">2 Loans</span>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mt-6 pt-5 border-t border-white/5 text-center">
          <div>
            <p className="text-[9px] text-white/30 uppercase tracking-widest font-bold">Total Financed</p>
            <p className="text-sm font-bold text-white mt-1">Rs. 1.64L</p>
          </div>
          <div className="border-x border-white/5">
            <p className="text-[9px] text-white/30 uppercase tracking-widest font-bold">Paid Off</p>
            <p className="text-sm font-bold text-emerald-400 mt-1">Rs. 45,500</p>
          </div>
          <div>
            <p className="text-[9px] text-white/30 uppercase tracking-widest font-bold">Credit Limit</p>
            <p className="text-sm font-bold text-white/80 mt-1">Rs. 2.0L</p>
          </div>
        </div>
      </motion.div>

      {/* Search Bar */}
      <div className="relative">
        <span className="absolute inset-y-0 left-4 flex items-center pr-3 pointer-events-none">
          <Search className="h-4 w-4 text-white/40" />
        </span>
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search devices or Loan IDs..." 
          className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-xs text-white placeholder-white/30 focus:border-white/20 focus:outline-none transition-colors"
        />
      </div>

      {/* Navigation tabs */}
      <div className="flex p-1 bg-[#1A1A2E]/40 border border-white/10 rounded-2xl">
        {(['All', 'Active', 'Processing', 'Completed'] as const).map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all ${activeTab === tab ? 'red-gradient-bg text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Loans List Section */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredLoans.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="glass-card p-8 border-white/5 flex flex-col items-center justify-center text-center text-white/40 space-y-3"
            >
              <FileText className="w-10 h-10 text-white/20" />
              <p className="text-xs">No records found matching your selection.</p>
            </motion.div>
          ) : (
            filteredLoans.map((loan, idx) => {
              const isExpanded = expandedLoan === loan.id;
              
              return (
                <motion.div 
                  key={loan.id}
                  layoutId={`loan-${loan.id}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`glass-card border-white/10 overflow-hidden relative transition-all duration-300 ${isExpanded ? 'ring-1 ring-white/15' : 'hover:border-white/20'}`}
                >
                  {/* Summary/Card Header info */}
                  <div 
                    onClick={() => toggleExpand(loan.id)}
                    className="p-5 flex items-center justify-between cursor-pointer select-none relative z-10"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden relative bg-white/5 border border-white/10 flex-shrink-0">
                        <Image 
                          src={loan.imageUrl} 
                          alt={loan.device} 
                          fill 
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <h3 className="font-outfit font-bold text-sm text-white">{loan.device}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-white/50">{loan.id}</span>
                          <span className="w-1 h-1 bg-white/20 rounded-full" />
                          <span className="text-[10px] text-white/40">{loan.appliedDate}</span>
                        </div>
                        <div className="flex items-center gap-2 pt-0.5">
                          <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full border tracking-widest uppercase ${getStatusStyle(loan.status)}`}>
                            {loan.status}
                          </span>
                          <span className="text-[8px] font-bold text-white/40 uppercase bg-white/5 px-2 py-0.5 rounded-full">
                            {loan.frequency}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1 text-right">
                      <span className="text-sm font-black text-white">Rs. {loan.originalAmount.toLocaleString()}</span>
                      <span className="text-[9px] text-white/40">Tenure: {loan.tenure}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-white/40 mt-1" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-white/40 mt-1" />
                      )}
                    </div>
                  </div>

                  {/* Expanded detail accordion */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden border-t border-white/5 bg-[#0e211b]/30"
                      >
                        <div className="p-5 space-y-6 text-xs relative z-10">
                          
                          {/* Details Metadata Grid */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/5 p-3 rounded-xl border border-white/5 space-y-1">
                              <span className="text-[9px] text-white/45 uppercase tracking-wider font-medium">Auto-Debit frequency</span>
                              <p className="font-bold text-white text-xs">{loan.frequency} EMI Payments</p>
                            </div>
                            <div className="bg-white/5 p-3 rounded-xl border border-white/5 space-y-1">
                              <span className="text-[9px] text-white/45 uppercase tracking-wider font-medium">Linked bank account</span>
                              <p className="font-bold text-white text-xs truncate">{loan.linkedAccount}</p>
                            </div>
                            <div className="bg-white/5 p-3 rounded-xl border border-white/5 space-y-1">
                              <span className="text-[9px] text-white/45 uppercase tracking-wider font-medium">Interest & Pricing</span>
                              <p className="font-bold text-white text-xs">{loan.interestRate} Fixed</p>
                            </div>
                            <div className="bg-white/5 p-3 rounded-xl border border-white/5 space-y-1">
                              <span className="text-[9px] text-white/45 uppercase tracking-wider font-medium">Triccu Device Lock</span>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <Lock className="w-3.5 h-3.5 text-emerald-450" />
                                <p className="font-bold text-emerald-400 text-[10px] uppercase tracking-wider">
                                  {loan.deviceLockStatus}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Loan Summary breakdown in rows */}
                          <div className="bg-[#1A1A2E]/50 rounded-xl p-4 border border-white/5 space-y-2.5">
                            <div className="flex justify-between">
                              <span className="text-white/50 font-medium">Financed Device Cost</span>
                              <span className="font-bold text-white">Rs. {loan.originalAmount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/50 font-medium">Downpayment Made</span>
                              <span className="font-bold text-white">Rs. {loan.downpayment.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between border-t border-white/5 pt-2.5 mt-1.5">
                              <span className="text-white/50 font-medium">Remaining Outstanding</span>
                              <span className="font-bold text-emerald-400 text-sm">Rs. {loan.outstandingAmount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/50 font-medium">{loan.frequency} Debit Amount</span>
                              <span className="font-bold text-white">Rs. {loan.installmentAmount.toLocaleString()}</span>
                            </div>
                          </div>

                          {/* Installment History list */}
                          {loan.installments.length > 0 && (
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <h4 className="text-[10px] text-white/40 uppercase tracking-widest font-black">Installments breakdown</h4>
                                <span className="text-[9px] text-emerald-400 font-bold">NACH Mandate Registered</span>
                              </div>
                              
                              <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1 scrollbar-thin">
                                {loan.installments.map((inst, index) => (
                                  <div key={index} className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/5">
                                    <div className="flex items-center gap-3">
                                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${inst.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-white/5 text-white/50 border border-white/5'}`}>
                                        #{inst.number}
                                      </div>
                                      <div>
                                        <p className="font-bold text-white">Rs. {inst.amount.toLocaleString()}</p>
                                        <p className="text-[9px] text-white/40">Due Date: {inst.dueDate}</p>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                                        inst.status === 'Paid' ? 'text-emerald-400 bg-emerald-500/5 border-emerald-500/15' : 
                                        inst.status === 'Scheduled' ? 'text-blue-450 bg-blue-500/5 border-blue-500/15' : 'text-white/50 bg-white/5 border-white/5'
                                      }`}>
                                        {inst.status}
                                      </span>
                                      {inst.paidOn && (
                                        <p className="text-[8px] text-white/30 mt-1">Paid on {inst.paidOn}</p>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Warning for active and processing loans */}
                          {loan.status === 'Active' && (
                            <div className="flex items-start gap-2.5 p-3.5 bg-yellow-500/5 border border-yellow-500/10 rounded-xl">
                              <AlertCircle className="w-4.5 h-4.5 text-yellow-500 flex-shrink-0 mt-0.5" />
                              <p className="text-[10px] text-white/60 leading-relaxed">
                                Autopay mandate is configured on this account. Ensure that sufficient funds are present in your account before the scheduled due date to prevent system-triggered device locking.
                              </p>
                            </div>
                          )}

                          {loan.status === 'Processing' && (
                            <div className="flex items-start gap-2.5 p-3.5 bg-sky-500/5 border border-sky-500/10 rounded-xl">
                              <Clock className="w-4.5 h-4.5 text-sky-500 flex-shrink-0 mt-0.5" />
                              <p className="text-[10px] text-white/60 leading-relaxed">
                                Your application is currently going through verification and credit validation checks. Our agent will update you once finalized. Auto-debits will kick in after disbursement.
                              </p>
                            </div>
                          )}

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}

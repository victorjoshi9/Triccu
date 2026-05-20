'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { IndianRupee, ShieldCheck, ChevronRight, Smartphone, Calendar, AlertCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getSupabase } from '@/lib/supabase';

export default function CustomerDashboard() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>({ name: 'Loading...', loan: null });

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const supabase = getSupabase();
        // Since we are mocking auth context locally, fetch latest loan
        const { data: loanData, error } = await supabase
          .from('loans')
          .select('*, customers(full_name)')
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (loanData) {
          setProfile({
            name: loanData.customers?.full_name || 'Customer',
            loan: {
              id: loanData.id,
              device: loanData.device_imei || 'Device',
              amount: loanData.total_amount || 0,
              emi: loanData.emi_amount || 0,
            }
          });
        } else {
          setProfile({ name: 'Sneha Gupta', loan: { id: 'TRC-8924', device: 'iPhone 15 Pro', amount: 64500, emi: 6450 } });
        }
      } catch (err) {
        console.warn("Supabase fetch failed, using fallback:", err);
        setProfile({ name: 'Sneha Gupta', loan: { id: 'TRC-8924', device: 'iPhone 15 Pro', amount: 64500, emi: 6450 } });
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <Loader2 className="w-8 h-8 animate-spin text-red-500" />
      </div>
    );
  }

  return (
    <div className="pt-12 px-6 pb-6 space-y-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-2">
        <div>
          <p className="text-xs text-white/50 font-medium mb-1">Welcome back,</p>
          <h2 className="text-xl font-bold text-white">{profile.name}</h2>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/customer/onboarding" className="text-[10px] font-bold uppercase tracking-widest text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-full hover:bg-red-500/20 transition-colors">
            Start Onboarding
          </Link>
          <div className="w-10 h-10 rounded-full overflow-hidden relative border border-white/10 shadow-sm glass-card">
             <Image src="https://picsum.photos/seed/sneha/100/100" alt="Profile" fill className="object-cover" referrerPolicy="no-referrer" />
          </div>
        </div>
      </header>

      {/* Active Loan Card */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-card p-6 relative overflow-hidden flex flex-col border-white/10"
      >
        <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        
        <div className="flex justify-between items-start mb-6 z-10">
           <div>
             <h3 className="text-white font-bold text-lg">{profile.loan?.device}</h3>
             <p className="text-white/60 text-xs mt-1">Loan #{profile.loan?.id}</p>
           </div>
           <div className="bg-green-500/10 backdrop-blur-md px-3 py-1 rounded-full border border-green-500/20 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-green-400" />
              <span className="text-[10px] font-bold text-green-400 uppercase tracking-wide">Secured</span>
           </div>
        </div>
        
        <div className="flex justify-between items-end mb-6 z-10 border-b border-white/10 pb-4">
           <div>
             <p className="text-white/50 text-xs font-medium mb-1 uppercase tracking-wider">Outstanding</p>
             <h2 className="text-3xl font-outfit font-bold text-white">Rs. {profile.loan?.amount?.toLocaleString()}</h2>
           </div>
           <div className="text-right">
             <p className="text-white/50 text-xs font-medium mb-1 uppercase tracking-wider">Next EMI</p>
             <p className="text-lg font-bold text-white">05 Jun 2026</p>
           </div>
        </div>
        
        <div className="flex justify-between items-center z-10">
           <div>
              <p className="text-white/50 text-xs font-medium mb-1 uppercase tracking-wider">EMI Amount</p>
              <p className="text-lg font-bold text-white">Rs. {profile.loan?.emi?.toLocaleString()}</p>
           </div>
           <button 
             onClick={async () => {
               try {
                 // 1. Load Razorpay SDK
                 const res = await new Promise((resolve) => {
                    const script = document.createElement('script');
                    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
                    script.onload = () => resolve(true);
                    script.onerror = () => resolve(false);
                    document.body.appendChild(script);
                 });
                 if (!res) {
                   alert('Razorpay SDK failed to load');
                   return;
                 }

                 // 2. Call Admin API to create order
                 const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL || 'http://localhost:3000';
                 const orderResponse = await fetch(`${adminUrl}/api/payment`, {
                   method: 'POST',
                   headers: { 'Content-Type': 'application/json' },
                   body: JSON.stringify({
                     action: 'CREATE_ORDER',
                     payload: {
                       amount: profile.loan?.emi || 6450,
                       loanId: profile.loan?.id || 'TRC-8924',
                       customerId: profile.name
                     }
                   })
                 });
                 
                 const orderData = await orderResponse.json();
                 if (!orderData.success) throw new Error(orderData.error);

                 // 3. Open Razorpay Checkout Modal
                 const options = {
                    key: 'rzp_test_mock_key', // Mock or public key
                    amount: orderData.order.amount,
                    currency: "INR",
                    name: "Triccu Finance",
                    description: `EMI Payment for Loan ${profile.loan?.id}`,
                    order_id: orderData.order.id,
                    handler: async function (response: any) {
                      // 4. Verify Payment with Admin API
                      const verifyResponse = await fetch(`${adminUrl}/api/payment`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          action: 'VERIFY_PAYMENT',
                          payload: {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            loanId: profile.loan?.id || 'TRC-8924'
                          }
                        })
                      });
                      const verifyData = await verifyResponse.json();
                      if(verifyData.success) {
                        alert('EMI Payment Successful! Device Unlocked.');
                      } else {
                        alert('Payment verification failed.');
                      }
                    },
                    prefill: {
                      name: profile.name,
                      contact: "9999999999"
                    },
                    theme: { color: "#ef4444" } // Red-500
                 };
                 
                 const paymentObject = new (window as any).Razorpay(options);
                 paymentObject.open();
               } catch (err: any) {
                 console.error('Payment Error:', err);
                 alert('Could not initiate payment. Check console.');
               }
             }}
             className="red-gradient-bg text-white text-xs font-bold py-2.5 px-5 rounded-xl shadow-lg shadow-red-900/40 hover:scale-105 active:scale-95 transition-transform flex items-center gap-1 uppercase tracking-widest"
           >
             Pay EMI <ChevronRight className="w-4 h-4" />
           </button>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Link href="/customer/loans" className="block">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/5 transition-colors border-white/5"
          >
            <div className="w-12 h-12 rounded-full bg-[#1A1A2E]/50 text-blue-400 flex items-center justify-center mb-2 border border-blue-500/20">
               <Calendar className="w-6 h-6" />
            </div>
            <p className="text-xs font-bold text-white">EMI Schedule</p>
          </motion.div>
        </Link>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/5 transition-colors border-white/5"
        >
          <div className="w-12 h-12 rounded-full bg-[#1A1A2E]/50 text-green-400 flex items-center justify-center mb-2 border border-green-500/20">
             <IndianRupee className="w-6 h-6" />
          </div>
          <p className="text-xs font-bold text-white">Auto-Pay (NACH)</p>
          <p className="text-[9px] text-green-400 font-bold uppercase tracking-widest mt-1">Active</p>
        </motion.div>
      </div>

      {/* Alert */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="glass-card border-yellow-500/20 bg-yellow-500/5 p-4 flex items-start gap-3"
      >
        <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-bold text-yellow-500">Maintain Bank Balance</h4>
          <p className="text-[11px] text-white/60 mt-1 leading-relaxed">
            Please ensure you have sufficient balance in your linked HDFC account before 05 Jun 2026 for auto-debit of Rs. 6,450.
          </p>
        </div>
      </motion.div>
      
      {/* Device Lock Info */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-4 border-white/5 flex items-center justify-between"
      >
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1A1A2E]/50 border border-white/10 flex items-center justify-center text-white/50">
               <Smartphone className="w-5 h-5" />
            </div>
            <div>
               <h4 className="text-sm font-bold text-white">Mobile Finance Lock</h4>
               <p className="text-[10px] text-green-400 uppercase tracking-widest font-bold mt-1">Active on device</p>
            </div>
         </div>
         <ChevronRight className="w-4 h-4 text-white/30" />
      </motion.div>
    </div>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabase';
import { Loader2, Search, Smartphone, Lock, Unlock, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

export default function DeviceLocksPage() {
  const [loans, setLoans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocks = async () => {
      try {
        const supabase = getSupabase();
        const { data, error } = await supabase
          .from('loans')
          .select('*, customers(full_name, phone)')
          .in('device_status', ['LOCKED', 'WARNING', 'ACTIVE'])
          .order('updated_at', { ascending: false });
        
        if (data) setLoans(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLocks();
  }, []);

  const toggleLock = async (loanId: string, currentStatus: string) => {
     alert(`Simulating API call to Knox MDM to ${currentStatus === 'LOCKED' ? 'UNLOCK' : 'LOCK'} device...`);
     // In a real scenario, you'd fetch POST to /api/action
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Device Control</h1>
          <p className="text-gray-500 font-medium">Manage OEM level device locks for defaulted payments.</p>
        </div>
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search IMEI..." className="neo-input pl-10" />
        </div>
      </header>

      {loading ? (
        <div className="flex justify-center items-center h-64">
           <Loader2 className="w-8 h-8 animate-spin text-red-500" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loans.map((loan, idx) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              key={loan.id}
              className={`neo-card p-6 border-t-4 ${loan.device_status === 'LOCKED' ? 'border-red-500' : 'border-green-500'}`}
            >
              <div className="flex justify-between items-start mb-4">
                 <div className={`p-3 rounded-full ${loan.device_status === 'LOCKED' ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'}`}>
                    <Smartphone className="w-6 h-6" />
                 </div>
                 <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-1 rounded-md ${loan.device_status === 'LOCKED' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                   {loan.device_status || 'ACTIVE'}
                 </span>
              </div>
              
              <div className="mb-6">
                 <h3 className="text-lg font-bold text-gray-900">{loan.device_imei || 'Unknown Device'}</h3>
                 <p className="text-sm text-gray-500">Customer: {loan.customers?.full_name}</p>
                 <p className="text-sm text-gray-500">Contact: {loan.customers?.phone}</p>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => toggleLock(loan.id, loan.device_status)}
                  className={`flex-1 py-3 rounded-xl font-bold flex justify-center items-center gap-2 transition-colors ${
                    loan.device_status === 'LOCKED' 
                      ? 'bg-green-50 text-green-600 hover:bg-green-100' 
                      : 'bg-orange-50 text-orange-600 hover:bg-orange-100'
                  }`}
                >
                  {loan.device_status === 'LOCKED' ? <><Unlock className="w-4 h-4"/> Unlock</> : <><Lock className="w-4 h-4"/> Lock</>}
                </button>
                <button 
                  onClick={() => alert('Simulating Revoke action...')}
                  className="flex-1 py-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl font-bold flex justify-center items-center gap-2 transition-colors"
                >
                  <AlertTriangle className="w-4 h-4"/> Revoke
                </button>
              </div>
            </motion.div>
          ))}
          
          {loans.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500">
               No device tracking records found.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabase';
import { Loader2, Search, Briefcase, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function LoansPage() {
  const [loans, setLoans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const supabase = getSupabase();
        const { data, error } = await supabase
          .from('loans')
          .select('*, customers(full_name)')
          .order('created_at', { ascending: false });
        
        if (data) setLoans(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLoans();
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Loan Applications</h1>
          <p className="text-gray-500 font-medium">Review and manage active, pending, and completed loans.</p>
        </div>
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search loans..." className="neo-input pl-10" />
        </div>
      </header>

      {loading ? (
        <div className="flex justify-center items-center h-64">
           <Loader2 className="w-8 h-8 animate-spin text-red-500" />
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 text-xs uppercase tracking-wider">
                <th className="pb-4 font-semibold">Loan / Device</th>
                <th className="pb-4 font-semibold">Customer</th>
                <th className="pb-4 font-semibold">Amount</th>
                <th className="pb-4 font-semibold">Status</th>
                <th className="pb-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {loans.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">No loan records found.</td>
                </tr>
              ) : (
                loans.map((loan, idx) => (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={loan.id} 
                    className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4">
                      <p className="font-bold text-gray-900">{loan.device_imei || 'Unknown Device'}</p>
                      <p className="text-xs text-gray-500">TRC-{loan.id.slice(0,6).toUpperCase()}</p>
                    </td>
                    <td className="py-4 text-sm text-gray-700">
                      {loan.customers?.full_name || 'N/A'}
                    </td>
                    <td className="py-4">
                      <p className="font-bold text-gray-900">₹{(loan.total_amount || 0).toLocaleString()}</p>
                      <p className="text-xs text-gray-500">EMI: ₹{(loan.emi_amount || 0).toLocaleString()}</p>
                    </td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        loan.status === 'Approved' || loan.status === 'Disbursed' ? 'bg-green-50 text-green-600' :
                        loan.status === 'Pending' ? 'bg-orange-50 text-orange-600' : 'bg-red-50 text-red-600'
                      }`}>
                        {loan.status || 'Pending'}
                      </span>
                    </td>
                    <td className="py-4">
                      <button className="text-xs font-bold text-red-500 hover:underline">View Details</button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

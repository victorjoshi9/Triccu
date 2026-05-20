'use client';

import React, { useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabase';
import { Loader2, Search, Wallet, ArrowDownRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function WalletsPage() {
  const [shops, setShops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const supabase = getSupabase();
        const { data, error } = await supabase
          .from('shops')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (data) setShops(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchWallets();
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shop Wallets & Payouts</h1>
          <p className="text-gray-500 font-medium">Manage merchant balances and process withdrawal requests.</p>
        </div>
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search shop or ID..." className="neo-input pl-10" />
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
                <th className="pb-4 font-semibold">Shop Details</th>
                <th className="pb-4 font-semibold">Wallet Balance</th>
                <th className="pb-4 font-semibold">Pending Payouts</th>
                <th className="pb-4 font-semibold">Status</th>
                <th className="pb-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {shops.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">No shop wallets found.</td>
                </tr>
              ) : (
                shops.map((shop, idx) => (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={shop.id} 
                    className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                        <Wallet className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{shop.name || 'Unknown Shop'}</p>
                        <p className="text-xs text-gray-500">Code: {shop.code || 'N/A'}</p>
                      </div>
                    </td>
                    <td className="py-4">
                      <p className="font-bold text-gray-900 text-lg">₹{(shop.wallet_balance || 84500).toLocaleString()}</p>
                    </td>
                    <td className="py-4">
                      <p className="font-bold text-orange-500 flex items-center gap-1">
                         <ArrowDownRight className="w-4 h-4"/> ₹0
                      </p>
                    </td>
                    <td className="py-4">
                      <span className="px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-bold flex items-center gap-1 inline-flex">
                        <CheckCircle2 className="w-3 h-3" /> Active
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <button className="px-4 py-2 bg-[var(--color-triccu-red)] text-white text-xs font-bold rounded-lg shadow-md hover:bg-red-700 transition-colors">
                        Process Payout
                      </button>
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

'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { IndianRupee, QrCode as QrCodeIcon, TrendingUp, Smartphone, ChevronRight, Package, ArrowUpRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { getSupabase } from '@/lib/supabase';
import { QRCodeSVG } from 'qrcode.react';

// Fallback data
const FALLBACK_DISBURSEMENTS = [
  { model: 'iPhone 15 Pro', amount: '1,34,900', dp: '34,900', status: 'Disbursed', time: 'Today' },
  { model: 'Samsung S24 Ultra', amount: '1,29,999', dp: '29,999', status: 'Disbursed', time: 'Yesterday' },
];

export default function ShopDashboard() {
  const [loading, setLoading] = useState(true);
  const [shopStats, setShopStats] = useState<any>({ name: 'Loading...', volume: 0, balance: 0, loansCount: 0, code: 'SH-8492' });
  const [disbursements, setDisbursements] = useState<any[]>([]);

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const supabase = getSupabase();
        
        // Mocking auth context locally, fetch one shop and its loans
        const { data: shopData } = await supabase
          .from('shops')
          .select('*')
          .limit(1)
          .single();

        const { data: loansData, error } = await supabase
          .from('loans')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);

        if (shopData) {
          setShopStats({
            name: shopData.name || 'Sharma Electronics',
            code: shopData.code || 'SH-8492',
            volume: 240000, // This would normally be an aggregate query
            balance: 84500,
            loansCount: 142
          });
        } else {
          setShopStats({ name: 'Sharma Electronics', code: 'SH-8492', volume: 240000, balance: 84500, loansCount: 142 });
        }

        if (loansData && loansData.length > 0) {
          setDisbursements(loansData.map((l: any) => ({
            model: l.device_imei || 'Device',
            amount: l.total_amount?.toLocaleString() || '0',
            dp: (l.total_amount * 0.2).toLocaleString() || '0', // mock dp
            status: l.status,
            time: 'Recently'
          })));
        } else {
          setDisbursements(FALLBACK_DISBURSEMENTS);
        }
      } catch (err) {
        console.warn("Supabase fetch failed, using fallback:", err);
        setShopStats({ name: 'Sharma Electronics', code: 'SH-8492', volume: 240000, balance: 84500, loansCount: 142 });
        setDisbursements(FALLBACK_DISBURSEMENTS);
      } finally {
        setLoading(false);
      }
    };

    fetchShopData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="pt-12 px-6 pb-6 space-y-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-sm font-bold text-gray-900">{shopStats.name}</h2>
          <p className="text-xs text-blue-600 font-semibold flex items-center gap-1">Store ID: {shopStats.code}</p>
        </div>
        <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100 flex items-center justify-center relative group cursor-pointer hover:scale-105 transition-transform">
           <QRCodeSVG 
              value={JSON.stringify({ shopId: shopStats.code, shopName: shopStats.name })} 
              size={40} 
              fgColor="#1e3a8a" 
           />
           <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
        </div>
      </header>

      {/* Main Stats */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="neo-card p-6 relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800"
      >
        <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
        <div className="mb-6 border-b border-white/20 pb-4">
          <p className="text-white/80 text-sm font-medium mb-1">Total Loan Value (MTD)</p>
          <div className="flex items-end gap-2">
            <h3 className="text-4xl font-bold text-white">Rs. {(shopStats.volume / 100000).toFixed(1)}L</h3>
            <span className="text-sm font-medium text-green-300 flex items-center mb-1"><TrendingUp className="w-3 h-3 mr-1"/> 12%</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
            <div>
              <p className="text-white/70 text-xs font-medium mb-1">Wallet Balance</p>
              <p className="text-xl font-bold text-white">Rs. {shopStats.balance.toLocaleString()}</p>
            </div>
            <button className="bg-white text-blue-600 text-xs font-bold py-2 px-4 rounded-lg flex items-center gap-1 shadow-md">
              Withdraw
            </button>
        </div>
      </motion.div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card border border-gray-100 p-4 flex flex-col justify-between shadow-sm bg-white"
        >
          <div className="flex justify-between items-start mb-4">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                 <Smartphone className="w-4 h-4" />
              </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 mb-1">{shopStats.loansCount}</p>
            <p className="text-xs font-medium text-gray-500">Phones Financed</p>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card border border-gray-100 p-4 flex flex-col justify-between shadow-sm bg-white"
        >
          <div className="flex justify-between items-start mb-4">
              <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center">
                 <Package className="w-4 h-4" />
              </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 mb-1">28</p>
            <p className="text-xs font-medium text-gray-500">Active Inventory</p>
          </div>
        </motion.div>
      </div>

      {/* Recent Store Loans */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-gray-900">Recent Disbursements</h3>
          <Link href="/shop/loans" className="text-xs text-blue-600 font-medium flex items-center">
            View All <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
        
        <div className="space-y-3">
          {disbursements.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 + (i*0.1) }}
              className="bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 flex items-center justify-between"
            >
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-900">{item.model}</span>
                <span className="text-xs text-gray-400 mt-1">DP: Rs. {item.dp}</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900">Rs. {item.amount}</p>
                <p className={`text-[10px] font-bold mt-1 ${item.status === 'Disbursed' || item.status === 'Approved' ? 'text-green-500' : 'text-orange-500'}`}>
                  {item.status}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

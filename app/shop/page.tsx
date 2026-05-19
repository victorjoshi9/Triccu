'use client';

import { motion } from 'motion/react';
import { IndianRupee, QrCode, TrendingUp, Smartphone, ChevronRight, Package, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function ShopDashboard() {
  return (
    <div className="pt-12 px-6 pb-6 space-y-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-sm font-bold text-gray-900">Sharma Electronics</h2>
          <p className="text-xs text-[var(--color-triccu-red)] font-semibold flex items-center gap-1">Store ID: SH-8492</p>
        </div>
        <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100">
           <QrCode className="w-6 h-6 text-gray-800" />
        </div>
      </header>

      {/* Main Stats */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="neo-card p-6 relative overflow-hidden"
      >
        <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
        <div className="mb-6 border-b border-white/20 pb-4">
          <p className="text-white/80 text-sm font-medium mb-1">Total Loan Value (MTD)</p>
          <div className="flex items-end gap-2">
            <h3 className="text-4xl font-bold text-white">Rs. 2.4L</h3>
            <span className="text-sm font-medium text-green-300 flex items-center mb-1"><TrendingUp className="w-3 h-3 mr-1"/> 12%</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
            <div>
              <p className="text-white/70 text-xs font-medium mb-1">Wallet Balance</p>
              <p className="text-xl font-bold text-white">Rs. 84,500</p>
            </div>
            <button className="bg-white text-[var(--color-triccu-red)] text-xs font-bold py-2 px-4 rounded-lg flex items-center gap-1">
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
          className="neo-card-light p-4 flex flex-col justify-between"
        >
          <div className="flex justify-between items-start mb-4">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                 <Smartphone className="w-4 h-4" />
              </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 mb-1">142</p>
            <p className="text-xs font-medium text-gray-500">Phones Financed</p>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="neo-card-light p-4 flex flex-col justify-between"
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
          <Link href="/shop/loans" className="text-xs text-[var(--color-triccu-red)] font-medium flex items-center">
            View All <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
        
        <div className="space-y-3">
          {[
            { model: 'iPhone 15 Pro', amount: '1,34,900', dp: '34,900', status: 'Disbursed', time: 'Today' },
            { model: 'Samsung S24 Ultra', amount: '1,29,999', dp: '29,999', status: 'Disbursed', time: 'Yesterday' },
            { model: 'OnePlus 12', amount: '64,999', dp: '14,999', status: 'Processing', time: '2 days ago' }
          ].map((item, i) => (
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
                <p className={`text-[10px] font-bold mt-1 ${item.status === 'Disbursed' ? 'text-green-500' : 'text-orange-500'}`}>
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

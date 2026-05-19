'use client';

import { motion } from 'motion/react';
import { IndianRupee, Users, Smartphone, Lock, ArrowUpRight, ArrowDownRight, Clock, CheckCircle2, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', disbursed: 400000, collected: 240000 },
  { name: 'Tue', disbursed: 300000, collected: 139800 },
  { name: 'Wed', disbursed: 200000, collected: 980000 },
  { name: 'Thu', disbursed: 278000, collected: 390800 },
  { name: 'Fri', disbursed: 189000, collected: 480000 },
  { name: 'Sat', disbursed: 239000, collected: 380000 },
  { name: 'Sun', disbursed: 349000, collected: 430000 },
];

export default function AdminDashboard() {
  const kpis = [
    { title: 'Total Active Loans', value: '4,289', trend: '+12%', icon: Users, isPositive: true },
    { title: 'Total Disbursed', value: '₹4.2Cr', trend: '+8.4%', icon: IndianRupee, isPositive: true },
    { title: 'EMIs Collected Today', value: '₹12.4L', trend: '-2.1%', icon: CheckCircle2, isPositive: false },
    { title: 'Locked Devices', value: '142', trend: '+4', icon: Lock, isPositive: false },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Command Center</h1>
          <p className="text-gray-500 font-medium">Real-time overview of platform activity across all agents and shops.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-2 rounded-xl bg-white text-gray-700 font-semibold border border-white/40 shadow-[4px_4px_10px_rgba(0,0,0,0.05),-4px_-4px_10px_rgba(255,255,255,1)] hover:bg-gray-50 transition-colors">
            Download Report
          </button>
          <button className="px-6 py-2 neo-button">
            Approve Pending (12)
          </button>
        </div>
      </header>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="neo-card-light p-6 flex flex-col justify-between"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-white rounded-xl shadow-sm">
                <kpi.icon className="w-6 h-6 text-[var(--color-triccu-red)]" />
              </div>
              <span className={`inline-flex items-center gap-1 text-sm font-bold ${kpi.isPositive ? 'text-green-600' : 'text-red-500'}`}>
                {kpi.isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {kpi.trend}
              </span>
            </div>
            <div>
              <h3 className="text-gray-500 text-sm font-medium mb-1">{kpi.title}</h3>
              <p className="text-3xl font-bold text-gray-900">{kpi.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Area */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 neo-card-light p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Financial Overview</h2>
            <select className="neo-input w-auto text-sm py-1">
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} tickFormatter={(value) => `₹${value/1000}k`} />
                <Tooltip 
                  cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="disbursed" name="Disbursed" fill="#1A1A2E" radius={[4, 4, 0, 0]} />
                <Bar dataKey="collected" name="Collected" fill="#FF0844" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Action Needed */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="neo-card p-6 flex flex-col text-white"
        >
          <div className="flex items-center gap-3 mb-6 opacity-90">
            <Clock className="w-5 h-5" />
            <h2 className="text-xl font-bold">Needs Attention</h2>
          </div>
          
          <div className="space-y-4 flex-1">
            <div className="bg-white/10 rounded-xl p-4 border border-white/20 backdrop-blur-sm">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">Pending Approvals</h3>
                <span className="bg-white text-[var(--color-triccu-red)] text-xs font-bold px-2 py-1 rounded-md">12</span>
              </div>
              <p className="text-sm opacity-80 text-white/80">Loan applications waiting for admin review.</p>
              <button className="mt-3 text-sm font-medium text-white hover:underline flex items-center gap-1">
                Review Now <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="bg-white/10 rounded-xl p-4 border border-white/20 backdrop-blur-sm">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">Overdue EMIs (48h+)</h3>
                <span className="bg-white text-[var(--color-triccu-orange)] text-xs font-bold px-2 py-1 rounded-md">34</span>
              </div>
              <p className="text-sm opacity-80 text-white/80">Accounts flagged for potential device lock.</p>
              <button className="mt-3 text-sm font-medium text-white hover:underline flex items-center gap-1">
                Trigger Locks <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="bg-white/10 rounded-xl p-4 border border-white/20 backdrop-blur-sm">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">Wallet Withdrawals</h3>
                <span className="bg-white text-gray-900 text-xs font-bold px-2 py-1 rounded-md">8</span>
              </div>
              <p className="text-sm opacity-80 text-white/80">Agent and shop owner payout requests.</p>
              <button className="mt-3 text-sm font-medium text-white hover:underline flex items-center gap-1">
                Process Payouts <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  );
}

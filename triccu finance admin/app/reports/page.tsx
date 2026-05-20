'use client';

import React from 'react';
import { Download, FileText, PieChart, TrendingUp, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

export default function ReportsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Platform Reports</h1>
          <p className="text-gray-500 font-medium">Export analytics, tax documents, and performance metrics.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="neo-card p-6 flex flex-col items-center text-center gap-4"
        >
           <div className="p-4 bg-blue-50 text-blue-500 rounded-full"><PieChart className="w-8 h-8" /></div>
           <div>
             <h3 className="font-bold text-gray-900">Portfolio Analytics</h3>
             <p className="text-sm text-gray-500 mt-1">Loan distribution across shops.</p>
           </div>
           <button className="mt-2 w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
             <Download className="w-4 h-4"/> Download CSV
           </button>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="neo-card p-6 flex flex-col items-center text-center gap-4"
        >
           <div className="p-4 bg-green-50 text-green-500 rounded-full"><TrendingUp className="w-8 h-8" /></div>
           <div>
             <h3 className="font-bold text-gray-900">EMI Collections</h3>
             <p className="text-sm text-gray-500 mt-1">Monthly recurring revenue report.</p>
           </div>
           <button className="mt-2 w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
             <Download className="w-4 h-4"/> Download Excel
           </button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="neo-card p-6 flex flex-col items-center text-center gap-4"
        >
           <div className="p-4 bg-red-50 text-red-500 rounded-full"><AlertTriangle className="w-8 h-8" /></div>
           <div>
             <h3 className="font-bold text-gray-900">Default Risk Log</h3>
             <p className="text-sm text-gray-500 mt-1">List of locked or at-risk devices.</p>
           </div>
           <button className="mt-2 w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
             <Download className="w-4 h-4"/> Download PDF
           </button>
        </motion.div>
      </div>
    </div>
  );
}

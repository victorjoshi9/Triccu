'use client';

import React, { useState } from 'react';
import { Play, Code, CheckCircle2, AlertCircle, Database, Smartphone } from 'lucide-react';
import { motion } from 'motion/react';

export default function ApiTesterPage() {
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('wallet');

  const testWalletApi = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/v1/wallet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'CREDIT',
          targetId: 'SIMULATED-SHOP-8492',
          amount: 5000,
          type: 'SHOP'
        })
      });
      const data = await res.json();
      setResponse({ endpoint: '/api/v1/wallet', status: res.status, data });
    } catch (err: any) {
      setResponse({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  const testMarketingApi = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/v1/marketing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetApp: 'ALL',
          type: 'APP_UPDATE_BANNER',
          payload: {
            title: 'Critical Security Update v2.4.1',
            isForced: true,
            actionUrl: 'https://play.google.com/store/apps/details?id=com.triccu.finance'
          }
        })
      });
      const data = await res.json();
      setResponse({ endpoint: '/api/v1/marketing', status: res.status, data });
    } catch (err: any) {
      setResponse({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Internal API Tester</h1>
          <p className="text-gray-500 font-medium">Test custom internal routing for the 3 Triccu Apps (Wallet, Marketing, Sync).</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="neo-card-light p-6">
             <div className="flex items-center gap-3 mb-4">
               <Database className="w-5 h-5 text-blue-500"/>
               <h3 className="font-bold text-lg text-gray-900">Wallet Operations API</h3>
             </div>
             <p className="text-xs text-gray-500 font-mono mb-4 bg-gray-50 p-2 rounded-md">POST /api/v1/wallet</p>
             <p className="text-sm text-gray-600 mb-6">Process credits, debits, and withdrawals for Agent, Shop, and Customer wallets.</p>
             <button 
               onClick={testWalletApi}
               disabled={loading}
               className="w-full py-3 bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold rounded-xl flex justify-center items-center gap-2 transition-colors"
             >
               {loading && activeTab === 'wallet' ? 'Running...' : <><Play className="w-4 h-4"/> Run Test: Credit Shop ₹5,000</>}
             </button>
          </div>

          <div className="neo-card-light p-6">
             <div className="flex items-center gap-3 mb-4">
               <Smartphone className="w-5 h-5 text-emerald-500"/>
               <h3 className="font-bold text-lg text-gray-900">App Marketing & Updates API</h3>
             </div>
             <p className="text-xs text-gray-500 font-mono mb-4 bg-gray-50 p-2 rounded-md">POST /api/v1/marketing</p>
             <p className="text-sm text-gray-600 mb-6">Push global update banners or Refer & Earn campaigns to the 3 client apps instantly.</p>
             <button 
               onClick={testMarketingApi}
               disabled={loading}
               className="w-full py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 font-bold rounded-xl flex justify-center items-center gap-2 transition-colors"
             >
               {loading && activeTab === 'marketing' ? 'Running...' : <><Play className="w-4 h-4"/> Run Test: Push Forced Update Banner</>}
             </button>
          </div>
        </div>

        <div className="neo-card p-0 bg-[#0d1117] overflow-hidden flex flex-col h-[500px]">
          <div className="bg-[#161b22] px-4 py-3 border-b border-[#30363d] flex items-center gap-2">
             <Code className="w-4 h-4 text-gray-400" />
             <span className="text-xs font-mono text-gray-400 font-bold tracking-widest uppercase">API Console Output</span>
          </div>
          <div className="p-6 overflow-auto flex-1 font-mono text-sm">
             {response ? (
               <motion.pre 
                 initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                 className={`whitespace-pre-wrap ${response.status === 200 ? 'text-green-400' : 'text-red-400'}`}
               >
                 {JSON.stringify(response, null, 2)}
               </motion.pre>
             ) : (
               <div className="text-gray-600 h-full flex items-center justify-center italic">Awaiting API Execution...</div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}

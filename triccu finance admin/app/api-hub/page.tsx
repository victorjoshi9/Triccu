'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Server, Key, Link2, PlusCircle, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function ApiHubPage() {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState('');

  const generateWebhook = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setToast('Razorpay Smart Collect Webhook Generated & Synced!');
      setTimeout(() => setToast(''), 3000);
    }, 1000);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">API Hub & Integrations</h1>
          <p className="text-gray-500 font-medium">Manage Razorpay Smart Collect and MDM Webhooks globally.</p>
        </div>
        <button 
          onClick={generateWebhook}
          disabled={loading}
          className="px-6 py-3 bg-[var(--color-triccu-red)] hover:bg-red-700 text-white font-bold rounded-xl shadow-md transition-colors flex items-center gap-2"
        >
          {loading ? 'Syncing...' : <><PlusCircle className="w-5 h-5"/> Generate Razorpay Webhook</>}
        </button>
      </header>

      {toast && (
         <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="bg-green-50 text-green-700 p-4 rounded-xl border border-green-200 flex items-center gap-3 font-bold mb-6">
            <CheckCircle2 className="w-5 h-5" /> {toast}
         </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="neo-card-light p-8">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
               <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl"><Server className="w-8 h-8" /></div>
               <div>
                  <h3 className="text-xl font-bold text-gray-900">Razorpay Smart Collect</h3>
                  <p className="text-sm text-gray-500">Auto-generate virtual accounts for Agents & Customers.</p>
               </div>
            </div>
            <div className="space-y-4">
               <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Primary Webhook URL</label>
                  <div className="flex gap-2">
                     <input type="text" className="neo-input w-full font-mono text-sm bg-gray-50" value="https://admin.triccu.com/api/payment/smart-collect" readOnly />
                     <button className="px-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50"><Link2 className="w-4 h-4 text-gray-500"/></button>
                  </div>
               </div>
               <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Webhook Secret</label>
                  <input type="password" className="neo-input w-full font-mono text-sm bg-gray-50" value="************************" readOnly />
               </div>
               <div className="pt-4 flex items-center gap-2 text-sm font-bold text-green-600 bg-green-50 w-fit px-3 py-1.5 rounded-lg">
                  <CheckCircle2 className="w-4 h-4" /> Actively listening for inbound payments
               </div>
            </div>
         </div>

         <div className="neo-card-light p-8">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
               <div className="p-4 bg-red-50 text-red-600 rounded-2xl"><ShieldAlert className="w-8 h-8" /></div>
               <div>
                  <h3 className="text-xl font-bold text-gray-900">MDM Device Lock API</h3>
                  <p className="text-sm text-gray-500">Samsung Knox / Google EMM control plane.</p>
               </div>
            </div>
            <div className="space-y-4">
               <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">OEM Endpoint</label>
                  <div className="flex gap-2">
                     <input type="text" className="neo-input w-full font-mono text-sm bg-gray-50" value="https://admin.triccu.com/api/action/lock" readOnly />
                     <button className="px-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50"><Link2 className="w-4 h-4 text-gray-500"/></button>
                  </div>
               </div>
               <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Service Account Key</label>
                  <input type="password" className="neo-input w-full font-mono text-sm bg-gray-50" value="************************" readOnly />
               </div>
               <div className="pt-4 flex items-center gap-2 text-sm font-bold text-orange-600 bg-orange-50 w-fit px-3 py-1.5 rounded-lg">
                  <ShieldAlert className="w-4 h-4" /> Ready for MDM push
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

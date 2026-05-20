'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Package, Plus, Search, ChevronRight, CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react';
import Link from 'next/link';

interface Product {
  name: string;
  sku: string;
  stock: number;
  financed: number;
  price: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

const STOCK: Product[] = [
  { name: 'iPhone 15 Pro', sku: 'SKU-AP-15PRO', stock: 12, financed: 84, price: '₹1,12,000', status: 'In Stock' },
  { name: 'Samsung S24 Ultra', sku: 'SKU-SS-S24UL', stock: 8, financed: 52, price: '₹85,000', status: 'In Stock' },
  { name: 'Vivo V30 Pro', sku: 'SKU-VV-V30PRO', stock: 2, financed: 31, price: '₹42,500', status: 'Low Stock' },
  { name: 'iPad Air 5th Gen', sku: 'SKU-AP-IPADAIR', stock: 6, financed: 14, price: '₹54,000', status: 'In Stock' },
  { name: 'OnePlus 12', sku: 'SKU-OP-12', stock: 0, financed: 45, price: '₹48,000', status: 'Out of Stock' }
];

export default function ShopInventoryPage() {
  const [stockList, setStockList] = useState<Product[]>(STOCK);
  const [showAddForm, setShowAddForm] = useState(false);
  const [search, setSearch] = useState('');

  const [newName, setNewName] = useState('');
  const [newStock, setNewStock] = useState('10');
  const [newPrice, setNewPrice] = useState('45,000');

  const filteredStock = stockList.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.sku.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddNewProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;

    const newProd: Product = {
      name: newName,
      sku: `SKU-CUST-${Math.floor(1000 + Math.random() * 9000)}`,
      stock: parseInt(newStock) || 0,
      financed: 0,
      price: `₹${parseInt(newPrice).toLocaleString()}`,
      status: parseInt(newStock) > 3 ? 'In Stock' : parseInt(newStock) > 0 ? 'Low Stock' : 'Out of Stock'
    };

    setStockList([newProd, ...stockList]);
    setShowAddForm(false);
    setNewName('');
    setNewStock('10');
    setNewPrice('45,000');
  };

  return (
    <div className="pt-12 px-6 pb-24 space-y-6 text-white min-h-screen bg-[#070b19]">
      <div className="flex justify-between items-center py-2">
        <Link href="/shop" className="p-2.5 rounded-2xl glass-card border-white/5 text-white/60 active:scale-95 transition-all">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h2 className="text-lg font-black font-outfit uppercase tracking-tight text-white">Store Inventory</h2>
        <button 
          onClick={() => setShowAddForm(true)}
          className="p-2.5 rounded-2xl bg-white text-gray-950 font-bold active:scale-95 transition-all"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Add New Stock Overlay Dialog */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              className="glass-card w-full max-w-sm p-6 border-white/10 shadow-2xl bg-[#070b19]/95 text-white"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-black uppercase tracking-wider">Add Financed Model</h3>
                <button onClick={() => setShowAddForm(false)} className="text-white/40 hover:text-white uppercase text-xs font-bold p-1">Close</button>
              </div>

              <form onSubmit={handleAddNewProduct} className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold uppercase text-white/30 ml-1">Device Model Name</span>
                  <input 
                    type="text" 
                    required
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    placeholder="e.g. iPhone 15 Pro Max"
                    className="w-full bg-[#1A1A2E]/50 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-white/35"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold uppercase text-white/30 ml-1">Initial Units</span>
                    <input 
                      type="number" 
                      required
                      value={newStock}
                      onChange={e => setNewStock(e.target.value)}
                      className="w-full bg-[#1A1A2E]/50 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold uppercase text-white/30 ml-1">Base Price (Rs)</span>
                    <input 
                      type="text" 
                      required
                      value={newPrice}
                      onChange={e => setNewPrice(e.target.value)}
                      className="w-full bg-[#1A1A2E]/50 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-3.5 bg-white font-bold rounded-xl text-gray-950 uppercase text-xs tracking-widest hover:bg-white/90 transition-colors mt-4"
                >
                  Confirm Model SKU
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* KPI statistics row for stock items */}
      <div className="grid grid-cols-3 gap-3">
        <div className="glass-card p-3.5 text-center border-white/5 bg-white/5 rounded-xl">
          <p className="text-[8px] font-bold text-white/30 uppercase tracking-wider">Total Financed</p>
          <p className="text-base font-black text-white mt-1">212 Units</p>
        </div>
        <div className="glass-card p-3.5 text-center border-white/5 bg-white/5 rounded-xl">
          <p className="text-[8px] font-bold text-white/30 uppercase tracking-wider">Active Inventory</p>
          <p className="text-base font-black text-white mt-1">28 Units</p>
        </div>
        <div className="glass-card p-3.5 text-center border-white/5 bg-white/5 rounded-xl">
          <p className="text-[8px] font-bold text-white/30 uppercase tracking-wider">Low Stock SKUs</p>
          <p className="text-base font-black text-red-400 mt-1">1 Model</p>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <span className="absolute inset-y-0 left-4 flex items-center pr-3 pointer-events-none">
          <Search className="h-4 w-4 text-white/40" />
        </span>
        <input 
          type="text" 
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search models or SKU indexes..." 
          className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-xs text-white placeholder-white/30 focus:border-white/20 focus:outline-none transition-colors"
        />
      </div>

      {/* Structured Stock Ledger list */}
      <div className="space-y-4">
        {filteredStock.map((prod, idx) => (
          <div key={idx} className="glass-card p-4 border-white/5 flex items-center justify-between hover:border-white/15 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                <Package className="w-5 h-5 text-white/50" />
              </div>
              <div>
                <h4 className="font-bold text-white text-xs sm:text-sm">{prod.name}</h4>
                <p className="text-[10px] text-white/40 font-mono mt-0.5">{prod.sku}</p>
                <div className="flex gap-2.5 pt-1">
                  <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full border ${
                    prod.status === 'In Stock' ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5' :
                    prod.status === 'Low Stock' ? 'text-yellow-405 border-yellow-550/20 bg-yellow-550/5' : 'text-red-400 border-red-500/20 bg-red-500/5'
                  }`}>
                    {prod.status}
                  </span>
                  <span className="text-[8px] font-bold text-white/45 bg-white/5 px-2 py-0.5 rounded-full">
                    {prod.stock} Units Left
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs sm:text-sm font-black text-white">{prod.price}</span>
              <p className="text-[9px] text-emerald-450 mt-1 font-bold">{prod.financed} Financed</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

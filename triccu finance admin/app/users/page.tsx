'use client';

import React, { useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabase';
import { Loader2, Search, User, Mail, Phone, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const supabase = getSupabase();
        const { data, error } = await supabase
          .from('customers')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (data) setUsers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Users Management</h1>
          <p className="text-gray-500 font-medium">Manage and view all registered platform users.</p>
        </div>
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search users..." className="neo-input pl-10" />
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
                <th className="pb-4 font-semibold">User</th>
                <th className="pb-4 font-semibold">Contact</th>
                <th className="pb-4 font-semibold">Status</th>
                <th className="pb-4 font-semibold">Joined Date</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-500">No users found.</td>
                </tr>
              ) : (
                users.map((user, idx) => (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={user.id} 
                    className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{user.full_name || 'N/A'}</p>
                        <p className="text-xs text-gray-500">ID: {user.id.slice(0, 8)}</p>
                      </div>
                    </td>
                    <td className="py-4">
                      <p className="text-sm text-gray-700 flex items-center gap-2"><Phone className="w-3 h-3"/> {user.phone || 'N/A'}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-2"><Mail className="w-3 h-3"/> {user.email || 'N/A'}</p>
                    </td>
                    <td className="py-4">
                      <span className="px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-bold">Active</span>
                    </td>
                    <td className="py-4 text-sm text-gray-600">
                      {new Date(user.created_at).toLocaleDateString()}
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

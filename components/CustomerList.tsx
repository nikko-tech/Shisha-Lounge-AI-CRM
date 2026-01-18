
import React, { useState } from 'react';
import { Customer } from '../types';

interface Props {
  customers: Customer[];
  onSelect: (id: string) => void;
}

const CustomerList: React.FC<Props> = ({ customers, onSelect }) => {
  const [search, setSearch] = useState('');

  const filtered = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.id.toLowerCase().includes(search.toLowerCase()) ||
    c.nickname.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 space-y-4">
      <div className="relative group">
        <input 
          type="text"
          placeholder="Search by ID, Name, or Nickname..."
          className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 pl-12 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all shadow-inner"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors">🔍</span>
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            {search ? 'No matching customers found.' : 'No customers registered yet.'}
          </div>
        ) : (
          filtered.map(c => (
            <div 
              key={c.id} 
              onClick={() => onSelect(c.id)}
              className="bg-slate-800 p-4 rounded-2xl border border-slate-700 flex items-center gap-4 hover:border-indigo-500 hover:bg-slate-700/50 transition-all cursor-pointer group shadow-lg active:scale-[0.98]"
            >
              <div className="w-12 h-12 bg-indigo-600/20 rounded-2xl flex items-center justify-center font-black text-indigo-400 group-hover:scale-110 transition-transform">
                {c.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{c.id}</span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase">{c.visitCount} visits</span>
                </div>
                <h3 className="font-bold text-white text-lg truncate">{c.name}</h3>
                <p className="text-xs text-slate-400 truncate">{c.dislikes || 'No specific dislikes'}</p>
              </div>
              <span className="text-slate-600 group-hover:text-indigo-400 transition-colors">→</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CustomerList;

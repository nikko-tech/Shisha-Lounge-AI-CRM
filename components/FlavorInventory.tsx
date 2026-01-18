import React, { useState } from 'react';
import { Flavor, FlavorCategory } from '../types';

interface Props {
  flavors: Flavor[];
  onUpdateStock: (id: string, inStock: boolean) => void;
}

const FlavorInventory: React.FC<Props> = ({ flavors, onUpdateStock }) => {
  const [filter, setFilter] = useState<FlavorCategory | 'ALL'>('ALL');

  const filtered = filter === 'ALL' ? flavors : flavors.filter(f => f.category === filter);

  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-black">Stock Master</h2>
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          <FilterTab active={filter === 'ALL'} onClick={() => setFilter('ALL')} label="All" />
          {Object.values(FlavorCategory).map(cat => (
            <FilterTab 
              key={cat} 
              active={filter === cat} 
              onClick={() => setFilter(cat)} 
              label={cat} 
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {filtered.map(flavor => (
          <div 
            key={flavor.id}
            className={`p-4 rounded-2xl border transition-all flex justify-between items-center ${
              flavor.inStock 
                ? 'bg-slate-800 border-slate-700' 
                : 'bg-slate-900 border-red-900/30 opacity-60'
            }`}
          >
            <div>
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{flavor.brand}</div>
              <h3 className="font-bold text-lg">{flavor.name}</h3>
              <span className="text-[9px] bg-slate-700 px-2 py-0.5 rounded-full text-slate-300 font-bold uppercase">
                {flavor.category}
              </span>
            </div>
            <button
              onClick={() => onUpdateStock(flavor.id, !flavor.inStock)}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all shadow-lg active:scale-95 ${
                flavor.inStock 
                  ? 'bg-slate-700 text-slate-300 hover:bg-red-900/20 hover:text-red-400' 
                  : 'bg-green-600 text-white'
              }`}
            >
              {flavor.inStock ? 'Out of Stock' : 'Restock'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const FilterTab: React.FC<{ active: boolean; onClick: () => void; label: string }> = ({ active, onClick, label }) => (
  <button
    onClick={onClick}
    className={`px-4 py-1.5 rounded-full text-xs font-black whitespace-nowrap transition-all uppercase tracking-widest ${
      active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'bg-slate-800 text-slate-500 hover:text-slate-300'
    }`}
  >
    {label}
  </button>
);

export default FlavorInventory;

import React from 'react';
import { AppState } from '../types';

interface Props {
  state: AppState;
  onSelectCustomer: (id: string) => void;
}

const StaffDashboard: React.FC<Props> = ({ state, onSelectCustomer }) => {
  const recentVisits = state.history.slice(0, 5);

  return (
    <div className="p-4 space-y-6">
      <section className="grid grid-cols-2 gap-4">
        <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
          <span className="text-slate-400 text-sm font-medium">Total Customers</span>
          <div className="text-3xl font-bold text-white mt-1">{state.customers.length}</div>
        </div>
        <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
          <span className="text-slate-400 text-sm font-medium">Today's Visits</span>
          <div className="text-3xl font-bold text-indigo-400 mt-1">
            {state.history.filter(h => h.date === new Date().toISOString().split('T')[0]).length}
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold px-1">Recent Activity</h2>
        <div className="space-y-3">
          {recentVisits.length === 0 ? (
            <div className="text-center py-8 text-slate-500 bg-slate-800/50 rounded-2xl border border-dashed border-slate-700">
              No recent visits recorded.
            </div>
          ) : (
            recentVisits.map(visit => {
              const customer = state.customers.find(c => c.id === visit.customerId);
              return (
                <div 
                  key={visit.id} 
                  className="bg-slate-800 p-4 rounded-2xl border border-slate-700 flex items-center gap-4 hover:border-indigo-500/50 transition-colors cursor-pointer"
                  onClick={() => onSelectCustomer(visit.customerId)}
                >
                  <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center text-xl font-bold text-indigo-400">
                    {customer?.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-white truncate">{customer?.name}</h3>
                      <span className="text-xs text-slate-500">{visit.date}</span>
                    </div>
                    <p className="text-sm text-slate-400 truncate">{visit.mixContent}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={`text-[10px] ${i < visit.rating ? 'text-yellow-500' : 'text-slate-700'}`}>★</span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
};

export default StaffDashboard;

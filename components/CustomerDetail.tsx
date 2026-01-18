
import React, { useState, useEffect } from 'react';
import { Customer, VisitHistory, Flavor } from '../types';
import { getMixRecommendation } from '../services/geminiService';

interface Props {
  customer: Customer;
  history: VisitHistory[];
  flavors: Flavor[];
  onAddVisit: () => void;
  onBack: () => void;
}

const CustomerDetail: React.FC<Props> = ({ customer, history, flavors, onAddVisit, onBack }) => {
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchRecommendation = async () => {
    setLoading(true);
    try {
      const result = await getMixRecommendation(customer, history, flavors);
      setRecommendation(result || "Could not generate recommendation.");
    } catch (e) {
      console.error(e);
      setRecommendation("Error connecting to AI.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-6">
      <button onClick={onBack} className="text-slate-400 hover:text-white flex items-center gap-1 text-sm font-bold transition-colors">
        ← Back to List
      </button>

      <div className="bg-gradient-to-br from-indigo-600 to-indigo-900 p-6 rounded-3xl shadow-xl">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="bg-black/30 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">
              {customer.id}
            </span>
            <h1 className="text-2xl font-black mt-2">{customer.name}</h1>
            <p className="text-indigo-200 text-sm font-medium">@{customer.nickname || 'No Nickname'}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl text-center">
            <div className="text-xs text-indigo-200 font-bold uppercase tracking-widest leading-none">Visits</div>
            <div className="text-2xl font-black text-white">{customer.visitCount}</div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mt-6">
          <div className="bg-black/20 p-3 rounded-xl border border-white/5">
            <div className="text-[10px] text-indigo-300 font-bold uppercase mb-1">Last Visit</div>
            <div className="text-sm font-bold text-white">{customer.lastVisitDate}</div>
          </div>
          <div className="bg-black/20 p-3 rounded-xl border border-white/5">
            <div className="text-[10px] text-indigo-300 font-bold uppercase mb-1">SNS</div>
            <div className="text-sm font-bold text-white truncate">{customer.snsAccount || '-'}</div>
          </div>
        </div>
      </div>

      {/* Dislikes / Warnings */}
      {(customer.dislikes || customer.notes) && (
        <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-red-500">⚠️</span>
            <h3 className="text-red-500 font-black uppercase text-xs tracking-widest">Operation Warnings</h3>
          </div>
          {customer.dislikes && <p className="text-sm text-slate-300 mb-2"><span className="font-bold text-red-400/80">Dislikes:</span> {customer.dislikes}</p>}
          {customer.notes && <p className="text-sm text-slate-300"><span className="font-bold text-red-400/80">Notes:</span> {customer.notes}</p>}
        </div>
      )}

      {/* AI Sommelier Recommendation */}
      <section className="bg-slate-800 rounded-3xl border border-slate-700 overflow-hidden shadow-lg">
        <div className="p-4 bg-slate-700/50 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-xl">🤖</span>
            <h2 className="font-bold text-white uppercase tracking-wider text-sm">AI Sommelier Proposal</h2>
          </div>
          <button 
            onClick={fetchRecommendation} 
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-600 text-[10px] font-black text-white px-3 py-1.5 rounded-full transition-all uppercase tracking-widest"
          >
            {loading ? 'Analyzing...' : 'Refresh Recommendation'}
          </button>
        </div>
        <div className="p-4">
          {recommendation ? (
            <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap prose prose-invert">
              {recommendation}
            </div>
          ) : (
            <div className="text-center py-6 text-slate-500 italic text-sm">
              Click "Refresh Recommendation" to see AI suggestions based on stock and history.
            </div>
          )}
        </div>
      </section>

      {/* Visit History List */}
      <section className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <h2 className="text-lg font-bold">Visit History</h2>
          <button 
            onClick={onAddVisit}
            className="text-indigo-400 font-bold text-xs uppercase tracking-widest hover:text-indigo-300 transition-colors"
          >
            + Record Today
          </button>
        </div>
        <div className="space-y-3">
          {history.length === 0 ? (
            <div className="text-center py-8 text-slate-500 bg-slate-800/50 rounded-2xl border border-dashed border-slate-700">
              No previous history.
            </div>
          ) : (
            history.map(visit => (
              <div key={visit.id} className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-xs text-slate-500 font-medium">{visit.date}</div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={`text-[10px] ${i < visit.rating ? 'text-yellow-500' : 'text-slate-700'}`}>★</span>
                    ))}
                  </div>
                </div>
                <div className="text-indigo-400 font-bold text-sm mb-1">{visit.mixContent}</div>
                <div className="text-xs text-slate-400 flex flex-col gap-1">
                  <p><span className="text-slate-500 font-bold uppercase text-[9px]">Staff:</span> {visit.staffName}</p>
                  <p><span className="text-slate-500 font-bold uppercase text-[9px]">Setting:</span> {visit.setting}</p>
                  {visit.feedback && <p className="italic bg-slate-900/50 p-2 rounded-lg border border-slate-700/50 mt-1">"{visit.feedback}"</p>}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default CustomerDetail;

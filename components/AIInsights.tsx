import React, { useState } from 'react';
import { Customer } from '../types';
import { getChurnAnalysis } from '../services/geminiService';

interface Props {
  customers: Customer[];
}

const AIInsights: React.FC<Props> = ({ customers }) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const runAnalysis = async () => {
    setLoading(true);
    try {
      const res = await getChurnAnalysis(customers);
      setAnalysis(res || "No insights generated.");
    } catch (e) {
      console.error(e);
      setAnalysis("Failed to connect to AI for analysis.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-6">
      <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 space-y-4">
        <div className="w-16 h-16 bg-indigo-600/20 rounded-2xl flex items-center justify-center text-3xl">
          📉
        </div>
        <div>
          <h2 className="text-xl font-black">Churn Analysis</h2>
          <p className="text-sm text-slate-400">Identifies regular customers who haven't visited in over 60 days and suggests re-engagement strategies.</p>
        </div>
        <button 
          onClick={runAnalysis}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 py-3 rounded-xl font-bold transition-all active:scale-95"
        >
          {loading ? 'Analyzing Data...' : 'Run Business Analysis'}
        </button>
      </div>

      {analysis && (
        <div className="bg-slate-800 p-6 rounded-3xl border border-indigo-500/30">
          <h3 className="text-indigo-400 font-black uppercase text-xs tracking-widest mb-4">Analysis Result</h3>
          <div className="prose prose-invert prose-sm whitespace-pre-wrap text-slate-300 leading-relaxed">
            {analysis}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIInsights;

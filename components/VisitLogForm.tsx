
import React, { useState } from 'react';
import { Customer } from '../types';

interface Props {
  customer: Customer;
  onSubmit: (data: {
    customerId: string;
    date: string;
    staffName: string;
    mixContent: string;
    setting: string;
    rating: number;
    feedback: string;
  }) => void;
  onCancel: () => void;
}

const VisitLogForm: React.FC<Props> = ({ customer, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    staffName: '',
    mixContent: '',
    setting: '',
    rating: 5,
    feedback: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      customerId: customer.id,
      date: new Date().toISOString().split('T')[0],
      ...formData
    });
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black">Record Visit: {customer.name}</h2>
        <button onClick={onCancel} className="text-slate-500 font-bold text-sm">Cancel</button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Staff Name</label>
          <input 
            required
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
            value={formData.staffName}
            onChange={e => setFormData(prev => ({ ...prev, staffName: e.target.value }))}
            placeholder="Staff member responsible"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Provided Mix Content</label>
          <input 
            required
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
            value={formData.mixContent}
            onChange={e => setFormData(prev => ({ ...prev, mixContent: e.target.value }))}
            placeholder="e.g. DOZAJ Lemon 5, Al Fakher Mint 3"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Setting Details</label>
          <input 
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
            value={formData.setting}
            onChange={e => setFormData(prev => ({ ...prev, setting: e.target.value }))}
            placeholder="e.g. Turkish Lid, 3-2 coal rotation"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Satisfaction Rating (1-5)</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  formData.rating >= star ? 'bg-yellow-500/20 text-yellow-500' : 'bg-slate-800 text-slate-600'
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Feedback / Notes</label>
          <textarea 
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all h-24"
            value={formData.feedback}
            onChange={e => setFormData(prev => ({ ...prev, feedback: e.target.value }))}
            placeholder="Next time requested something lighter, etc."
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-600/20 transition-all active:scale-95"
        >
          Save Visit Log
        </button>
      </form>
    </div>
  );
};

export default VisitLogForm;

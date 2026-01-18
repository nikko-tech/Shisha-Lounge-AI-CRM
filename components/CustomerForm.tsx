import React, { useState } from 'react';
import { Customer } from '../types';

interface Props {
  onSubmit: (data: { name: string, nickname: string, snsAccount: string, birthday: string, dislikes: string, notes: string }) => Customer;
}

const CustomerForm: React.FC<Props> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    nickname: '',
    snsAccount: '',
    birthday: '',
    dislikes: '',
    notes: ''
  });
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCustomer = onSubmit({ ...formData });
    setSubmittedId(newCustomer.id);
  };

  if (submittedId) {
    return (
      <div className="p-8 text-center space-y-6">
        <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center text-4xl mx-auto">
          ✓
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Registration Complete!</h2>
          <p className="text-slate-400">Thank you for joining our lounge.</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 inline-block">
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-2">Your Member ID</p>
          <div className="text-4xl font-mono font-black text-indigo-400">{submittedId}</div>
          <div className="mt-4 p-4 bg-white rounded-xl">
            {/* Simulated QR Code */}
            <div className="w-32 h-32 bg-slate-900 mx-auto flex items-center justify-center">
              <span className="text-white text-[10px] text-center px-2">QR Code for<br/>{submittedId}</span>
            </div>
          </div>
        </div>
        <p className="text-sm text-slate-500">Please show this screen to our staff.</p>
        <button 
          onClick={() => { setSubmittedId(null); setFormData({ name: '', nickname: '', snsAccount: '', birthday: '', dislikes: '', notes: '' }); }}
          className="text-indigo-400 font-bold hover:underline"
        >
          Register another person
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-black italic tracking-tighter mb-2">WELCOME</h1>
        <p className="text-slate-400">Please register your information for the best smoking experience.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Name (Full Name)</label>
          <input 
            required
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
            value={formData.name}
            onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="John Doe"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Nickname</label>
          <input 
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
            value={formData.nickname}
            onChange={e => setFormData(prev => ({ ...prev, nickname: e.target.value }))}
            placeholder="Johnny"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-500">SNS Account (Instagram/Twitter)</label>
          <input 
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
            value={formData.snsAccount}
            onChange={e => setFormData(prev => ({ ...prev, snsAccount: e.target.value }))}
            placeholder="@shisha_lover"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Birthday</label>
            <input 
              type="date"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
              value={formData.birthday}
              onChange={e => setFormData(prev => ({ ...prev, birthday: e.target.value }))}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Dislikes / NGs (Strong mint, etc.)</label>
          <textarea 
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all h-24"
            value={formData.dislikes}
            onChange={e => setFormData(prev => ({ ...prev, dislikes: e.target.value }))}
            placeholder="Please let us know if you have allergies or specific dislikes."
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-600/20 transition-all active:scale-95"
        >
          Register Membership
        </button>
      </form>
    </div>
  );
};

export default CustomerForm;

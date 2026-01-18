import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  role: 'customer' | 'staff';
  setRole: (role: 'customer' | 'staff') => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, role, setRole }) => {
  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-slate-900 shadow-2xl overflow-hidden">
      {/* Header */}
      <header className="p-4 bg-slate-800 border-b border-slate-700 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-xl">💨</span>
          </div>
          <h1 className="font-bold text-lg tracking-tight">Shisha AI CRM</h1>
        </div>
        <button 
          onClick={() => setRole(role === 'staff' ? 'customer' : 'staff')}
          className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors ${
            role === 'staff' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300'
          }`}
        >
          {role === 'staff' ? 'Staff Mode' : 'Customer Mode'}
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24">
        {children}
      </main>

      {/* Navigation */}
      {role === 'staff' && (
        <nav className="fixed bottom-0 w-full max-w-md bg-slate-800/90 backdrop-blur-md border-t border-slate-700 p-2 flex justify-around items-center z-50">
          <NavButton active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon="📊" label="Dashboard" />
          <NavButton active={activeTab === 'customers'} onClick={() => setActiveTab('customers')} icon="👥" label="Customers" />
          <NavButton active={activeTab === 'flavors'} onClick={() => setActiveTab('flavors')} icon="🍯" label="Flavors" />
          <NavButton active={activeTab === 'insights'} onClick={() => setActiveTab('insights')} icon="🧠" label="AI" />
        </nav>
      )}
    </div>
  );
};

const NavButton = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: string, label: string }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
      active ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'
    }`}
  >
    <span className="text-xl">{icon}</span>
    <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
  </button>
);

export default Layout;

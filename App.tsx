
import React, { useState } from 'react';
import Layout from './components/Layout';
import StaffDashboard from './components/StaffDashboard';
import CustomerForm from './components/CustomerForm';
import CustomerList from './components/CustomerList';
import CustomerDetail from './components/CustomerDetail';
import VisitLogForm from './components/VisitLogForm';
import FlavorInventory from './components/FlavorInventory';
import AIInsights from './components/AIInsights';
import { useStore } from './hooks/useStore';

type Tab = 'dashboard' | 'customers' | 'flavors' | 'insights' | 'customerDetail' | 'addVisit';

const App: React.FC = () => {
  const { state, addCustomer, addVisit, updateFlavorStock } = useStore();
  const [role, setRole] = useState<'customer' | 'staff'>('customer');
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

  const handleSelectCustomer = (id: string) => {
    setSelectedCustomerId(id);
    setActiveTab('customerDetail');
  };

  const currentCustomer = state.customers.find(c => c.id === selectedCustomerId);
  const customerHistory = state.history.filter(h => h.customerId === selectedCustomerId);

  const renderContent = () => {
    if (role === 'customer') {
      return (
        <CustomerForm 
          onSubmit={addCustomer} 
          onSuccess={(id) => {}} 
        />
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return <StaffDashboard state={state} onSelectCustomer={handleSelectCustomer} />;
      case 'customers':
        return <CustomerList customers={state.customers} onSelect={handleSelectCustomer} />;
      case 'flavors':
        return <FlavorInventory flavors={state.flavors} onUpdateStock={updateFlavorStock} />;
      case 'insights':
        return <AIInsights customers={state.customers} />;
      case 'customerDetail':
        return currentCustomer ? (
          <CustomerDetail 
            customer={currentCustomer} 
            history={customerHistory} 
            flavors={state.flavors}
            onAddVisit={() => setActiveTab('addVisit')}
            onBack={() => setActiveTab('customers')}
          />
        ) : null;
      case 'addVisit':
        return currentCustomer ? (
          <VisitLogForm 
            customer={currentCustomer} 
            onSubmit={(data) => {
              addVisit(data);
              setActiveTab('customerDetail');
            }} 
            onCancel={() => setActiveTab('customerDetail')}
          />
        ) : null;
      default:
        return <StaffDashboard state={state} onSelectCustomer={handleSelectCustomer} />;
    }
  };

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      role={role} 
      setRole={(newRole) => {
        setRole(newRole);
        setActiveTab('dashboard');
      }}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;

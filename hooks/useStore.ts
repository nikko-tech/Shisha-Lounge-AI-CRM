import { useState, useEffect, useCallback } from 'react';
import { AppState, Customer, VisitHistory } from '../types';
import { INITIAL_FLAVORS, APP_STORAGE_KEY } from '../constants';

export const useStore = () => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem(APP_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to load store", e);
      }
    }
    return {
      customers: [],
      history: [],
      flavors: INITIAL_FLAVORS
    };
  });

  useEffect(() => {
    localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const addCustomer = useCallback((customer: Omit<Customer, 'id' | 'visitCount' | 'lastVisitDate'>) => {
    let newCustomer: Customer | null = null;
    setState(prev => {
      newCustomer = {
        ...customer,
        id: `S${String(prev.customers.length + 1).padStart(4, '0')}`,
        visitCount: 0,
        lastVisitDate: '-'
      };
      return { ...prev, customers: [...prev.customers, newCustomer] };
    });
    return newCustomer as Customer;
  }, []);

  const addVisit = useCallback((visit: Omit<VisitHistory, 'id'>) => {
    const newVisit: VisitHistory = {
      ...visit,
      id: crypto.randomUUID(),
    };
    
    setState(prev => {
      const updatedCustomers = prev.customers.map(c => {
        if (c.id === visit.customerId) {
          return {
            ...c,
            visitCount: c.visitCount + 1,
            lastVisitDate: visit.date
          };
        }
        return c;
      });

      return {
        ...prev,
        history: [newVisit, ...prev.history],
        customers: updatedCustomers
      };
    });
  }, []);

  const updateFlavorStock = useCallback((id: string, inStock: boolean) => {
    setState(prev => ({
      ...prev,
      flavors: prev.flavors.map(f => f.id === id ? { ...f, inStock } : f)
    }));
  }, []);

  return { state, addCustomer, addVisit, updateFlavorStock };
};


import { FlavorCategory, Flavor } from './types';

export const INITIAL_FLAVORS: Flavor[] = [
  { id: 'f1', brand: 'DOZAJ', name: 'Lemon', category: FlavorCategory.FRUIT, inStock: true },
  { id: 'f2', brand: 'DOZAJ', name: 'Pan Rasna', category: FlavorCategory.SPICE, inStock: true },
  { id: 'f3', brand: 'Al Fakher', name: 'Mint', category: FlavorCategory.MINT, inStock: true },
  { id: 'f4', brand: 'Trifecta', name: 'Cane Mint', category: FlavorCategory.MINT, inStock: true },
  { id: 'f5', brand: 'Azure', name: 'Lemon Muffin', category: FlavorCategory.DESSERT, inStock: true },
  { id: 'f6', brand: 'Social Smoke', name: 'Pistachio Breeze', category: FlavorCategory.DESSERT, inStock: true },
  { id: 'f7', brand: 'Trogue', name: 'Earl Grey', category: FlavorCategory.DRINK, inStock: true },
  { id: 'f8', brand: 'Debaj', name: 'Cardamom', category: FlavorCategory.SPICE, inStock: true },
];

export const APP_STORAGE_KEY = 'shisha_crm_data_v1';

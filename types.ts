export enum FlavorCategory {
  FRUIT = 'Fruit',
  SPICE = 'Spice',
  DESSERT = 'Dessert',
  DRINK = 'Drink',
  FLOWER = 'Flower',
  MINT = 'Mint'
}

export interface Flavor {
  id: string;
  brand: string;
  name: string;
  category: FlavorCategory;
  inStock: boolean;
}

export interface Customer {
  id: string;
  name: string;
  nickname: string;
  snsAccount: string;
  birthday: string;
  dislikes: string;
  visitCount: number;
  lastVisitDate: string;
  notes: string; // Internal staff notes (e.g. heat sensitivity)
}

export interface VisitHistory {
  id: string;
  customerId: string;
  date: string;
  staffName: string;
  mixContent: string; // e.g. "Lemon 5, Mint 3, Vanilla 2"
  setting: string; // e.g. "Turkish Lid, 3 coals"
  rating: number; // 1-5
  feedback: string;
}

export interface AppState {
  customers: Customer[];
  history: VisitHistory[];
  flavors: Flavor[];
}

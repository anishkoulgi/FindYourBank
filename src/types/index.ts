export interface Bank {
  ifsc: string;
  bank_id: number;
  branch: string;
  address: string;
  city: string;
  district: string;
  state: string;
  bank_name: string;
  isFavorite: boolean;
}

export interface FilterState {
  city: string | null;
  filter: string | null;
}

export interface SelectType {
  label: string;
  value: string | number;
}

export interface DataContext {
  data: Bank[] | null;
  filteredData: Bank[] | null;
  favoriteBanks: Bank[] | null;
  filterBanks: null | ((filters: FilterState, query: string) => void);
  setBankData: ((banks: Bank[]) => void) | null;
  toggleFavorite: ((bank: Bank) => void) | null;
}

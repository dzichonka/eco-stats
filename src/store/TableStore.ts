import { create } from 'zustand';
import type { IDisplayedData } from '@/types/types';
import { devtools } from 'zustand/middleware';

export interface TableStore {
  displayedData: IDisplayedData[];
  setData: (data: IDisplayedData[]) => void;
  sortByPopulation: (direction: 'asc' | 'desc') => void;
  sortByCountry: (direction: 'asc' | 'desc') => void;
}

export const useTableStore = create<TableStore>()(
  devtools(
    (set, get) => ({
      displayedData: [],
      setData: (data) => set({ displayedData: data }),

      sortByPopulation: (direction) => {
        const sorted = [...get().displayedData].sort((a, b) => {
          const popA = a.population ?? 0;
          const popB = b.population ?? 0;
          return direction === 'asc' ? popA - popB : popB - popA;
        });
        set({ displayedData: sorted });
      },

      sortByCountry: (direction) => {
        const sorted = [...get().displayedData].sort((a, b) => {
          return direction === 'asc'
            ? a.country.localeCompare(b.country)
            : b.country.localeCompare(a.country);
        });
        set({ displayedData: sorted });
      },
    }),
    { name: 'table-store' }
  )
);

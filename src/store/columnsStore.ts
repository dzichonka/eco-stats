import type { ExtraColumn } from '@/types/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ColumnsState {
  selectedColumns: ExtraColumn[];
  columnLabels: Record<string, string>;
  toggleColumn: (col: ExtraColumn) => void;
  setColumns: (cols: ExtraColumn[]) => void;
  resetColumns: () => void;
}

export const useColumnsStore = create<ColumnsState>()(
  persist(
    (set) => ({
      selectedColumns: [],
      columnLabels: {
        gdp: 'GDP',
        methane: 'Methane',
        nitrous_oxide: 'Nitrous Oxide',
        total_ghg: 'Total GHG',
        cement_co2: 'Cement CO₂',
        oil_co2: 'Oil CO₂',
      },
      toggleColumn: (col) =>
        set((state) => ({
          selectedColumns: state.selectedColumns.includes(col)
            ? state.selectedColumns.filter((c) => c !== col)
            : [...state.selectedColumns, col],
        })),
      setColumns: (cols) => set({ selectedColumns: cols }),
      resetColumns: () => set({ selectedColumns: [] }),
    }),
    { name: 'columns' }
  )
);

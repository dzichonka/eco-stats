import type { CountryData } from '@/types/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type EmissionsState = {
  data: CountryData[];
  loading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
};

export const useEmissionsStore = create<EmissionsState>()(
  devtools(
    (set) => ({
      data: [],
      loading: false,
      error: null,
      fetchData: async () => {
        set({ loading: true });
        try {
          const res = await fetch('/data/data.json');
          const json = await res.json();
          set({ data: json, loading: false });
        } catch (err) {
          set({ error: `Error: ${err}`, loading: false });
        }
      },
    }),
    { name: 'emissions' }
  )
);

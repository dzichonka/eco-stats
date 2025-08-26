import type { EmissionsJson } from '@/types/types';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type EmissionsState = {
  data: EmissionsJson | null;
  fetchData: () => Promise<EmissionsJson>;
};

export const useEmissionsStore = create<EmissionsState>()(
  devtools(
    (set, get) => ({
      data: null,
      fetchData: async () => {
        if (get().data) return get().data;

        try {
          const res = await fetch('/data/data.json');
          if (!res.ok) {
            throw new Error(`Failed to fetch: ${res.status}`);
          }
          const json: EmissionsJson = await res.json();
          set({ data: json });
          return json;
        } catch (err) {
          console.error(err);
        }
      },
    }),
    { name: 'emissions' }
  )
);

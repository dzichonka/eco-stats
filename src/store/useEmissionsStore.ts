import type { EmissionsJson } from '@/types/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface EmissionsState {
  data: EmissionsJson | null;
  setData: (data: EmissionsJson) => void;
}

export const useEmissionsStore = create<EmissionsState>()(
  devtools(
    (set) => ({
      data: null,
      setData: (data) => set({ data }),
    }),
    { name: 'emissions' }
  )
);

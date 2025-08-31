import type { EmissionsJson } from '@/types/types';

let emissionsPromise: Promise<EmissionsJson> | null = null;

export function getEmissions(): Promise<EmissionsJson> {
  if (!emissionsPromise) {
    emissionsPromise = fetch('/data/data.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch emissions data');
        return res.json();
      })
      .then((json) => json as EmissionsJson);
  }
  return emissionsPromise;
}

import type { ICountryData, SortDirection } from '@/types/types';

export interface sortingArgs {
  arr: [string, ICountryData][];
  year: number;
  direction: SortDirection;
}

export function sortByPopulation({
  arr,
  year,
  direction = 'asc',
}: sortingArgs): [string, ICountryData][] {
  return [...arr].sort(([, dataA], [, dataB]) => {
    const recA = dataA.data.find((r) => r.year === year) ?? dataA.data[0];
    const recB = dataB.data.find((r) => r.year === year) ?? dataB.data[0];

    const valA = recA.population ?? 0;
    const valB = recB.population ?? 0;

    return direction === 'asc' ? valA - valB : valB - valA;
  });
}

export function sortByCountry({
  arr,
  direction = 'asc',
}: sortingArgs): [string, ICountryData][] {
  return [...arr].sort(([countryA], [countryB]) => {
    return direction === 'asc'
      ? countryA.localeCompare(countryB)
      : countryB.localeCompare(countryA);
  });
}

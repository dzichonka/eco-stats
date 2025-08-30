export interface EmissionsJson {
  [country: string]: CountryData;
}

export interface ICountryData {
  iso_code: string;
  data: YearlyRecord[];
}

export interface YearlyRecord {
  year: number;
  population?: number;
  co2?: number;
  co2_per_capita?: number;
  [key: string]: number | undefined;
}
export interface IDisplaydata {
  country: string;
  isoCode: string;
  year: number;
  population?: number;
  co2?: number;
  co2_per_capita?: number;
  [key: string]: number | undefined;
}

export type SortDirection = 'asc' | 'desc';

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
export interface IDisplayedData {
  country: string;
  iso_code: string;
  year: number;
  population?: number;
  co2?: number;
  co2_per_capita?: number;
  gdp?: number;
  methane?: number;
  nitrous_oxide?: number;
  total_ghg?: number;
  cement_co2?: number;
  oil_co2?: number;
  [key: string]: number | undefined;
}

export type SortDirection = 'asc' | 'desc';

export type ExtraColumn =
  | 'gdp'
  | 'methane'
  | 'nitrous_oxide'
  | 'total_ghg'
  | 'cement_co2'
  | 'oil_co2';

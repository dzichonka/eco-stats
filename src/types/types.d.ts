export interface CountryData {
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

import type { EmissionsJson } from '@/types/types';
import { useDeferredValue } from 'react';

type EmissionsTableProps = {
  data: EmissionsJson;
};

const EmissionsTable = ({ data }: EmissionsTableProps) => {
  const arr = Object.entries(data);
  const deferredData = useDeferredValue(arr);
  const safeValue = (value: unknown): string => {
    if (value === undefined || value === null || value === '') return 'N/A';
    return String(value);
  };

  return (
    <table className="relative">
      <caption>caption</caption>
      <thead className="bg-black h-12 sticky top-0">
        <tr>
          <th>country</th>
          <th>iso code</th>
          <th>year</th>
          <th>population</th>
          <th>co2</th>
          <th>co2 per capita</th>
        </tr>
      </thead>
      <tbody>
        {deferredData.map(([country, countryData]) => (
          <tr key={country}>
            <td>{safeValue(country)}</td>
            <td>{safeValue(countryData.iso_code)}</td>
            <td>
              {safeValue(countryData.data[countryData.data.length - 1].year)}
            </td>
            <td>
              {safeValue(
                countryData.data[countryData.data.length - 1].population
              )}
            </td>
            <td>
              {safeValue(countryData.data[countryData.data.length - 1].co2)}
            </td>
            <td>
              {safeValue(
                countryData.data[countryData.data.length - 1].co2_per_capita
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmissionsTable;

import type { EmissionsJson } from '@/types/types';
//import { useDeferredValue } from 'react';

type EmissionsTableProps = {
  data: EmissionsJson;
};

const EmissionsTable = ({ data }: EmissionsTableProps) => {
  const arr = Object.entries(data);
  //const deferredData = useDeferredValue(arr);
  return (
    <table className="relative">
      <caption>caption</caption>
      <thead className="bg-black h-12 sticky top-0">
        <tr>
          <th>country</th>
          <th>iso_code</th>
          <th>year</th>
          <th>population</th>
          <th>co2</th>
          <th>co2_per_capita</th>
        </tr>
      </thead>
      <tbody>
        {arr.map(([country, countryData]) => (
          <tr key={country}>
            <td>{country}</td>
            <td>{countryData.iso_code}</td>
            <td>{countryData.data[countryData.data.length - 1].year}</td>
            <td>{countryData.data[countryData.data.length - 1].population}</td>
            <td>{countryData.data[countryData.data.length - 1].co2}</td>
            <td>
              {countryData.data[countryData.data.length - 1].co2_per_capita}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmissionsTable;

import type { EmissionsJson, YearlyRecord } from '@/types/types';
import { useDeferredValue, useState } from 'react';
import CountryData from '@/components/CountryData/CountryData';

type EmissionsTableProps = {
  data: EmissionsJson;
};

const EmissionsTable = ({ data }: EmissionsTableProps) => {
  const arr = Object.entries(data);
  const deferredData = useDeferredValue(arr);
  const defaultYear =
    deferredData[0][1].data[deferredData[0][1].data.length - 1].year;

  const [selectedYear, setSelectedYear] = useState(defaultYear);

  return (
    <table className="relative">
      <caption>caption</caption>
      <thead className="bg-black h-12 sticky top-0">
        <tr>
          <th>country</th>
          <th>iso code</th>
          <th>
            <div>year</div>
            <input
              name="year"
              type="number"
              value={selectedYear}
              min={deferredData[0][1].data[0].year}
              max={
                deferredData[0][1].data[deferredData[0][1].data.length - 1].year
              }
              onChange={(e) => {
                setSelectedYear(Number(e.target.value));
              }}
            />
          </th>
          <th>population</th>
          <th>co2</th>
          <th>co2 per capita</th>
        </tr>
      </thead>
      <tbody>
        {deferredData.map(([country, countryData]) => {
          const record: YearlyRecord =
            countryData.data.find((rec) => rec.year === selectedYear) ??
            countryData.data[0];
          return (
            <tr key={country}>
              <CountryData
                country={country}
                isoCode={countryData.iso_code}
                record={record}
              />
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default EmissionsTable;

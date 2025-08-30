import type {
  EmissionsJson,
  ICountryData,
  SortDirection,
  YearlyRecord,
} from '@/types/types';
import { useDeferredValue, useMemo, useState } from 'react';
import { TiArrowSortedUp } from 'react-icons/ti';
import { TiArrowSortedDown } from 'react-icons/ti';
import { sortByCountry, sortByPopulation } from '@/utils/sort';
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
  const [sortConfig, setSortConfig] = useState<{
    type: 'country' | 'population';
    arr: [string, ICountryData][];
    year: number;
    direction: SortDirection;
  } | null>(null);

  const displayedData = useMemo(() => {
    if (!sortConfig) return deferredData;
    if (sortConfig.type === 'country') {
      return sortByCountry(sortConfig);
    }
    if (sortConfig.type === 'population') {
      return sortByPopulation(sortConfig);
    }
    return deferredData;
  }, [deferredData, sortConfig]);
  const handleCountrySort = (direction: SortDirection) => {
    setSortConfig({
      type: 'country',
      arr: deferredData,
      year: selectedYear,
      direction,
    });
  };
  const handlePopulationSort = (direction: SortDirection) => {
    setSortConfig({
      type: 'population',
      arr: deferredData,
      year: selectedYear,
      direction,
    });
  };

  return (
    <table>
      <thead>
        <tr>
          <th>
            <div className="flex items-center justify-center">
              <span>country</span>
              <div className="flex flex-col leading-none">
                <button
                  onClick={() => {
                    handleCountrySort('asc');
                  }}
                >
                  <TiArrowSortedUp />
                </button>
                <button
                  onClick={() => {
                    handleCountrySort('desc');
                  }}
                >
                  <TiArrowSortedDown />
                </button>
              </div>
            </div>
          </th>
          <th>
            iso <br />
            code
          </th>
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
          <th>
            <div className="flex items-center justify-center">
              <span>population</span>
              <div className="flex flex-col leading-none">
                <button
                  onClick={() => {
                    handlePopulationSort('asc');
                  }}
                >
                  <TiArrowSortedUp />
                </button>
                <button
                  onClick={() => {
                    handlePopulationSort('desc');
                  }}
                >
                  <TiArrowSortedDown />
                </button>
              </div>
            </div>
          </th>
          <th>co2</th>
          <th>co2 per capita</th>
        </tr>
      </thead>
      <tbody>
        {displayedData.map(([country, countryData]) => {
          const record: YearlyRecord =
            countryData.data.find(
              (rec: YearlyRecord) => rec.year === selectedYear
            ) ?? countryData.data[0];
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

import type {
  EmissionsJson,
  ICountryData,
  SortDirection,
  YearlyRecord,
} from '@/types/types';
import { useCallback, useDeferredValue, useMemo, useState } from 'react';
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti';
import { sortByCountry, sortByPopulation } from '@/utils/sort';
import CountryData from '@/components/CountryData/CountryData';
import Search from '@/components/Search/Search';
import { useColumnsStore } from '@/store/columnsStore';

type EmissionsTableProps = {
  data: EmissionsJson;
};

const EmissionsTable = ({ data }: EmissionsTableProps) => {
  const arr: [string, ICountryData][] = Object.entries(data);
  const deferredData = useDeferredValue(arr);
  const defaultYear =
    deferredData[0][1].data[deferredData[0][1].data.length - 1].year;

  const [sort, setSort] = useState({
    type: 'country' as 'country' | 'population',
    dir: 'asc' as SortDirection,
  });
  const [selectedYear, setSelectedYear] = useState(defaultYear);
  const [searchQuery, setSearchQuery] = useState('');

  const { selectedColumns, columnLabels } = useColumnsStore();

  const filteredData = useMemo(() => {
    if (!searchQuery) return deferredData;

    return deferredData.filter(([country]) =>
      country.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [deferredData, searchQuery]);

  const sortedData = useMemo(() => {
    let data = [...filteredData];

    if (sort.type === 'country') {
      data = sortByCountry({
        arr: data,
        year: selectedYear,
        direction: sort.dir,
      });
    }
    if (sort.type === 'population') {
      data = sortByPopulation({
        arr: data,
        year: selectedYear,
        direction: sort.dir,
      });
    }

    return data;
  }, [filteredData, sort, selectedYear]);

  const handleCountrySort = useCallback((direction: SortDirection) => {
    setSort({ type: 'country', dir: direction });
  }, []);

  const handlePopulationSort = useCallback((direction: SortDirection) => {
    setSort({ type: 'population', dir: direction });
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

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
            <Search onSearch={handleSearch} />
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
          {selectedColumns.map((col) => (
            <th key={col}>{columnLabels[col]}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map(([country, countryData]) => {
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

import type { YearlyRecord } from '@/types/types';
import YearlyData from '@/components/YearlyData/YearlyData';

type CountryDataProps = {
  country: string;
  isoCode: string;
  record: YearlyRecord;
};

const CountryData = ({ country, isoCode, record }: CountryDataProps) => {
  return (
    <>
      <td>{country}</td>
      <td>{isoCode}</td>
      <YearlyData record={record} />
    </>
  );
};

export default CountryData;

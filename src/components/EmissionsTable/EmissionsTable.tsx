import type { EmissionsJson } from '@/types/types';
import { useDeferredValue } from 'react';

type EmissionsTableProps = {
  data: EmissionsJson;
};

const EmissionsTable = ({ data }: EmissionsTableProps) => {
  const arr = Object.entries(data);
  const deferredData = useDeferredValue(arr);
  return (
    <ul>
      {deferredData.map(([country, countryData]) => (
        <li key={countryData.iso_code}>{country}</li>
      ))}
    </ul>
  );
};

export default EmissionsTable;

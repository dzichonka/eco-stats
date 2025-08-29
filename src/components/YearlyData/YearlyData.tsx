import type { YearlyRecord } from '@/types/types';
import { useEffect, useState } from 'react';

const YearlyData = ({ record }: { record: YearlyRecord }) => {
  const safeValue = (value: unknown) =>
    value == null || value === '' ? 'N/A' : String(value);
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    setHighlight(true);
    const timer = setTimeout(() => setHighlight(false), 500);
    return () => clearTimeout(timer);
  }, [record]);

  const highlightStyle = {
    color: '#ff033e',
  };

  return (
    <>
      <td style={highlight ? highlightStyle : undefined}>
        {safeValue(record.year)}
      </td>
      <td style={highlight ? highlightStyle : undefined}>
        {safeValue(record.population)}
      </td>
      <td style={highlight ? highlightStyle : undefined}>
        {safeValue(record.co2)}
      </td>
      <td style={highlight ? highlightStyle : undefined}>
        {safeValue(record.co2_per_capita)}
      </td>
    </>
  );
};

export default YearlyData;

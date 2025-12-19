import { useColumnsStore } from '@/store/columnsStore';
import type { YearlyRecord } from '@/types/types';
import { useEffect, useState } from 'react';

const YearlyData = ({ record }: { record: YearlyRecord }) => {
  const { year, population, co2, co2_per_capita, ...rest } = record;

  const { selectedColumns } = useColumnsStore();
  const safeValue = (value: unknown) =>
    value == null || value === ''
      ? 'N/A'
      : Number(value).toLocaleString('ru-RU');
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    setHighlight(true);
    const timer = setTimeout(() => setHighlight(false), 500);
    return () => clearTimeout(timer);
  }, [year]);

  const highlightStyle = {
    color: '#ff033e',
  };

  return (
    <>
      <td style={highlight ? highlightStyle : undefined}>{year}</td>
      <td style={highlight ? highlightStyle : undefined}>
        {safeValue(population)}
      </td>
      <td style={highlight ? highlightStyle : undefined}>{safeValue(co2)}</td>
      <td style={highlight ? highlightStyle : undefined}>
        {safeValue(co2_per_capita)}
      </td>
      {selectedColumns.map((col) => (
        <td key={col}>{safeValue(rest[col])}</td>
      ))}
    </>
  );
};

export default YearlyData;

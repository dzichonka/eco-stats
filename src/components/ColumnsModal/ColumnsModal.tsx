import { useColumnsStore } from '@/store/columnsStore';
import type { ExtraColumn } from '@/types/types';
import { Toggler } from '../Toggler/Toggler';

const availableColumns: ExtraColumn[] = [
  'gdp',
  'methane',
  'nitrous_oxide',
  'total_ghg',
  'cement_co2',
  'oil_co2',
];

export const ColumnsModal = () => {
  const { selectedColumns, columnLabels, toggleColumn } = useColumnsStore();

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">
        Select the columns you want to display
      </h2>
      <div className="flex flex-col gap-2">
        {availableColumns.map((col) => (
          <Toggler
            key={col}
            label={columnLabels[col]}
            name={col}
            checked={selectedColumns.includes(col)}
            onInput={() => toggleColumn(col)}
          />
        ))}
      </div>
    </div>
  );
};

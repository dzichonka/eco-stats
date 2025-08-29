import { use } from 'react';
import EmissionsTable from '@/components/EmissionsTable/EmissionsTable';
import { getEmissions } from '@/resources/getEmissions';

const EmissionsList = () => {
  const data = use(getEmissions());
  return (
    <div className="section">
      <EmissionsTable data={data} />
    </div>
  );
};

export default EmissionsList;

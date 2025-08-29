//import { useEmissionsStore } from '@/store/useEmissionsStore';
import { use } from 'react';
import EmissionsTable from '@/components/EmissionsTable/EmissionsTable';
import { getEmissions } from '@/resources/getEmissions';

const EmissionsList = () => {
  const data = use(getEmissions());
  return <EmissionsTable data={data} />;
};

export default EmissionsList;

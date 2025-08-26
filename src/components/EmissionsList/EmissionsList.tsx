import { useEmissionsStore } from '@/store/useEmissionsStore';
import { use } from 'react';
import EmissionsTable from '../EmissionsTable/EmissionsTable';

const EmissionsList = () => {
  const fetchData = useEmissionsStore((s) => s.fetchData);
  const data = use(fetchData());

  return <EmissionsTable data={data} />;
};

export default EmissionsList;

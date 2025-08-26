import { Suspense } from 'react';
import EmissionsList from '@/components/EmissionsList/EmissionsList';
import Loader from '../Loader/Loader';

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <EmissionsList />
    </Suspense>
  );
}

export default App;

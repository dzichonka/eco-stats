import { Suspense } from 'react';
import EmissionsList from '@/components/EmissionsList/EmissionsList';
import Loader from '../Loader/Loader';

function App() {
  return (
    <>
      <h1 className="text-center text-2xl">Eco Stats App</h1>
      <Suspense fallback={<Loader />}>
        <EmissionsList />
      </Suspense>
    </>
  );
}

export default App;

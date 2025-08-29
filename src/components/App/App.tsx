import { Suspense } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary';
import EmissionsList from '@/components/EmissionsList/EmissionsList';
import Loader from '@/components/Loader/Loader';
import ErrorMsg from '@/components/ErrorMsg/ErrorMsg';

function App() {
  return (
    <div className="container">
      <h1 className="section text-center text-2xl">Eco Stats App</h1>
      <ErrorBoundary fallback={<ErrorMsg />}>
        <Suspense fallback={<Loader />}>
          <EmissionsList />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;

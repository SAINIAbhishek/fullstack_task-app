import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import Spinner from '@/components/spinner';
import MainLayout from '@/components/layout/main-layout';
import PublicRoutes from '@/routes/public';

const AppRoute = () => {
  const isAuthenticated = false;

  return (
    <MainLayout>
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          {isAuthenticated ? '' : <PublicRoutes />}
        </Suspense>
      </BrowserRouter>
    </MainLayout>
  );
};

export default AppRoute;

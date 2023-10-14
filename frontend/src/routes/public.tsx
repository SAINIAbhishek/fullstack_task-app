import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from '@/components/layout/main-layout';
import AuthRoutes, { AUTH_BASE_ROUTE } from '@/features/auth/routes';
import Spinner from '@/components/spinner';
import { Suspense } from 'react';

const PublicRoutes = () => {
  return (
    <MainLayout>
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path={`${AUTH_BASE_ROUTE}/*`} element={<AuthRoutes />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </MainLayout>
  );
};

export default PublicRoutes;

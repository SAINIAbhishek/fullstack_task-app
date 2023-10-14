import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Spinner from '@/components/spinner';
import PublicRoutes from '@/routes/public';
import { Suspense } from 'react';
import { AUTH_BASE_ROUTE } from '@/features/auth/routes';

const DEFAULT_ROUTE = '/';

const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={`${AUTH_BASE_ROUTE}/*`}
          element={
            <Suspense fallback={<Spinner />}>
              <PublicRoutes
                defaultRoute={DEFAULT_ROUTE}
                isAuthenticated={false}
              />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;

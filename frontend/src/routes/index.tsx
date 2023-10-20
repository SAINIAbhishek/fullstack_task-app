import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import Spinner from '@/components/spinner';
import PublicRoutes from '@/routes/public';
import AuthRoutes, { AUTH_BASE_ROUTE } from '@/features/auth/routes';
import ProtectedRoutes from '@/routes/protected';

const AppRoute = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route
            element={
              <ProtectedRoutes defaultRoute={`${AUTH_BASE_ROUTE}/login`} />
            }>
            <Route path="/dashboard" element={'Dashboard page'} />
          </Route>
          <Route element={<PublicRoutes defaultRoute="/dashboard" />}>
            <Route path={`${AUTH_BASE_ROUTE}/*`} element={<AuthRoutes />} />
          </Route>
          <Route
            path="*"
            element={<Navigate to={`${AUTH_BASE_ROUTE}/login`} />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoute;

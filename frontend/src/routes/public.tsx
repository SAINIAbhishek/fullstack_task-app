import { Route, Routes } from 'react-router-dom';
import AuthRoutes, { AUTH_BASE_ROUTE } from '@/features/auth/routes';

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path={`${AUTH_BASE_ROUTE}/*`} element={<AuthRoutes />} />
    </Routes>
  );
};

export default PublicRoutes;

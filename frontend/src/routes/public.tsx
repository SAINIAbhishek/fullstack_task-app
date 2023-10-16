import { Navigate, Route, Routes } from 'react-router-dom';
import AuthRoutes, { AUTH_BASE_ROUTE } from '@/features/auth/routes';
import { useAuth } from '@/providers/auth-provider';

const PublicRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <Route path={`${AUTH_BASE_ROUTE}/*`} element={<AuthRoutes />} />
      )}
    </Routes>
  );
};

export default PublicRoutes;

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/providers/auth-provider';

type Props = {
  defaultRoute: string;
};

const PublicRoutes = ({ defaultRoute }: Props) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to={defaultRoute} /> : <Outlet />;
};

export default PublicRoutes;

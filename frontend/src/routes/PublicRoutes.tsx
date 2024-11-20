import { Navigate, Outlet } from 'react-router-dom';
import useAuthContext from '@/contexts/auth-context/useAuthContext';

type Props = {
  defaultRoute: string;
};

const PublicRoutes = ({ defaultRoute }: Props) => {
  const { isAuthenticated } = useAuthContext();
  return isAuthenticated ? <Navigate to={defaultRoute} /> : <Outlet />;
};

export { PublicRoutes };

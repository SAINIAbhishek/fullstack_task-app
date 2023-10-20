import { useAuth } from '@/providers/auth-provider';
import { Navigate, Outlet } from 'react-router-dom';

type Props = {
  defaultRoute: string;
};

const ProtectedRoutes = ({ defaultRoute }: Props) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to={defaultRoute} />;
};

export default ProtectedRoutes;

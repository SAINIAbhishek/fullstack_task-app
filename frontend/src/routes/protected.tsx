import { useAuth } from '@/providers/auth-provider';
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '@/components/navbar';

type Props = {
  defaultRoute: string;
};

const ProtectedRoutes = ({ defaultRoute }: Props) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to={defaultRoute} />
  );
};

export default ProtectedRoutes;

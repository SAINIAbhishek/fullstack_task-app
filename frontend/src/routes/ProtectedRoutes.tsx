import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '@/components/navbar/Navbar';
import useAuthContext from '@/contexts/auth-context/useAuthContext';

type Props = {
  defaultRoute: string;
};

const ProtectedRoutes = ({ defaultRoute }: Props) => {
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to={defaultRoute} />
  );
};

export { ProtectedRoutes };

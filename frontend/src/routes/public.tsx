import AuthRoutes from '@/features/auth/routes';
import { Navigate } from 'react-router-dom';

type Props = {
  isAuthenticated: boolean;
  defaultRoute: string;
};

const PublicRoutes = ({ defaultRoute, isAuthenticated }: Props) => {
  return (
    <>{isAuthenticated ? <Navigate to={defaultRoute} /> : <AuthRoutes />}</>
  );
};

export default PublicRoutes;

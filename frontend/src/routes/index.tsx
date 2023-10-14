import PublicRoutes from '@/routes/public.tsx';

const AppRoute = () => {
  const isAuthenticated = false;
  return <>{isAuthenticated ? '' : <PublicRoutes />}</>;
};

export default AppRoute;

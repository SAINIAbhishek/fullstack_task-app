import { Navigate, Route, Routes } from 'react-router-dom';
import { lazy } from 'react';

export const AUTH_BASE_ROUTE = '/auth';

const Register = lazy(() => import('@/pages/auth/register/Register'));
const Login = lazy(() => import('@/pages/auth/login/Login'));
const ForgotPassword = lazy(
  () => import('@/pages/auth/forgot-password/ForgotPassword'),
);
const ResetPassword = lazy(
  () => import('@/pages/auth/reset-password/ResetPassword'),
);

type RouteProps = {
  path: string;
  element: React.ReactNode;
};

const routes: RouteProps[] = [
  { path: '/register', element: <Register /> },
  { path: '/login', element: <Login /> },
  { path: '/forgot-password', element: <ForgotPassword /> },
  { path: '/reset-password', element: <ResetPassword /> },
  { path: '*', element: <Navigate to="/login" /> },
];

const AuthRoutes = () => {
  return (
    <Routes>
      {routes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
};

export default AuthRoutes;

import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';

const Register = lazy(() => import('./components/register'));
const Login = lazy(() => import('./components/login'));
const ForgotPassword = lazy(() => import('./components/forgot-password'));
const ResetPassword = lazy(() => import('./components/reset-password'));

export const AUTH_BASE_ROUTE = '/auth';

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
};

export default AuthRoutes;

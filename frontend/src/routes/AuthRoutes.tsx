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

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AuthRoutes;

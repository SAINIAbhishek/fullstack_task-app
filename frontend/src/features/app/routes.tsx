import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoadingSpinner from '../shared/loading-spinner';
import DashboardPage from '../../pages/dashboard.page';
import LoginPage from '../../pages/login.page';

const RegisterPage = lazy(() => import('../../pages/register.page'));
const ForgotPasswordPage = lazy(
  () => import('../../pages/forgot-password.page'),
);
const ResetPasswordPage = lazy(() => import('../../pages/reset-password.page'));

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="/reset-password/:token"
            element={<ResetPasswordPage />}
          />
          <Route path="/" element={<DashboardPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;

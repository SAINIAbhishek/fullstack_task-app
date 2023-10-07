import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoadingSpinner from '../shared/loading-spinner';

const RegisterPage = lazy(() => import('../../pages/register-page'));

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<RegisterPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;

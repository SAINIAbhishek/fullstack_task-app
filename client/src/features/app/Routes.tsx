import React, { lazy, Suspense } from 'react';
import LoadingSpinner from '../common/loading-spinner';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../login';

const Register = lazy(() => import('../register'));

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;

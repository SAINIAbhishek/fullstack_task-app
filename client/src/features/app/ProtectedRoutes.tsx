import { Navigate, Outlet } from 'react-router-dom';
import React from 'react';

const ProtectedRoutes = () => {
  const isAuthenticated = false;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;

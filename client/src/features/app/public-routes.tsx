import { Navigate, Outlet } from 'react-router-dom';
import React from 'react';

const PublicRoutes = () => {
  const isAuthenticated = false;
  return isAuthenticated ? <Navigate to="/home" /> : <Outlet />;
};

export default PublicRoutes;

import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoadingSpinner from '../common/loading-spinner';
import PublicRoutes from './public-routes';
import Login from '../login';

const Register = lazy(() => import('../register'));

function App() {
  return (
    <div className="min-h-screen text-slate-600 bg-slate-900 xl:text-base sm:text-sm text-xs">
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route element={<PublicRoutes />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Login />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;

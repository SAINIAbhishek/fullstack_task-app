import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Spinner from '@/components/spinner/Spinner';
import AuthRoutes, { AUTH_BASE_ROUTE } from '@/routes/AuthRoutes';
import { ProtectedRoutes } from './ProtectedRoutes';
import { PublicRoutes } from './PublicRoutes';
import TasksRoutes, { TASKS_BASE_ROUTE } from './TasksRoutes';

const Tasks = lazy(() => import('@/pages/tasks/tasks/Tasks'));

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route
            element={
              <ProtectedRoutes defaultRoute={`${AUTH_BASE_ROUTE}/login`} />
            }>
            <Route
              path="/dashboard"
              element={<Tasks title="menu.all_tasks" />}
            />
            <Route path={`${TASKS_BASE_ROUTE}/*`} element={<TasksRoutes />} />
          </Route>
          <Route element={<PublicRoutes defaultRoute="/dashboard" />}>
            <Route path={`${AUTH_BASE_ROUTE}/*`} element={<AuthRoutes />} />
          </Route>
          <Route
            path="*"
            element={<Navigate to={`${AUTH_BASE_ROUTE}/login`} />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;

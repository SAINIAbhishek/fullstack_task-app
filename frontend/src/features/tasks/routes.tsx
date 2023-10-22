import { Navigate, Route, Routes } from 'react-router-dom';
import { lazy } from 'react';

export const TASKS_BASE_ROUTE = '/tasks';

const NewTask = lazy(() => import('./components/new-task'));

const TasksRoutes = () => {
  return (
    <Routes>
      <Route path="/new" element={<NewTask />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default TasksRoutes;

import { Navigate, Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import { todayDate } from '@/helpers/DateHelper';

export const TASKS_BASE_ROUTE = '/tasks';

const NewTask = lazy(() => import('@/pages/tasks/new-task/NewTask'));
const EditTask = lazy(() => import('@/pages/tasks/edit-task/EditTask'));
const Tasks = lazy(() => import('@/pages/tasks/tasks/Tasks'));

const taskFilters = {
  important: { title: 'menu.important_tasks', filter: { important: true } },
  completed: { title: 'menu.completed_tasks', filter: { completed: true } },
  uncompleted: {
    title: 'menu.uncompleted_tasks',
    filter: { completed: false },
  },
  today: { title: 'menu.today_tasks', filter: { date: todayDate() } },
};

const TasksRoutes = () => {
  return (
    <Routes>
      {/* Static Routes */}
      <Route path="/new" element={<NewTask />} />
      <Route path="/:id/edit" element={<EditTask />} />

      {/* Dynamic Routes for Filters */}
      {Object.entries(taskFilters).map(([path, { title, filter }]) => (
        <Route
          key={path}
          path={`/${path}`}
          element={<Tasks title={title} filter={JSON.stringify(filter)} />}
        />
      ))}

      {/* Fallback Route for Non-existent Paths */}
      <Route path="*" element={<Navigate to={TASKS_BASE_ROUTE} />} />
    </Routes>
  );
};

export default TasksRoutes;

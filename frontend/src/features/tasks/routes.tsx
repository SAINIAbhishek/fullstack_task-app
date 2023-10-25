import { Navigate, Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import { todayDate } from '@/utils/date.ts';

export const TASKS_BASE_ROUTE = '/tasks';

const NewTask = lazy(() => import('./components/new-task'));
const Tasks = lazy(() => import('./components/tasks'));

const TasksRoutes = () => {
  return (
    <Routes>
      <Route path="/new" element={<NewTask />} />
      <Route
        path="/important"
        element={
          <Tasks
            title="Important tasks"
            filter={JSON.stringify({ important: true })}
          />
        }
      />
      <Route
        path="/completed"
        element={
          <Tasks
            title="Completed tasks"
            filter={JSON.stringify({ completed: true })}
          />
        }
      />
      <Route
        path="/uncompleted"
        element={
          <Tasks
            title="Uncompleted tasks"
            filter={JSON.stringify({ completed: false })}
          />
        }
      />
      <Route
        path="/today"
        element={
          <Tasks
            title="Today's tasks"
            filter={JSON.stringify({ date: todayDate() })}
          />
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default TasksRoutes;

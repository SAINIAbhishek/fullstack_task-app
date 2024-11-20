import { Navigate, Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import { todayDate } from '@/helpers/DateHelper';

export const TASKS_BASE_ROUTE = '/tasks';

const NewTask = lazy(() => import('@/pages/tasks/new-task/NewTask'));
const EditTask = lazy(() => import('@/pages/tasks/edit-task/EditTask'));
const Tasks = lazy(() => import('@/pages/tasks/tasks/Tasks'));

const TasksRoutes = () => {
  return (
    <Routes>
      <Route path="/new" element={<NewTask />} />
      <Route path="/:id/edit" element={<EditTask />} />
      <Route
        path="/important"
        element={
          <Tasks
            title="menu.important_tasks"
            filter={JSON.stringify({ important: true })}
          />
        }
      />
      <Route
        path="/completed"
        element={
          <Tasks
            title="menu.completed_tasks"
            filter={JSON.stringify({ completed: true })}
          />
        }
      />
      <Route
        path="/uncompleted"
        element={
          <Tasks
            title="menu.uncompleted_tasks"
            filter={JSON.stringify({ completed: false })}
          />
        }
      />
      <Route
        path="/today"
        element={
          <Tasks
            title="menu.today_tasks"
            filter={JSON.stringify({ date: todayDate() })}
          />
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default TasksRoutes;

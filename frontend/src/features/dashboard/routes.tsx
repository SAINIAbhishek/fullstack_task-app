import { Route, Routes } from 'react-router-dom';
import DashboardLayout from '@/features/dashboard/layout';

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />} />
    </Routes>
  );
};

export default DashboardRoutes;

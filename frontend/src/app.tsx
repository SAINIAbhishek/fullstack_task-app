import { Toaster } from 'react-hot-toast';
import MainLayout from '@/components/layout/main-layout';
import AppRoute from '@/routes';

const App = () => {
  return (
    <MainLayout>
      <Toaster position="bottom-left" />
      <AppRoute />
    </MainLayout>
  );
};

export default App;

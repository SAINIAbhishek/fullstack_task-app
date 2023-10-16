import AppProvider from '@/providers/app.provider';
import AppRoute from '@/routes';

const App = () => {
  return (
    <AppProvider>
      <AppRoute />
    </AppProvider>
  );
};

export default App;

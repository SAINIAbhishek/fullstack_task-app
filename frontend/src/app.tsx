import AppProvider from '@/providers/app-provider';
import AppRoute from '@/routes';
import AuthProvider from '@/providers/auth-provider';
import { queryClient } from '@/lib/react-query';
import { QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { ReactQueryDevtools } from 'react-query/devtools';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="bottom-right" />
      <AuthProvider>
        <AppProvider>
          <AppRoute />
        </AppProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
};

export default App;

import AppProvider from '@/providers/app-provider';
import AppRoute from '@/routes';
import AuthProvider from '@/providers/auth-provider';
import { queryClient } from '@/lib/react-query';
import { Toaster } from 'react-hot-toast';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="bottom-left" />
      <AuthProvider>
        <AppProvider>
          <AppRoute />
        </AppProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;

import AppProvider from '@/providers/app-provider';
import AppRoute from '@/routes';
import AuthProvider from '@/providers/auth-provider';
import { queryClient } from '@/lib/react-query';
import { QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { NODE_ENV } from '@/config';
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
      {NODE_ENV === 'development' && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
};

export default App;

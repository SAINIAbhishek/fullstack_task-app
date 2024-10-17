import '@/lib/i18n';
import AppProvider from '@/providers/app-provider';
import AppRoute from '@/routes';
import AuthProvider from '@/providers/auth-provider';
import { queryClient } from '@/lib/react-query';
import { Toaster } from 'react-hot-toast';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import useDisableReactDevTools from '@/hooks/useDisableReactDevTools';

const App = () => {
  // Disable React DevTools in production
  useDisableReactDevTools();

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="bottom-left" />
      <AuthProvider>
        <AppProvider>
          <AppRoute />
        </AppProvider>
      </AuthProvider>
      {/* React Query DevTools for debugging */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;

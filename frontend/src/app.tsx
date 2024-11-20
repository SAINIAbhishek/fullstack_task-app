import '@/lib/i18n/i18n';
import AppProvider from '@/contexts/app-context/AppProvider';
import AppRoutes from '@/routes/Routes';
import { queryClient } from '@/lib/react-query/ReactQuery';
import { Toaster } from 'react-hot-toast';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import useDisableReactDevTools from '@/hooks/use-disable-react-dev-tools/useDisableReactDevTools';
import AuthProvider from '@/contexts/auth-context/AuthProvider';

const App = () => {
  // Disable React DevTools in production
  useDisableReactDevTools();

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="bottom-left" />
      <AuthProvider>
        <AppProvider>
          <AppRoutes />
        </AppProvider>
      </AuthProvider>
      {/* React Query DevTools for debugging */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;

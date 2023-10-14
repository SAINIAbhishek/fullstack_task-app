import { Toaster } from 'react-hot-toast';
import AppRoute from '@/routes';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '@/lib/react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { NODE_ENV } from '@/config';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="bottom-left" />
      <AppRoute />
      {NODE_ENV === 'development' && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
};

export default App;

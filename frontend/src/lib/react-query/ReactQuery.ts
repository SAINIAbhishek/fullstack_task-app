import type { DefaultOptions } from '@tanstack/react-query';
import { QueryCache, QueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const queryConfig: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
  },
};

const queryCacheConfig = new QueryCache({
  onError: (error: Error) => {
    toast.error(error.message);
  },
});

export const queryClient = new QueryClient({
  defaultOptions: queryConfig,
  queryCache: queryCacheConfig,
});

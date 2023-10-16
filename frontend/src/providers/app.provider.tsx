import React from 'react';
import { queryClient } from '@/lib/react-query';
import { Toaster } from 'react-hot-toast';
import { NODE_ENV } from '@/config';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClientProvider } from 'react-query';

type Props = {
  children: React.ReactNode;
};

const AppProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="bottom-left" />
      {children}
      {NODE_ENV === 'development' && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
};

export default AppProvider;

import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/layout/main-layout';
import Spinner from '@/components/spinner';
import { useAuth } from '@/providers/auth-provider';
import useAuthToken from '@/hooks/useAuthToken';

type Props = {
  children: React.ReactNode;
};

const AppProvider = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { isAuthenticated, refresh } = useAuth();
  const { getAuthToken, getAccessToken } = useAuthToken();

  useEffect(() => {
    if (getAuthToken() && getAccessToken() && !isAuthenticated) {
      refresh().finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [getAccessToken, getAuthToken, isAuthenticated, refresh]);

  return (
    <MainLayout>
      {isLoading && !isAuthenticated ? <Spinner /> : <>{children}</>}
    </MainLayout>
  );
};

export default AppProvider;

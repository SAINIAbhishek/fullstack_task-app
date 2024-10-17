import React, { useCallback, useEffect, useState } from 'react';
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

  const checkAuth = useCallback(async () => {
    if (getAuthToken() && getAccessToken() && !isAuthenticated) {
      try {
        await refresh();
      } catch (error) {
        console.error('Failed to refresh token:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, [getAuthToken, getAccessToken, isAuthenticated, refresh]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <MainLayout>
      {isLoading ? <Spinner /> : <React.Fragment>{children}</React.Fragment>}
    </MainLayout>
  );
};

export default AppProvider;

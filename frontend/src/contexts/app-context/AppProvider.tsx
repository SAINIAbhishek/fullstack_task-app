import React, { useCallback, useEffect, useState } from 'react';
import MainLayout from '@/components/layout/main-layout/MainLayout';
import Spinner from '@/components/spinner/Spinner';
import useAuthToken from '@/hooks/use-auth-token/useAuthToken';
import useAuthContext from '../auth-context/useAuthContext';

type Props = {
  children: React.ReactNode;
};

const AppProvider = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { isAuthenticated, refresh } = useAuthContext();
  const { getAuthToken, getAccessToken } = useAuthToken();

  const checkAuth = useCallback(async (): Promise<void> => {
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
    const authenticate = async () => {
      try {
        await checkAuth();
      } catch (error) {
        console.error('Error while checking auth:', error);
      }
    };

    void authenticate();
  }, [checkAuth]);

  return (
    <MainLayout>
      {isLoading ? <Spinner /> : <React.Fragment>{children}</React.Fragment>}
    </MainLayout>
  );
};

export default AppProvider;

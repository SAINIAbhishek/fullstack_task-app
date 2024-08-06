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
  // TODO reactivate refresh token
  // const { isAuthenticated, refresh } = useAuth();
  const { isAuthenticated } = useAuth();
  const { getAuthToken, getAccessToken } = useAuthToken();

  useEffect(() => {
    const checkAuth = async () => {
      if (getAuthToken() && getAccessToken() && !isAuthenticated) {
        try {
          // await refresh();
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [getAccessToken, getAuthToken, isAuthenticated]);

  return (
    <MainLayout>
      {isLoading && !isAuthenticated ? <Spinner /> : <>{children}</>}
    </MainLayout>
  );
};

export default AppProvider;

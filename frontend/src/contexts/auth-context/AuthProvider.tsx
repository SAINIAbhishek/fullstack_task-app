import React, { useCallback, useState } from 'react';
import useAuthToken from '@/hooks/use-auth-token/useAuthToken';
import { useMutation } from '@tanstack/react-query';
import {
  API_LOGIN_USER,
  API_LOGOUT_USER,
  API_REFRESH_TOKEN,
} from '@/api/AuthApi';
import toast from 'react-hot-toast';
import { LoginType } from '@/types/LoginType';
import { UserType } from '@/types/UserType';
import { ApiBaseResponse } from '@/types/ApiBaseType';
import AuthContext from './AuthContext';

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserType | undefined>(undefined);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const { setAuthToken, removeAuthToken, setAccessToken, removeAccessToken } =
    useAuthToken();

  const { mutate: loginMutate } = useMutation({ mutationFn: API_LOGIN_USER });
  const { mutate: logoutMutate } = useMutation({ mutationFn: API_LOGOUT_USER });
  const { mutate: refreshMutate } = useMutation({
    mutationFn: API_REFRESH_TOKEN,
  });

  const handleAuthentication = useCallback(
    (user: UserType | undefined, token: string) => {
      setAccessToken(token);
      setUser(user);
      setIsAuthenticated(true);
    },
    [setAccessToken],
  );

  const refresh = useCallback((): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      refreshMutate(undefined, {
        onSuccess: (response) => {
          const { tokens, user } = response.data as ApiBaseResponse;
          handleAuthentication(user, tokens?.accessToken ?? '');
          resolve(true);
        },
        onError: () => {
          reject(false);
        },
      });
    });
  }, [refreshMutate, handleAuthentication]);

  const login = useCallback(
    (data: LoginType): Promise<boolean> => {
      return new Promise((resolve, reject) => {
        loginMutate(data, {
          onSuccess: (response) => {
            const { tokens, user } = response.data as ApiBaseResponse;
            handleAuthentication(user, tokens?.accessToken ?? '');
            setAuthToken(tokens?.refreshToken ?? '');
            toast.success(response.message);
            resolve(true);
          },
          onError: (error: Error) => {
            toast.error(error.message);
            reject(false);
          },
        });
      });
    },
    [loginMutate, setAuthToken, handleAuthentication],
  );

  const logout = useCallback((): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      logoutMutate(undefined, {
        onSuccess: (response) => {
          toast.success(response.message);
          setIsAuthenticated(false);
          removeAuthToken();
          removeAccessToken();
          setUser(undefined);
          resolve(true);
        },
        onError: (error: Error) => {
          toast.error(error.message);
          reject(false);
        },
      });
    });
  }, [logoutMutate, removeAuthToken, removeAccessToken]);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
        refresh,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

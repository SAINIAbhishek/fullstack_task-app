import React, { createContext, useCallback, useContext, useState } from 'react';
import useAuthToken from '@/hooks/useAuthToken';
import { useMutation } from 'react-query';
import {
  API_LOGIN_USER,
  API_LOGOUT_USER,
  API_REFRESH_TOKEN,
} from '@/api/auth.api';
import toast from 'react-hot-toast';
import { LoginType } from '@/features/auth/types/login.type';
import { AuthContextType } from '@/providers/auth-provider/auth-context.type';

type Props = {
  children: React.ReactNode;
};

const AuthContext = createContext({} as AuthContextType);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const { setAuthToken, removeAuthToken, setAccessToken, removeAccessToken } =
    useAuthToken();

  const { mutate: loginMutate } = useMutation(API_LOGIN_USER);
  const { mutate: logoutMutate } = useMutation(API_LOGOUT_USER);
  const { mutate: refreshMutate } = useMutation(API_REFRESH_TOKEN);

  const handleAuthentication = (user: User | undefined, token: string) => {
    setAccessToken(token);
    setUser(user);
    setIsAuthenticated(true);
  };

  const refresh = useCallback((): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      refreshMutate(undefined, {
        onSuccess: (response) => {
          const { tokens, user } = response.data as ApiResponse;
          handleAuthentication(user, tokens?.accessToken ?? '');
          resolve(true);
        },
        onError: () => {
          reject(false);
        },
      });
    });
  }, []);

  const login = useCallback(
    (data: LoginType): Promise<boolean> => {
      return new Promise((resolve, reject) => {
        loginMutate(data, {
          onSuccess: (response) => {
            const { tokens, user } = response.data as ApiResponse;
            handleAuthentication(user, tokens?.accessToken ?? '');
            setAuthToken(tokens?.refreshToken ?? '');
            toast.success(response.message);
            resolve(true);
          },
          onError: (err: any) => {
            toast.error(err.message);
            reject(false);
          },
        });
      });
    },
    [isAuthenticated],
  );

  const logout = useCallback((): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      logoutMutate(undefined, {
        onSuccess: (response) => {
          setIsAuthenticated(false);
          removeAuthToken();
          removeAccessToken();
          setUser(undefined);
          toast.success(response.message);
          resolve(true);
        },
        onError: (err: any) => {
          toast.error(err.message);
          reject(false);
        },
      });
    });
  }, [isAuthenticated]);

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

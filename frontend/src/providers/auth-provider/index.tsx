import React, { createContext, useCallback, useContext, useState } from 'react';
import useAuthToken from '@/hooks/useAuthToken';
import { useMutation } from 'react-query';
import { API_LOGIN_USER, API_LOGOUT_USER } from '@/api/auth.api';
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
  const [accessToken, setAccessToken] = useState<string>('');

  const { setAuthToken, removeAuthToken } = useAuthToken();

  const { mutate: loginMutate } = useMutation(API_LOGIN_USER);

  const login = useCallback(
    (data: LoginType): Promise<boolean> => {
      return new Promise((resolve, reject) => {
        loginMutate(data, {
          onSuccess: (response) => {
            const { tokens, user } = response.data as ApiResponse;
            setAuthToken(tokens?.refreshToken ?? '');
            setAccessToken(tokens?.accessToken ?? '');
            setUser(user);
            setIsAuthenticated(true);
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
    [loginMutate, setAuthToken],
  );

  const { mutate: logoutMutate } = useMutation(API_LOGOUT_USER);

  const logout = useCallback((): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      logoutMutate(undefined, {
        onSuccess: (response) => {
          setIsAuthenticated(false);
          removeAuthToken();
          setAccessToken('');
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
  }, [logoutMutate, removeAuthToken]);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        accessToken,
        isAuthenticated,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

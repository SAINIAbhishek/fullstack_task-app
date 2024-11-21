import { createContext } from 'react';
import type { AuthContextType } from './AuthContextType';

const defaultContextValue: AuthContextType = {
  user: undefined,
  isAuthenticated: false,
  login: () => Promise.resolve(false),
  logout: () => Promise.resolve(false),
  refresh: () => Promise.resolve(false),
};

const AuthContext = createContext<AuthContextType>(defaultContextValue);

export default AuthContext;

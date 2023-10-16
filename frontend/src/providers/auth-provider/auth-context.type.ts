import { LoginType } from '@/features/auth/types/login.type';

export type AuthContextType = {
  user: User | undefined;
  isAuthenticated: boolean;
  login: (data: LoginType) => Promise<boolean>;
  logout: () => Promise<boolean>;
  accessToken: string;
};

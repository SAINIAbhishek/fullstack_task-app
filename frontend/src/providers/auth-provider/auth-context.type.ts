import { LoginType } from '@/features/auth/types/login.type';
import { UserType } from '@/types/user';

export type AuthContextType = {
  user: UserType | undefined;
  isAuthenticated: boolean;
  login: (data: LoginType) => Promise<boolean>;
  logout: () => Promise<boolean>;
  refresh: () => Promise<boolean>;
};

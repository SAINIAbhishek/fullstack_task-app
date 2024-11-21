import type { LoginType } from '@/types/LoginType';
import type { UserType } from '@/types/UserType';

export type AuthContextType = {
  user: UserType | undefined;
  isAuthenticated: boolean;
  login: (data: LoginType) => Promise<boolean>;
  logout: () => Promise<boolean>;
  refresh: () => Promise<boolean>;
};

import { UserType } from './user';

export type ApiBaseResponse = {
  readonly tokens?: {
    accessToken?: string;
    refreshToken?: string;
  };
  readonly user?: UserType;
};

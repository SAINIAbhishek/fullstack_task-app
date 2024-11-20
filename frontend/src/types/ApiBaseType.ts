import { UserType } from './UserType';

export type ApiBaseResponse = {
  readonly tokens?: {
    accessToken?: string;
    refreshToken?: string;
  };
  readonly user?: UserType;
};

export type ApiResponseError = {
  readonly statusCode: number; // custom code from the server
  readonly message: string;
};

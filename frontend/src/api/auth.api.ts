import { RegisterType } from '@/features/auth/types/register.type';
import { protectedRequest, publicRequest } from '@/lib/axios';
import { LoginType } from '@/features/auth/types/login.type';
import { ResetPasswordType } from '@/features/auth/types/reset-password.type';
import { ApiBaseResponse } from '@/types/api-base.type';
import {
  ForgotPasswordResponse,
  ForgotPasswordType,
} from '@/features/auth/types/forgot-password.type';

export const API_REFRESH_TOKEN = async () => {
  return await protectedRequest<null, ApiBaseResponse>({
    url: `/oauth/refresh`,
    method: 'POST',
  });
};

export const API_LOGOUT_USER = async () => {
  return await publicRequest<null, null>({
    url: `/oauth/logout`,
    method: 'POST',
  });
};

export const API_RESET_PASSWORD = async (data: ResetPasswordType) => {
  return await publicRequest<
    Pick<ResetPasswordType, 'email' | 'password'>,
    null
  >({
    url: `/oauth/resetPassword/${data.token}`,
    method: 'PATCH',
    data: {
      email: data.email,
      password: data.password,
    },
  });
};

export const API_FORGOT_PASSWORD = async (data: ForgotPasswordType) => {
  return await publicRequest<ForgotPasswordType, ForgotPasswordResponse>({
    url: '/oauth/forgotPassword',
    method: 'POST',
    data,
  });
};

export const API_LOGIN_USER = async (data: LoginType) => {
  return await publicRequest<LoginType, ApiBaseResponse>({
    url: '/oauth/login',
    method: 'POST',
    data,
  });
};

export const API_REGISTER_USER = async (data: RegisterType) => {
  return await publicRequest<RegisterType, ApiBaseResponse>({
    url: '/oauth/register',
    method: 'POST',
    data,
  });
};

import { RegisterType } from '@/features/auth/types/register.type';
import { publicRequest } from '@/lib/axios';
import { LoginType } from '@/features/auth/types/login.type';
import { ForgotPasswordType } from '@/features/auth/types/forgot-password.type';
import { ResetPasswordType } from '@/features/auth/types/reset-password.type';

export const API_RESET_PASSWORD = async (data: ResetPasswordType) => {
  return await publicRequest<
    Pick<ResetPasswordType, 'email' | 'password'>,
    ApiResponse
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
  return await publicRequest<ForgotPasswordType, ApiResponse>({
    url: '/oauth/forgotPassword',
    method: 'POST',
    data,
  });
};

export const API_LOGIN_USER = async (data: LoginType) => {
  return await publicRequest<LoginType, ApiResponse>({
    url: '/oauth/login',
    method: 'POST',
    data,
  });
};

export const API_REGISTER_USER = async (data: RegisterType) => {
  return await publicRequest<RegisterType, ApiResponse>({
    url: '/oauth/register',
    method: 'POST',
    data,
  });
};

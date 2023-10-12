import { RegisterType } from '../features/register/register.type';
import { publicRequest } from '../lib/axios';
import { LoginType } from '../features/login/login.type';
import { ForgotPasswordType } from '../features/forgot-password/forgot-password.type.ts';

export const API_REGISTER_USER = async (data: RegisterType) => {
  return await publicRequest<RegisterType, ApiResponse>({
    url: '/oauth/register',
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

export const API_FORGOT_PASSWORD = async (data: ForgotPasswordType) => {
  return await publicRequest<ForgotPasswordType, ApiResponse>({
    url: '/oauth/forgotPassword',
    method: 'POST',
    data,
  });
};

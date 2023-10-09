import { RegisterType } from '../features/register/register-type';
import { publicRequest } from '../lib/axios';

export const API_REGISTER_USER = async (data: RegisterType) => {
  return await publicRequest<RegisterType, ApiResponse>({
    url: '/oauth/register',
    method: 'POST',
    data,
  });
};

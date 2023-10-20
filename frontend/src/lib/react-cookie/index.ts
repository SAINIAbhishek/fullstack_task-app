import { COOKIE } from '@/config';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const COOKIE_AUTH_NAME = COOKIE.auth;
export const COOKIE_ACCESS_TOKEN = COOKIE.accessToken;

export const cookieDefaultOptions = {
  path: '/',
  secure: true,
  sameSite: true,
};

export const getAccessToken = (): string => {
  return cookies.get(COOKIE_ACCESS_TOKEN) || '';
};

export const getAuthToken = (): string => {
  return cookies.get(COOKIE_AUTH_NAME) || '';
};

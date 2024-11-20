import { CONFIG } from '@/config/Config';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const COOKIE_AUTH_NAME = CONFIG.AUTH_TOKEN_NAME;
export const COOKIE_ACCESS_TOKEN = CONFIG.ACCESS_TOKEN;

export const cookieDefaultOptions = {
  path: '/',
  secure: true,
  sameSite: true,
};

const getCookieString = (cookieName: string): string => {
  return (cookies.get(cookieName) as string) ?? '';
};

export const getAccessToken = (): string => {
  return getCookieString(COOKIE_ACCESS_TOKEN);
};

export const getAuthToken = (): string => {
  return getCookieString(COOKIE_AUTH_NAME);
};

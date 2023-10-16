export const NODE_ENV = import.meta.env.VITE_NODE_ENV;

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const APP_NAME = import.meta.env.VITE_APP_NAME;

export const LOGGING = import.meta.env.VITE_LOGGING;

export const ACCESS_TOKEN = 'access-token';
export const REFRESH_TOKEN = 'refresh-token';

export const COOKIE = {
  auth: import.meta.env.VITE_COOKIE_AUTH || '',
  maxAge: parseInt(import.meta.env.VITE_COOKIE_MAX_AGE_SEC || '0'),
};

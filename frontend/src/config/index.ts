export const NODE_ENV = import.meta.env.APP_NODE_ENV;

export const API_BASE_URL = import.meta.env.APP_API_BASE_URL;
export const APP_NAME = import.meta.env.APP_APP_NAME;

export const DATE_FORMAT = import.meta.env.APP_DATE_FORMAT || 'yyyy-MM-dd';
export const DATE_FORMAT_EN =
  import.meta.env.APP_DATE_FORMAT_EN || 'dd-MM-yyyy';
export const DATE_FULL_FORMAT =
  import.meta.env.APP_DATE_FULL_FORMAT || 'yyyy-MM-dd HH:mm:ss.SSS';

export const LOGGING = import.meta.env.APP_LOGGING;

export const COOKIE = {
  auth: import.meta.env.APP_COOKIE_REFRESH_TOKEN || '',
  maxAge: parseInt(
    import.meta.env.APP_COOKIE_REFRESH_TOKEN_MAX_AGE_SEC || '0',
  ),
  accessToken: import.meta.env.APP_COOKIE_ACCESS_TOKEN || '',
  accessTokenMaxAge: parseInt(
    import.meta.env.APP_COOKIE_ACCESS_TOKEN_MAX_AGE_SEC || '0',
  ),
};

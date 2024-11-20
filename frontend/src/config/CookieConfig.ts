export const COOKIE_CONFIG = {
  AUTH_TOKEN_NAME: (import.meta.env.APP_COOKIE_REFRESH_TOKEN as string) || '',
  AUTH_TOKEN_MAX_AGE: parseInt(
    (import.meta.env.APP_COOKIE_REFRESH_TOKEN_MAX_AGE_SEC as string) || '0',
  ),
  ACCESS_TOKEN: (import.meta.env.APP_COOKIE_ACCESS_TOKEN as string) || '',
  ACCESS_TOKEN_MAX_AGE: parseInt(
    (import.meta.env.APP_COOKIE_ACCESS_TOKEN_MAX_AGE_SEC as string) || '0',
  ),
};

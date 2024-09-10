import { COOKIE } from '@/config';
import { useCookies } from 'react-cookie';
import {
  COOKIE_ACCESS_TOKEN,
  COOKIE_AUTH_NAME,
  cookieDefaultOptions,
} from '@/lib/react-cookie';
import { useMemo } from 'react';

/**
 * Hook for managing authentication tokens stored in cookies
 */
const useAuthToken = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    COOKIE_AUTH_NAME,
    COOKIE_ACCESS_TOKEN,
  ]);

  const { [COOKIE_AUTH_NAME]: authToken, [COOKIE_ACCESS_TOKEN]: accessToken } =
    cookies;

  const authTokenOptions = {
    ...cookieDefaultOptions,
    maxAge: COOKIE.maxAge,
  };

  const accessTokenOptions = {
    ...cookieDefaultOptions,
    maxAge: COOKIE.accessTokenMaxAge,
  };

  const getAuthToken = () => authToken || null;
  const getAccessToken = () => accessToken || null;

  const setAuthToken = (token: string) =>
    setCookie(COOKIE_AUTH_NAME, token, authTokenOptions);

  const setAccessToken = (token: string) =>
    setCookie(COOKIE_ACCESS_TOKEN, token, accessTokenOptions);

  const removeAuthToken = () =>
    removeCookie(COOKIE_AUTH_NAME, authTokenOptions);

  const removeAccessToken = () =>
    removeCookie(COOKIE_ACCESS_TOKEN, accessTokenOptions);

  return useMemo(
    () => ({
      getAuthToken,
      setAuthToken,
      removeAuthToken,
      setAccessToken,
      removeAccessToken,
      getAccessToken,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [authToken, accessToken],
  );
};

export default useAuthToken;

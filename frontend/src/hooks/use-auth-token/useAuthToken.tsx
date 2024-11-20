import { useCookies } from 'react-cookie';
import { useCallback, useMemo } from 'react';
import { CONFIG } from '@/config/Config';
import {
  COOKIE_AUTH_NAME,
  COOKIE_ACCESS_TOKEN,
  cookieDefaultOptions,
} from '@/lib/react-cookie/ReactCookie';

/**
 * Hook for managing authentication tokens stored in cookies
 */
const useAuthToken = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    COOKIE_AUTH_NAME,
    COOKIE_ACCESS_TOKEN,
  ]);

  const authTokenOptions = useMemo(
    () => ({
      ...cookieDefaultOptions,
      maxAge: CONFIG.AUTH_TOKEN_MAX_AGE,
    }),
    [],
  );

  const accessTokenOptions = useMemo(
    () => ({
      ...cookieDefaultOptions,
      maxAge: CONFIG.ACCESS_TOKEN_MAX_AGE,
    }),
    [],
  );

  const authToken = (cookies[COOKIE_AUTH_NAME] as string) || null;
  const accessToken = (cookies[COOKIE_ACCESS_TOKEN] as string) || null;

  const getAuthToken = useCallback(() => authToken, [authToken]);
  const getAccessToken = useCallback(() => accessToken, [accessToken]);

  const setAuthToken = useCallback(
    (token: string) => setCookie(COOKIE_AUTH_NAME, token, authTokenOptions),
    [setCookie, authTokenOptions],
  );

  const setAccessToken = useCallback(
    (token: string) =>
      setCookie(COOKIE_ACCESS_TOKEN, token, accessTokenOptions),
    [setCookie, accessTokenOptions],
  );

  const removeAuthToken = useCallback(
    () => removeCookie(COOKIE_AUTH_NAME, authTokenOptions),
    [removeCookie, authTokenOptions],
  );

  const removeAccessToken = useCallback(
    () => removeCookie(COOKIE_ACCESS_TOKEN, accessTokenOptions),
    [removeCookie, accessTokenOptions],
  );

  return useMemo(
    () => ({
      getAuthToken,
      setAuthToken,
      removeAuthToken,
      setAccessToken,
      removeAccessToken,
      getAccessToken,
    }),
    [
      getAuthToken,
      setAuthToken,
      removeAuthToken,
      setAccessToken,
      removeAccessToken,
      getAccessToken,
    ],
  );
};

export default useAuthToken;

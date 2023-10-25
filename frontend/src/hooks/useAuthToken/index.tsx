import { COOKIE } from '@/config';
import { useCookies } from 'react-cookie';
import {
  COOKIE_ACCESS_TOKEN,
  COOKIE_AUTH_NAME,
  cookieDefaultOptions,
} from '@/lib/react-cookie';

/**
 * we are storing the refresh and access tokens in the cookie
 */
const useAuthToken = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    COOKIE_AUTH_NAME,
    COOKIE_ACCESS_TOKEN,
  ]);

  const getAuthToken = () => cookies[COOKIE_AUTH_NAME] || null;
  const getAccessToken = () => cookies[COOKIE_ACCESS_TOKEN] || null;

  const authTokenOptions = {
    ...cookieDefaultOptions,
    maxAge: COOKIE.maxAge,
  };

  const accessTokenOptions = {
    ...cookieDefaultOptions,
    maxAge: COOKIE.accessTokenMaxAge,
  };

  const setAuthToken = (token: string) =>
    setCookie(COOKIE_AUTH_NAME, token, authTokenOptions);

  const setAccessToken = (token: string) =>
    setCookie(COOKIE_ACCESS_TOKEN, token, accessTokenOptions);

  const removeAuthToken = () =>
    removeCookie(COOKIE_AUTH_NAME, authTokenOptions);

  const removeAccessToken = () =>
    removeCookie(COOKIE_ACCESS_TOKEN, accessTokenOptions);

  return {
    getAuthToken,
    setAuthToken,
    removeAuthToken,
    setAccessToken,
    removeAccessToken,
    getAccessToken,
  };
};

export default useAuthToken;

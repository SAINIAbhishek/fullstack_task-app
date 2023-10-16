import { COOKIE } from '@/config';
import { useCookies } from 'react-cookie';

/**
 * we are storing the refresh token in the cookie
 */
export const COOKIE_NAME = COOKIE.auth;

const useAuthToken = () => {
  const [cookies, setCookie, removeCookie] = useCookies([COOKIE_NAME]);

  const getAuthToken = () => cookies[COOKIE_NAME] || null;

  const cookieOptions = {
    path: '/',
    secure: true,
    httpOnly: true,
    maxAge: COOKIE.maxAge,
    sameSite: true,
  };

  const setAuthToken = (token: string) =>
    setCookie(COOKIE_NAME, token, cookieOptions);

  const removeAuthToken = () => removeCookie(COOKIE_NAME);

  return {
    getAuthToken,
    setAuthToken,
    removeAuthToken,
  };
};

export default useAuthToken;

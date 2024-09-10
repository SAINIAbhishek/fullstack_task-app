import { useCookies } from 'react-cookie';
import { vi } from 'vitest';
import useAuthToken from '..';
import { act, renderHook } from '@testing-library/react';
import {
  COOKIE_ACCESS_TOKEN,
  COOKIE_AUTH_NAME,
} from '../../../lib/react-cookie';
import { COOKIE } from '../../../config';

describe('useAuthToken', () => {
  const setCookie = vi.fn();
  const removeCookie = vi.fn();

  let cookies: { [key: string]: string | undefined } = {};

  beforeEach(() => {
    (vi.mocked(useCookies) as unknown as vi.mock).mockReturnValue([
      cookies,
      setCookie,
      removeCookie,
    ]);
  });

  afterEach(() => {
    cookies = {};
    setCookie.mockClear();
    removeCookie.mockClear();
    vi.resetAllMocks();
  });

  test('retrieves authToken and accessToken from cookies', () => {
    cookies[COOKIE_AUTH_NAME] = 'auth-token';
    cookies[COOKIE_ACCESS_TOKEN] = 'access-token';

    const { result } = renderHook(() => useAuthToken());

    console.log('Auth Token:', result.current.getAuthToken());
    console.log('Access Token:', result.current.getAccessToken());

    expect(result.current.getAuthToken()).toBe('auth-token');
    expect(result.current.getAccessToken()).toBe('access-token');
  });

  test('returns null if tokens are not present', () => {
    const { result } = renderHook(() => useAuthToken());

    expect(result.current.getAuthToken()).toBeNull();
    expect(result.current.getAccessToken()).toBeNull();
  });

  test('sets authToken in cookies', () => {
    const { result } = renderHook(() => useAuthToken());

    act(() => {
      result.current.setAuthToken('new-auth-token');
    });

    expect(setCookie).toHaveBeenCalledWith(
      COOKIE_AUTH_NAME,
      'new-auth-token',
      expect.objectContaining({ maxAge: COOKIE.maxAge }),
    );
  });

  test('sets accessToken in cookies', () => {
    const { result } = renderHook(() => useAuthToken());

    act(() => {
      result.current.setAccessToken('new-access-token');
    });

    expect(setCookie).toHaveBeenCalledWith(
      COOKIE_ACCESS_TOKEN,
      'new-access-token',
      expect.objectContaining({ maxAge: COOKIE.accessTokenMaxAge }),
    );
  });

  test('removes authToken from cookies', () => {
    const { result } = renderHook(() => useAuthToken());

    act(() => {
      result.current.removeAuthToken();
    });

    expect(removeCookie).toHaveBeenCalledWith(
      COOKIE_AUTH_NAME,
      expect.objectContaining({ maxAge: COOKIE.maxAge }),
    );
  });

  test('removes accessToken from cookies', () => {
    const { result } = renderHook(() => useAuthToken());

    act(() => {
      result.current.removeAccessToken();
    });

    expect(removeCookie).toHaveBeenCalledWith(
      COOKIE_ACCESS_TOKEN,
      expect.objectContaining({ maxAge: COOKIE.accessTokenMaxAge }),
    );
  });

  test('handles undefined, and empty token values', () => {
    cookies[COOKIE_AUTH_NAME] = undefined;
    const { result, rerender } = renderHook(() => useAuthToken());

    expect(result.current.getAuthToken()).toBeNull();

    cookies[COOKIE_AUTH_NAME] = '';
    rerender();
    expect(result.current.getAuthToken()).toBeNull();
  });

  test('handles changing cookie values between renders', () => {
    cookies[COOKIE_AUTH_NAME] = 'initial-auth-token';
    const { result, rerender } = renderHook(() => useAuthToken());

    expect(result.current.getAuthToken()).toBe('initial-auth-token');

    cookies[COOKIE_AUTH_NAME] = 'updated-auth-token';
    rerender();
    expect(result.current.getAuthToken()).toBe('updated-auth-token');
  });

  test('sets tokens with special characters', () => {
    const specialToken = '!@#$%^&*()_+<>?:{}';
    const { result } = renderHook(() => useAuthToken());

    act(() => {
      result.current.setAuthToken(specialToken);
    });

    expect(setCookie).toHaveBeenCalledWith(
      COOKIE_AUTH_NAME,
      specialToken,
      expect.any(Object),
    );
  });

  test('removes non-existent tokens gracefully', () => {
    const { result } = renderHook(() => useAuthToken());

    act(() => {
      result.current.removeAuthToken();
    });

    expect(removeCookie).toHaveBeenCalledWith(
      COOKIE_AUTH_NAME,
      expect.any(Object),
    );
  });
});

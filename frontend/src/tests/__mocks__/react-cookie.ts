import { vi } from 'vitest';

vi.mock('react-cookie', async (importOriginal) => {
  const actualModule = await importOriginal();
  const actual = actualModule as {
    useCookies: (...args: any[]) => any;
    Cookies: typeof import('react-cookie').Cookies;
  };

  return {
    ...actual,
    useCookies: vi.fn().mockReturnValue([
      { 'auth-token': 'auth-token', 'access-token': 'access-token' }, // Mocked cookie values
      vi.fn(), // Mocked setCookie function
      vi.fn(), // Mocked removeCookie function
    ]),
    Cookies: class {
      get() {
        return undefined;
      }
      set() {}
      remove() {}
    },
  };
});

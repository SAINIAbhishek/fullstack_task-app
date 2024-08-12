import { vi } from 'vitest';

vi.mock('react-cookie', async (importOriginal) => {
  const actualModule = await importOriginal();
  const actual = actualModule as {
    useCookies: (...args: any[]) => any;
    Cookies: typeof import('react-cookie').Cookies;
  };

  return {
    ...actual,
    useCookies: vi.fn(),
    Cookies: class {
      get() {
        return undefined;
      }
      set() { }
      remove() { }
    },
  };
});
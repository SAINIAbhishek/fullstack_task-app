import '@testing-library/jest-dom';

import { vi } from 'vitest';

// This will ensure mocked in all tests
import './__mocks__/react-cookie';

// Mock for react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));


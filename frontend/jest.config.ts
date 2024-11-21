/** @type {import('jest').Config} */ // Import the Config type for Jest

const config = {
  // Use 'ts-jest' to transpile TypeScript files for Jest
  preset: 'ts-jest',

  // Set the test environment to 'jsdom' to simulate a browser-like environment
  // This is useful for testing React components that interact with the DOM
  testEnvironment: 'jsdom',

  // Configure module name mapping to handle imports and aliases
  moduleNameMapper: {
    // Map '@/' to the 'src' directory for aliasing (e.g., import '@/components/...' resolves correctly)
    '^@/(.*)$': '<rootDir>/src/$1',

    // Mock CSS and SCSS imports (Jest doesn't process styles by default)
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
  },

  // Automatically include setup files before running tests
  setupFilesAfterEnv: [
    // Load React Testing Library's custom matchers
    '<rootDir>/src/tests/jest.setup.ts',
  ],

  // Specify file extensions for modules that Jest should process
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],

  // Specify patterns for test files (Jest will only look for files matching these patterns)
  testMatch: [
    '<rootDir>/src/tests/**/*.{test,spec}.{ts,tsx}', // Look for `*.test.ts/tsx` and `*.spec.ts/tsx` in the `src/test/` directory
  ],

  // Enable code coverage reports and specify the directory for storing them
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',

  // Define the files or patterns to exclude from coverage reports
  coveragePathIgnorePatterns: [
    '/node_modules/', // Exclude `node_modules` folder
    '/dist/', // Exclude `dist` folder
  ],

  // Specify transforms for processing files before running tests
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Use `ts-jest` to transpile TypeScript files
  },

  // Exclude specific patterns from the transform process
  transformIgnorePatterns: [
    '/node_modules/', // Don't transform files in `node_modules`
  ],
};

export default config;

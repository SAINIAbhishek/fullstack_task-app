module.exports = {
  root: true,
  env: { browser: true, es2021: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended',
    'plugin:react-query/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'], // Ignore output and config files
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest', // Parse latest ECMAScript features
    sourceType: 'module', // Enable import/export syntax
    ecmaFeatures: {
      jsx: true, // Enable JSX syntax parsing
    },
    project: ['./tsconfig.json', './vite.config.ts'], // Use TypeScript project settings for type checking
    tsconfigRootDir: __dirname, // Set the root directory for TypeScript config files relative to this file
  },
  plugins: ['react-refresh', 'prettier', 'react-query'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }, // Warn when non-component exports are found
    ],
    'no-use-before-define': 'off', // TypeScript handles this rule well
    semi: ['error', 'always'], // Enforce semicolons at the end of statements
    '@typescript-eslint/ban-ts-ignore': 'off', // Allow @ts-ignore (use cautiously)
    '@typescript-eslint/no-explicit-any': 'off', // Allow 'any' type (can be tightened later)
    'react/no-unescaped-entities': 'off', // Allow unescaped characters in JSX (like `&`)
    'react-hooks/rules-of-hooks': 'error', // Enforce React Hooks rules
    'react-hooks/exhaustive-deps': 'warn', // Warn about missing dependencies in hooks
    '@typescript-eslint/no-unsafe-argument': 'warn',
  },
};

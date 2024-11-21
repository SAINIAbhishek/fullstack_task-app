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
    project: ['./tsconfig.json', './tsconfig.test.json'], // Use TypeScript project settings for type checking
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
    "prefer-const": "error", // Prefer using const over let for variables that are never reassigned
    'react/no-unescaped-entities': 'off', // Allow unescaped characters in JSX (like `&`)
    'react-hooks/rules-of-hooks': 'error', // Enforce React Hooks rules
    'react-hooks/exhaustive-deps': 'warn', // Warn about missing dependencies in hooks
    '@typescript-eslint/no-unsafe-argument': 'warn', // Warn when unsafe arguments are passed to functions.
    '@typescript-eslint/no-unused-vars': ['error'], // Error when there are unused variables in the code
    '@typescript-eslint/consistent-type-imports': 'warn', // Warn when TypeScript types are not imported consistently
  }
};

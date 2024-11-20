# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## TypeScript Configuration Documentation

1. Main TypeScript Configuration (tsconfig.json)

```json
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "lib": ["ESNext", "DOM", "DOM.Iterable"],
    "resolveJsonModule": true,
    "allowImportingTsExtensions": true,
    "noEmit": true,
    "types": ["vite/client"],
    "typeRoots": ["./@types", "./node_modules/@types"]
  }
```

## Explanation of compilerOptions

- **target: "ESNext":** Set the JavaScript language version for the output code to the latest ECMAScript features.
- **module: "ESNext":** Use the latest ECMAScript module features like import and export.
- **moduleResolution: "bundler":** Tells TypeScript how to resolve modules, optimized for bundlers like Vite.
- **jsx: "react-jsx":** Enable the React 17 JSX transform without needing to import React in each JSX file.
- **strict: true:** Enables strict type-checking settings for better type safety.
- **noImplicitAny: true:** Prevents variables from being implicitly typed as any.
- **strictNullChecks: true:** Makes null and undefined distinct types, improving type safety.
- **noUnusedLocals: true:** Flags unused local variables as errors.
- **noUnusedParameters: true:** Flags unused parameters in functions as errors.
- **noFallthroughCasesInSwitch: true:** Prevents fall-through cases in switch statements.
- **forceConsistentCasingInFileNames:** true: Enforces consistent casing for file names, helping avoid issues across different file systems.
- **isolatedModules: true:** Ensures that TypeScript files can be transpiled independently, which is useful for bundling tools.
- **allowSyntheticDefaultImports: true:** Allows default imports from non-default-exporting modules.
- **esModuleInterop: true:** Allows compatibility with CommonJS-style modules.
- **lib: ["ESNext", "DOM", "DOM.Iterable"]:** Specifies the libraries to include during compilation, ensuring support for the latest JavaScript and DOM features.
- **resolveJsonModule: true:** Allows importing JSON files as modules.
- **allowImportingTsExtensions: true:** Enables importing TypeScript files with .ts and .tsx extensions.
- **noEmit: true:** Prevents TypeScript from emitting JavaScript files during compilation, useful when using a bundler.
- **types: ["vite/client"]:** Specifies types related to Vite’s client-side environment for better type checking.
- **typeRoots: ["./@types", "./node_modules/@types"]:** Defines directories where TypeScript should look for type declarations.

## Includes and Excludes

```json
  "include": ["src/**/*.ts", "src/**/*.tsx", "./vite.config.ts"],,
  "exclude": ["node_modules", "dist"]
```

- **include:** Specifies the files to include in the compilation process, such as all .ts and .tsx files inside the src directory.
- **exclude:** Excludes certain directories (e.g., node_modules, dist) from being compiled by TypeScript.

## Extending Other Configurations

```json
  "extends": "./tsconfig.paths.json",
  "references": []
```

- **extends:** This allows tsconfig.json to inherit settings from tsconfig.paths.json, which handles path alias configurations.
- **references:** In a multi-project setup, this field is used to reference other TypeScript projects. It is left empty here since it's not needed.

2. Path Aliases (tsconfig.paths.json)

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## Path Aliases Explanation

- **baseUrl:** Defines the base directory for resolving non-relative module names. By setting it to ".", we specify that the root directory of the project is the base directory.
- **paths:** This configures path aliases to simplify imports. For example, "@/_": ["./src/_"] allows importing files from the src directory using the @ alias:

3. Test Configuration (tsconfig.test.json)

```json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "types": ["vitest/globals", "vitest", "@testing-library/jest-dom"],
    "noUnusedLocals": false,
    "noUnusedParameters": false
  }
}
```

## Test Configuration Explanation

- **extends:** Inherits from tsconfig.base.json, so the settings from the base configuration are shared across all configurations.
- **types:** Specifies additional type definitions for testing. This includes types for Vitest and Jest DOM, which are commonly used in testing React components:
- **vitest/globals:** Global types for Vitest.
- **vitest:** Types for Vitest itself.
- **@testing-library/jest-dom:** Types for testing React components with Jest DOM.
- **noUnusedLocals and noUnusedParameters:** These are set to false during testing to allow temporary or incomplete code while writing tests, where unused variables and parameters might be present.

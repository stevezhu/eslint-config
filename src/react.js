import prettier from 'eslint-config-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import baseConfig from './ts.js';

export default tseslint.config(
  ...baseConfig,
  {
    name: 'react/src-browser-globals',
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      globals: globals.browser,
    },
  },
  react.configs.flat['recommended'],
  react.configs.flat['jsx-runtime'],
  {
    name: 'react/custom',
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/function-component-definition': [
        'error',
        { namedComponents: 'function-declaration' },
      ],
    },
  },
  reactHooks.configs['recommended-latest'],
  {
    name: 'react-refresh/custom',
    plugins: {
      'react-refresh': reactRefresh,
    },
    rules: {
      'react-refresh/only-export-components': 'warn',
    },
  },
  prettier,
);

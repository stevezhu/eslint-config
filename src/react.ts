import { defineConfig } from 'eslint/config';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

import tsConfig from './ts.js';

export default {
  configs: {
    recommended: defineConfig(
      tsConfig.configs.recommended,
      importPlugin.flatConfigs.react,
      {
        name: 'react/src-globals',
        files: ['**/*.{js,jsx,ts,tsx}'],
        languageOptions: {
          globals: globals.browser,
        },
      },
      react.configs.flat['recommended'] ?? [],
      react.configs.flat['jsx-runtime'] ?? [],
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
      reactHooks.configs.flat['recommended-latest'],
      reactRefresh.configs.vite,
      prettier,
    ),
  },
};

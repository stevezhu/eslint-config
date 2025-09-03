import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';

import importConfig from './configs/import.js';
import typescriptConfig from './configs/typescript.js';

// the difference between this and the `configs/typescript.js` file is that this is the entire
// config for typescript projects, while that file is the eslint typescript config itself

export default defineConfig(
  Object.assign({ name: '@eslint/js/recommended' }, js.configs.recommended),
  ...importConfig,
  importPlugin.flatConfigs.typescript,
  {
    name: 'ts/config-file-globals',
    files: ['*.config.{mjs,cjs,js,ts}'],
    languageOptions: {
      globals: globals.node,
    },
  },
  ...typescriptConfig,
  prettier,
);

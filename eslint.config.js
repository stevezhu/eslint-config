// @ts-check

import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

import importConfig from './src/configs/import.js';

export default tseslint.config(
  js.configs.recommended,
  ...importConfig,
  prettier,
);

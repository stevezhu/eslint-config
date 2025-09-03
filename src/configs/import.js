import { defineConfig } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default defineConfig(
  importPlugin.flatConfigs.recommended,
  {
    name: 'import/custom',
    rules: {
      'import/enforce-node-protocol-usage': 'warn',
      'import/first': 'error',
      'import/newline-after-import': 'error',
    },
  },
  {
    name: 'simple-import-sort/custom',
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
);

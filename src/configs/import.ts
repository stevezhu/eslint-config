import { defineConfig } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export const importConfig = defineConfig({
  name: 'import/custom',
  rules: {
    'import/enforce-node-protocol-usage': ['error', 'always'],
    'import/first': 'error',
    'import/newline-after-import': 'error',
  },
});

export const simpleImportSortConfig = defineConfig({
  name: 'simple-import-sort/custom',
  plugins: {
    'simple-import-sort': simpleImportSort,
  },
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
});

export default defineConfig(
  importPlugin.flatConfigs.recommended,
  {
    name: 'import/settings',
    settings: {
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
  },
  importConfig,
  simpleImportSortConfig,
);

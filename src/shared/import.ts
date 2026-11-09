import { defineConfig } from 'eslint/config';
import { importX as importPlugin } from 'eslint-plugin-import-x';
import nodePlugin from 'eslint-plugin-n';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export const importCustom = defineConfig({
  name: 'import/custom',
  plugins: {
    'import-x': importPlugin,
    n: nodePlugin,
  },
  rules: {
    'n/prefer-node-protocol': 'error',
    'import-x/first': 'error',
    'import-x/newline-after-import': 'error',
  },
});

export const simpleImportSortCustom = defineConfig({
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
      'import-x/resolver': {
        typescript: true,
        node: true,
      },
    },
  },
  importCustom,
  simpleImportSortCustom,
);

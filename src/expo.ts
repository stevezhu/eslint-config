import { fixupConfigRules } from '@eslint/compat';
import { defineConfig } from 'eslint/config';
import expo from 'eslint-config-expo/flat.js';
import prettier from 'eslint-config-prettier';

import { importCustom, simpleImportSortCustom } from './shared/import.js';

export default {
  configs: {
    recommended: defineConfig(
      // Expo's bundled plugins still use rule APIs removed in ESLint 10.
      fixupConfigRules(expo),
      // Expo provides its own recommended import rules; add our import-x rules separately.
      importCustom,
      simpleImportSortCustom,
      prettier,
    ),
  },
};

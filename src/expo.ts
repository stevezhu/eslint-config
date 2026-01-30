import { defineConfig } from 'eslint/config';
import expo from 'eslint-config-expo/flat.js';
import prettier from 'eslint-config-prettier';

import { importCustom, simpleImportSortCustom } from './shared/import.js';

export default {
  configs: {
    recommended: defineConfig(
      expo,
      // import these separately because expo already includes the recommended import config
      importCustom,
      simpleImportSortCustom,
      prettier,
    ),
  },
};

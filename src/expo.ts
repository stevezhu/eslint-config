import { Linter } from 'eslint';
import { defineConfig } from 'eslint/config';
// @ts-expect-error - doesn't support typescript
// .js extension is required because eslint-config-expo doesn't define exports in package.json
import expo from 'eslint-config-expo/flat.js';
import prettier from 'eslint-config-prettier';

import {
  importPluginConfig,
  simpleImportSortPluginConfig,
} from './configs/import.js';

export default {
  configs: {
    recommended: defineConfig(
      expo as Linter.Config[],
      // import these separately because expo already includes the recommended import config
      importPluginConfig,
      simpleImportSortPluginConfig,
      prettier,
    ),
  },
};

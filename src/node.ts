import { defineConfig } from 'eslint/config';
import globals from 'globals';

import tsConfig from './ts.js';

export default {
  configs: {
    recommended: defineConfig(tsConfig.configs.recommended, {
      languageOptions: {
        globals: globals.node,
      },
    }),
  },
};

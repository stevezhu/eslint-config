import { defineConfig } from 'eslint/config';
import globals from 'globals';

import baseConfig from './ts.js';

export default {
  configs: {
    recommended: defineConfig(baseConfig.configs.recommended, {
      languageOptions: {
        globals: globals.node,
      },
    }),
  },
};

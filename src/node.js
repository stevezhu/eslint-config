import { defineConfig } from 'eslint/config';
import globals from 'globals';

import baseConfig from './ts.js';

export default defineConfig(...baseConfig, {
  languageOptions: {
    globals: globals.node,
  },
});

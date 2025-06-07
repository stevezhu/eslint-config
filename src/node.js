import globals from 'globals';
import tseslint from 'typescript-eslint';

import baseConfig from './ts.js';

export default tseslint.config(...baseConfig, {
  languageOptions: {
    globals: globals.node,
  },
});

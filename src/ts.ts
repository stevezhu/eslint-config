import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import prettier from 'eslint-config-prettier/flat';
import { importX as importPlugin } from 'eslint-plugin-import-x';
import globals from 'globals';

import importConfig from './shared/import.js';
import typescriptConfig, { stylisticTypeChecked } from './shared/typescript.js';

// the difference between this and the `configs/typescript.js` file is that this is the entire
// config for typescript projects, while that file is the eslint typescript config itself

export default {
  configs: {
    recommended: defineConfig(
      js.configs.recommended,
      importConfig,
      importPlugin.flatConfigs.typescript,
      {
        name: 'ts/config-file-globals',
        files: ['*.config.{js,mjs,cjs,ts,mts,cts}'],
        languageOptions: {
          globals: globals.node,
        },
      },
      typescriptConfig,
      prettier,
    ),
    stylisticTypeChecked: defineConfig(stylisticTypeChecked),
  },
};

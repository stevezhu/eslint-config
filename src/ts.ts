import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import prettier from 'eslint-config-prettier/flat';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';

import importConfig from './shared/import.js';
import typescriptConfig, { stylisticTypeChecked } from './shared/typescript.js';

// the difference between this and the `configs/typescript.js` file is that this is the entire
// config for typescript projects, while that file is the eslint typescript config itself

export default {
  configs: {
    recommended: defineConfig(
      // TODO: the name assignment can be removed in eslint 10
      // https://github.com/eslint/eslint/blob/1d1ca45370c1ed3bab3d93e480fe9c22af0bb196/packages/js/src/configs/eslint-recommended.js#L8
      Object.assign({ name: '@eslint/js/recommended' }, js.configs.recommended),
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

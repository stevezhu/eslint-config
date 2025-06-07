import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import turbo from 'eslint-plugin-turbo';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import importConfig from './configs/import.js';
import typescriptConfig from './configs/typescript.js';

export default tseslint.config(
  {
    // TODO: can't name this because ignores needs to be the only entry in order to be global
    // name: 'ts/ignores',
    ignores: ['dist/', '.wrangler/'],
  },
  turbo.configs['flat/recommended'],
  Object.assign({ name: '@eslint/js/recommended' }, js.configs.recommended),
  ...importConfig,
  {
    name: 'ts/config-file-globals',
    files: ['*.config.{cjs,js,ts}'],
    languageOptions: {
      globals: globals.node,
    },
  },
  ...typescriptConfig,
  prettier,
);

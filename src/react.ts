import react from '@eslint-react/eslint-plugin';
import eslintReactKit from '@eslint-react/kit';
import { defineConfig } from 'eslint/config';
import prettier from 'eslint-config-prettier';
import { importX as importPlugin } from 'eslint-plugin-import-x';
import reactHooks from 'eslint-plugin-react-hooks';
import { reactRefresh } from 'eslint-plugin-react-refresh';
import globals from 'globals';

import { functionComponentDefinition } from './shared/function-component-definition.js';
import tsConfig from './ts.js';

export default {
  configs: {
    recommended: defineConfig(
      tsConfig.configs.recommended,
      importPlugin.flatConfigs.react,
      {
        name: 'react/src-globals',
        files: ['**/*.{js,jsx,ts,tsx}'],
        languageOptions: {
          globals: globals.browser,
        },
      },
      react.configs['recommended-typescript'],
      eslintReactKit().use(functionComponentDefinition).getConfig(),
      reactHooks.configs.flat['recommended-latest'],
      react.configs['disable-conflict-eslint-plugin-react-hooks'],
      reactRefresh.configs.vite(),
      prettier,
    ),
    reactRefreshTanstackRouterOverride: defineConfig(
      reactRefresh.configs.vite({
        // XXX: workaround for @tanstack/react-router to suppress the error, but actually react
        // router doesn't have good support for HMR
        // References:
        // https://github.com/ArnaudBarre/eslint-plugin-react-refresh/releases/tag/v0.5.0
        // https://bsky.app/profile/arnaud-barre.bsky.social/post/3ma5h5tf2sk2e
        extraHOCs: [
          'createFileRoute',
          'createLazyFileRoute',
          'createRootRoute',
          'createRootRouteWithContext',
          'createRoute',
          'createLazyRoute',
        ],
      }),
    ),
  },
};

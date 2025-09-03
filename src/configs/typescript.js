import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig(
  ...tseslint.configs.strictTypeChecked,
  {
    name: 'typescript/languageOptions',
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
  {
    name: 'typescript/custom',
    rules: {
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowNumber: true,
        },
      ],
      // https://tanstack.com/router/v1/docs/framework/react/api/router/redirectFunction
      '@typescript-eslint/only-throw-error': [
        'warn',
        {
          allow: [
            {
              from: 'package',
              name: 'Redirect',
              package: '@tanstack/router-core',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.{cjs,js}'],
    extends: [tseslint.configs.disableTypeChecked],
  },
);

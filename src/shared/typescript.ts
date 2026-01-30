import { defineConfig } from 'eslint/config';
import { configs as tseslintConfigs } from 'typescript-eslint';

export const stylisticTypeChecked = defineConfig(
  tseslintConfigs.stylisticTypeChecked,
);

export default defineConfig(
  tseslintConfigs.strictTypeChecked,
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
    files: ['**/*.{ts,tsx,mts,cts}'],
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
    files: ['**/*.{js,jsx,mjs,cjs}'],
    ...tseslintConfigs.disableTypeChecked,
  },
);

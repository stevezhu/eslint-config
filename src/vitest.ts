import vitest from '@vitest/eslint-plugin';
import { Linter } from 'eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig(
  // XXX: temp fix for https://github.com/vitest-dev/eslint-plugin-vitest/issues/771
  vitest.configs.recommended as unknown as Linter.Config[],
  {
    name: 'custom/vitest',
    files: ['**/*.test.{ts,tsx}'],
    rules: {
      'vitest/consistent-test-it': [
        'error',
        {
          fn: 'test',
          withinDescribe: 'test',
        },
      ],
      'vitest/no-focused-tests': 'error',
      'vitest/no-disabled-tests': 'error',
      'vitest/prefer-lowercase-title': [
        'warn',
        {
          ignoreTopLevelDescribe: true,
        },
      ],
      // Disable certain strict typescript eslint rules for tests
      // https://github.com/vitest-dev/vitest/issues/4543#issuecomment-1824881253
      '@typescript-eslint/no-unsafe-assignment': 'off',
    },
  },
);

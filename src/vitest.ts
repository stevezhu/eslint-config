import vitest from '@vitest/eslint-plugin';
import { defineConfig } from 'eslint/config';

export default {
  configs: {
    recommended: defineConfig(vitest.configs.recommended, {
      name: 'vitest/custom',
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
    }),
  },
};

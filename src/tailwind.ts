import { defineConfig } from 'eslint/config';
import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss';

export default defineConfig({
  files: ['**/*.tsx'],
  plugins: {
    'better-tailwindcss': eslintPluginBetterTailwindcss,
  },
  rules: {
    ...eslintPluginBetterTailwindcss.configs['recommended-error']?.rules,
    'better-tailwindcss/no-deprecated-classes': 'warn',
  },
});

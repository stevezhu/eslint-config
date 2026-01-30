import { defineConfig } from 'eslint/config';
import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss';

export default {
  configs: {
    recommended: defineConfig({
      files: ['**/*.{ts,tsx}'],
      extends: [eslintPluginBetterTailwindcss.configs['recommended']],
    }),
  },
};

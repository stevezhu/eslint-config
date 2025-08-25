import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss';
import tseslint from 'typescript-eslint';

export default tseslint.config({
  files: ['**/*.{jsx,tsx}'],
  plugins: {
    'better-tailwindcss': eslintPluginBetterTailwindcss,
  },
  rules: {
    ...eslintPluginBetterTailwindcss.configs['recommended-error'].rules,
    'better-tailwindcss/no-deprecated-classes': 'warn',
  },
});

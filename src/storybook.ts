import { defineConfig } from 'eslint/config';
import storybook from 'eslint-plugin-storybook';

export default {
  configs: {
    recommended: defineConfig(storybook.configs['flat/recommended']),
  },
};

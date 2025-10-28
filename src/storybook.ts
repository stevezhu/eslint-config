import { defineConfig } from 'eslint/config';
import { configs as storybookConfigs } from 'eslint-plugin-storybook';

export default {
  configs: {
    recommended: defineConfig(
      storybookConfigs['flat/recommended'] as Parameters<
        typeof defineConfig
      >[0],
    ),
  },
};

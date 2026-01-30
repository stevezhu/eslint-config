import { Config, defineConfig, globalIgnores } from 'eslint/config';
import { configs as storybookConfigs } from 'eslint-plugin-storybook';

export default {
  configs: {
    recommended: defineConfig(
      globalIgnores(['!.storybook'], 'Include Storybook Directory'),
      // XXX: https://github.com/storybookjs/storybook/issues/32405#issuecomment-3373223565
      storybookConfigs['flat/recommended'] as Config,
    ),
  },
};

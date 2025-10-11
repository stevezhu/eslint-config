import { defineConfig } from 'eslint/config';
import { configs as turboConfigs } from 'eslint-plugin-turbo';

export default {
  configs: {
    recommended: defineConfig(turboConfigs['flat/recommended']),
  },
};

import { defineConfig } from 'eslint/config';
import turboConfig from 'eslint-config-turbo/flat';

export default {
  configs: {
    recommended: defineConfig(turboConfig),
  },
};

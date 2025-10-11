import { defineConfig } from 'eslint/config';
import pluginLingui from 'eslint-plugin-lingui';

export default {
  configs: {
    recommended: defineConfig(pluginLingui.configs['flat/recommended']),
  },
};

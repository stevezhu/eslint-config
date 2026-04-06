import { defineConfig } from 'eslint/config';
import nodePlugin from 'eslint-plugin-n';

export default {
  configs: {
    fileExtensionInImport: defineConfig({
      plugins: {
        n: nodePlugin,
      },
      rules: {
        'n/no-missing-import': 'error',
        'n/file-extension-in-import': ['error', 'always'],
      },
    }),
  },
};

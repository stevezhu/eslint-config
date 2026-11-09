import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/*.ts'],
  format: {
    esm: {},
    cjs: {
      // ESLint React only exposes ESM entry points; bundle them for our CommonJS export.
      deps: {
        alwaysBundle: (id) =>
          ['@eslint-react/eslint-plugin', '@eslint-react/kit'].includes(id),
        onlyBundle: false,
        skipNodeModulesBundle: false,
      },
    },
  },
  dts: true,
  sourcemap: true,
});

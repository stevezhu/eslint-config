import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/*.ts'],
  format: {
    esm: {},
    cjs: {
      // ESLint React only exposes ESM entry points; bundle it for our CommonJS export.
      deps: {
        alwaysBundle: (id) => id === '@eslint-react/eslint-plugin',
        onlyBundle: false,
        skipNodeModulesBundle: false,
      },
    },
  },
  dts: true,
  sourcemap: true,
});

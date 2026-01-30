import { defineConfig, globalIgnores } from 'eslint/config';

import ts from './src/ts.js';
import vitest from './src/vitest.js';

export default defineConfig(
  globalIgnores(['dist/'], 'Ignore dist directory'),
  ts.configs.recommended,
  vitest.configs.recommended,
);

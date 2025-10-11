import { defineConfig, globalIgnores } from 'eslint/config';

import ts from './src/ts.js';

export default defineConfig(globalIgnores(['dist/']), ts.configs.recommended);

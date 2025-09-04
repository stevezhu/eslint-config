import { defineConfig } from 'eslint/config';
// @ts-expect-error - doesn't support typescript
import expo from 'eslint-config-expo/flat';
import prettier from 'eslint-config-prettier';

import importConfig from './configs/import.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
export default defineConfig(expo, importConfig, prettier);

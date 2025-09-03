import { defineConfig } from 'eslint/config';
import expo from 'eslint-config-expo/flat.js';
import prettier from 'eslint-config-prettier';

import importConfig from './configs/import.js';

export default defineConfig(...expo, ...importConfig, prettier);

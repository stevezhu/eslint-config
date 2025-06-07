import expo from 'eslint-config-expo/flat.js';
import prettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

import importConfig from './configs/import.js';

export default tseslint.config(...expo, ...importConfig, prettier);

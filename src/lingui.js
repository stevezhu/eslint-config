import { defineConfig } from 'eslint/config';
import pluginLingui from 'eslint-plugin-lingui';

export default defineConfig(pluginLingui.configs['flat/recommended']);

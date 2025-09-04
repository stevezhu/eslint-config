import { defineConfig } from 'eslint/config';
import { configs as turboConfigs } from 'eslint-plugin-turbo';

export default defineConfig(turboConfigs['flat/recommended']);

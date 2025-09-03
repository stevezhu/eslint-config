import { defineConfig } from 'eslint/config';
import turbo from 'eslint-plugin-turbo';

export default defineConfig(turbo.configs['flat/recommended']);

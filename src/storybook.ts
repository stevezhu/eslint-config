import { defineConfig } from 'eslint/config';
import storybook from 'eslint-plugin-storybook';

export default defineConfig(storybook.default.configs['flat/recommended']);

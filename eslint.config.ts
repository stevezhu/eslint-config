// @ts-check

import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import prettier from 'eslint-config-prettier';

import importConfig from './src/configs/import.js';

export default defineConfig(js.configs.recommended, ...importConfig, prettier);

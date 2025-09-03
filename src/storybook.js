import { defineConfig } from 'eslint/config';
// TODO: add dist import because package.json of this package exports the cjs build
// check if this is fixed once https://github.com/storybookjs/storybook/pull/32064 lands in storybook 10
import storybook from 'eslint-plugin-storybook/dist';

export default defineConfig(...storybook.configs['flat/recommended']);

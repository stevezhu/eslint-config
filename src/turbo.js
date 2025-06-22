import turbo from 'eslint-plugin-turbo';
import tseslint from 'typescript-eslint';

export default tseslint.config(turbo.configs['flat/recommended']);

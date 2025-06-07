import pluginLingui from 'eslint-plugin-lingui';
import tseslint from 'typescript-eslint';

export default tseslint.config(pluginLingui.configs['flat/recommended']);

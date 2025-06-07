# @stzhu/eslint-config

## Usage

Install:

```
pnpm i -D @stzhu/eslint-config
```

Create a `eslint.config.js` with the following config:

```javascript
// @ts-check

import { defineConfig } from '@internal/eslint-config';
import tsConfig from '@internal/eslint-config/ts';

export default defineConfig(
  // select from one of the configs below
  ...tsConfig,
);
```

### Shareable Configs

Import one of the following required main configs depending on the project type.

- `@internal/eslint-config/ts`: Typescript Project
- `@internal/eslint-config/react`: React Project

Import any of the following optional configs depending on usage.

- `@internal/eslint-config/vitest`
- `@internal/eslint-config/storybook`

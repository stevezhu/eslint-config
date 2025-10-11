# @stzhu/eslint-config

A collection of ESLint configurations for TypeScript and React projects. This package provides a set of pre-configured ESLint rules that follow best practices and common coding standards.

## Requirements

- ESLint v9 or higher
- TypeScript v5 or higher (optional, but recommended for TypeScript projects)
- Tailwind CSS v4 or higher (optional, required for tailwind config)

## Installation

```bash
pnpm i -D eslint @stzhu/eslint-config
```

For projects using specific configurations, you may need additional peer dependencies:

- **Tailwind config**: Requires `tailwindcss` and `postcss`
- **TypeScript projects**: Requires `typescript`

```bash
# For TypeScript projects
pnpm i -D typescript

# For Tailwind projects
pnpm i -D tailwindcss postcss
```

## Usage

Create an `eslint.config.js` (or `eslint.config.ts` for TypeScript projects) file in your project root:

```javascript
// @ts-check

import ts from '@stzhu/eslint-config/ts';
import { defineConfig } from 'eslint/config';

export default defineConfig(
  // select from one of the configs below
  ts.configs.recommended,
);
```

## Available Configurations

### Main Configs

Choose one of these based on your project type:

- `@stzhu/eslint-config/ts`: TypeScript project configuration
- `@stzhu/eslint-config/react`: React project configuration
- `@stzhu/eslint-config/node`: Node.js project configuration
- `@stzhu/eslint-config/expo`: Expo/React Native project configuration

> **Note**: The React config automatically extends the TypeScript config, so you don't need to include both. Similarly, the Expo config includes its own base configuration.

### Optional Configs

Add these as needed:

- `@stzhu/eslint-config/vitest`: Vitest testing configuration (applies to `**/*.test.{ts,tsx}` files)
- `@stzhu/eslint-config/storybook`: Storybook configuration
- `@stzhu/eslint-config/tailwind`: Tailwind CSS configuration (applies to `**/*.tsx` files only)
- `@stzhu/eslint-config/turbo`: Turborepo monorepo configuration
- `@stzhu/eslint-config/lingui`: Lingui internationalization configuration
- `@stzhu/eslint-config/import`: Extra import configurations

## Example Configurations

### TypeScript Project

```javascript
import ts from '@stzhu/eslint-config/ts';
import { defineConfig } from 'eslint/config';

export default defineConfig(ts.configs.recommended);
```

### React Project

```javascript
import react from '@stzhu/eslint-config/react';
import { defineConfig } from 'eslint/config';

export default defineConfig();
```

### React Project with Testing

```javascript
import react from '@stzhu/eslint-config/react';
import vitest from '@stzhu/eslint-config/vitest';
import { defineConfig } from 'eslint/config';

export default defineConfig(
  react.configs.recommended,
  vitest.configs.recommended,
);
```

### Expo Project with Tailwind

```javascript
import expo from '@stzhu/eslint-config/expo';
import tailwind from '@stzhu/eslint-config/tailwind';
import { defineConfig } from 'eslint/config';

export default defineConfig(
  expo.configs.recommended,
  tailwind.configs.recommended,
);
```

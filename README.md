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

import { defineConfig } from '@stzhu/eslint-config';
import tsConfig from '@stzhu/eslint-config/ts';

export default defineConfig(
  // select from one of the configs below
  ...tsConfig,
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

## Example Configurations

### TypeScript Project

```javascript
import { defineConfig } from '@stzhu/eslint-config';
import tsConfig from '@stzhu/eslint-config/ts';

export default defineConfig(...tsConfig);
```

### React Project

```javascript
import { defineConfig } from '@stzhu/eslint-config';
import reactConfig from '@stzhu/eslint-config/react';

export default defineConfig(...reactConfig);
```

### React Project with Testing

```javascript
import { defineConfig } from '@stzhu/eslint-config';
import reactConfig from '@stzhu/eslint-config/react';
import vitestConfig from '@stzhu/eslint-config/vitest';

export default defineConfig(...reactConfig, ...vitestConfig);
```

### Expo Project with Tailwind

```javascript
import { defineConfig } from '@stzhu/eslint-config';
import expoConfig from '@stzhu/eslint-config/expo';
import tailwindConfig from '@stzhu/eslint-config/tailwind';

export default defineConfig(...expoConfig, ...tailwindConfig);
```

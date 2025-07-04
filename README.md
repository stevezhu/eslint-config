# @stzhu/eslint-config

A collection of ESLint configurations for TypeScript and React projects. This package provides a set of pre-configured ESLint rules that follow best practices and common coding standards.

## Installation

```bash
pnpm i -D eslint @stzhu/eslint-config
```

## Usage

Create an `eslint.config.js` file in your project root:

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

### Optional Configs

Add these as needed:

- `@stzhu/eslint-config/vitest`: Vitest testing configuration
- `@stzhu/eslint-config/storybook`: Storybook configuration
- `@stzhu/eslint-config/tailwind`: Tailwind CSS configuration
- `@stzhu/eslint-config/turbo`: Turborepo monorepo
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

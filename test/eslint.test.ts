import { ESLint } from 'eslint';
import { expect, test } from 'vitest';

import expo from '../src/expo.js';
import lingui from '../src/lingui.js';
import node from '../src/node.js';
import react from '../src/react.js';
import storybook from '../src/storybook.js';
import tailwind from '../src/tailwind.js';
import ts from '../src/ts.js';
import turbo from '../src/turbo.js';
import vitest from '../src/vitest.js';

test.each([
  [expo, 'expo'],
  [lingui, 'lingui'],
  [node, 'node'],
  [react, 'react'],
  [storybook, 'storybook'],
  [tailwind, 'tailwind'],
  [ts, 'ts'],
  [turbo, 'turbo'],
  [vitest, 'vitest'],
])('eslint uses $1 config without error', async (overrideConfig, _) => {
  const eslint = new ESLint({
    overrideConfigFile: true,
    overrideConfig,
  });
  const results = await eslint.lintText('');
  expect(results.length).toBe(1);
  expect(results[0]?.errorCount).toBe(0);
  expect(results[0]?.warningCount).toBe(0);
});

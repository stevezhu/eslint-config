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
  [expo.configs.recommended, 'expo'],
  [lingui.configs.recommended, 'lingui'],
  [node.configs.recommended, 'node'],
  [react.configs.recommended, 'react'],
  [storybook.configs.recommended, 'storybook'],
  [tailwind.configs.recommended, 'tailwind'],
  [ts.configs.recommended, 'ts'],
  [turbo.configs.recommended, 'turbo'],
  [vitest.configs.recommended, 'vitest'],
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

test('react reports missing JSX keys with the automatic JSX runtime', async () => {
  const eslint = new ESLint({
    overrideConfigFile: true,
    overrideConfig: react.configs.recommended,
  });
  const [result] = await eslint.lintText(
    'export default function Example() { return [1, 2].map(value => <div>{value}</div>); }',
    { filePath: 'test/example.jsx' },
  );

  expect(result?.fatalErrorCount).toBe(0);
  expect(result?.errorCount).toBe(1);
  expect(result?.warningCount).toBe(0);
  expect(result?.messages.map((message) => message.ruleId)).toEqual([
    '@eslint-react/no-missing-key',
  ]);
});

test('react reports a conditional Hook once', async () => {
  const eslint = new ESLint({
    overrideConfigFile: true,
    overrideConfig: [
      ...react.configs.recommended,
      { settings: { 'import-x/core-modules': ['react'] } },
    ],
  });
  const [result] = await eslint.lintText(
    `import { useState } from 'react';

export default function Example({ enabled }) {
  if (enabled) {
    const [count] = useState(0);
    return <div>{count}</div>;
  }
  return <div />;
}`,
    { filePath: 'test/example.jsx' },
  );

  expect(result?.fatalErrorCount).toBe(0);
  expect(result?.errorCount).toBe(1);
  expect(result?.warningCount).toBe(0);
  expect(result?.messages.map((message) => message.ruleId)).toEqual([
    '@eslint-react/rules-of-hooks',
  ]);
});

test.each([
  [ts.configs.recommended, 'ts'],
  [node.configs.recommended, 'node'],
  [react.configs.recommended, 'react'],
  [expo.configs.recommended, 'expo'],
])(
  'eslint enforces node: imports with $1 config',
  async (overrideConfig, _) => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig,
    });
    const [result] = await eslint.lintText("export { readFile } from 'fs';");

    expect(result?.fatalErrorCount).toBe(0);
    expect(result?.errorCount).toBe(1);
    expect(result?.messages.map((message) => message.ruleId)).toContain(
      'n/prefer-node-protocol',
    );

    const [valid] = await eslint.lintText(
      "export { readFile } from 'node:fs';",
    );
    expect(valid?.messages).toEqual([]);
  },
);

test('import-x resolves local TypeScript files with .js specifiers', async () => {
  const eslint = new ESLint({
    overrideConfigFile: true,
    overrideConfig: ts.configs.recommended,
  });
  const [result] = await eslint.lintText(
    "export { default } from '../src/ts.js';",
    { filePath: 'test/eslint.test.ts' },
  );

  expect(result?.messages).toEqual([]);
});

test('import-x reports unresolved imports', async () => {
  const eslint = new ESLint({
    overrideConfigFile: true,
    overrideConfig: ts.configs.recommended,
  });
  const [result] = await eslint.lintText(
    "export { default } from './missing-module.js';",
    { filePath: 'test/eslint.test.ts' },
  );

  expect(result?.fatalErrorCount).toBe(0);
  expect(result?.errorCount).toBe(1);
  expect(result?.warningCount).toBe(0);
  expect(result?.messages.map((message) => message.ruleId)).toEqual([
    'import-x/no-unresolved',
  ]);
});

test.each([
  [ts.configs.recommended, 'ts'],
  [node.configs.recommended, 'node'],
  [react.configs.recommended, 'react'],
  [expo.configs.recommended, 'expo'],
])(
  'custom import rules reject violations with $1 config',
  async (overrideConfig, _) => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig,
    });

    for (const [source, ruleId] of [
      ["export const value = 1;\nimport 'node:fs';", 'import-x/first'],
      [
        "import 'node:fs';\nexport const value = 1;",
        'import-x/newline-after-import',
      ],
    ] as const) {
      const [result] = await eslint.lintText(source, {
        filePath: 'test/example.js',
      });

      expect(result?.fatalErrorCount).toBe(0);
      expect(result?.errorCount).toBe(1);
      expect(
        result?.messages
          .filter((message) => message.severity === 2)
          .map((message) => message.ruleId),
      ).toEqual([ruleId]);
    }

    const [valid] = await eslint.lintText(
      "import 'node:fs';\n\nexport const value = 1;",
      { filePath: 'test/example.js' },
    );
    expect(valid?.messages).toEqual([]);
  },
);

test('react accepts JSX with keys and Hooks at the top level', async () => {
  const eslint = new ESLint({
    overrideConfigFile: true,
    overrideConfig: [
      ...react.configs.recommended,
      { settings: { 'import-x/core-modules': ['react'] } },
    ],
  });
  const [result] = await eslint.lintText(
    `import { useState } from 'react';

export default function Example() {
  const [count] = useState(0);
  return [1, 2].map(value => <div key={value}>{value + count}</div>);
}`,
    { filePath: 'test/example.jsx' },
  );

  expect(result?.messages).toEqual([]);
});

test('react DOM violations are errors while advisory rules remain warnings', async () => {
  const eslint = new ESLint({
    overrideConfigFile: true,
    overrideConfig: react.configs.recommended,
  });
  const [result] = await eslint.lintText(
    'export default function Example() { return <div dangerouslySetInnerHTML={{ __html: "text" }}>child</div>; }',
    { filePath: 'test/example.jsx' },
  );

  expect(result?.fatalErrorCount).toBe(0);
  expect(result?.errorCount).toBe(1);
  expect(result?.warningCount).toBe(1);
  expect(result?.messages).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        ruleId: '@eslint-react/dom-no-dangerously-set-innerhtml-with-children',
        severity: 2,
      }),
      expect.objectContaining({
        ruleId: '@eslint-react/dom-no-dangerously-set-innerhtml',
        severity: 1,
      }),
    ]),
  );

  const [valid] = await eslint.lintText(
    'export default function Example() { return <div>child</div>; }',
    { filePath: 'test/example.jsx' },
  );
  expect(valid?.messages).toEqual([]);
});

test('react Refresh still rejects mixed component and value exports', async () => {
  const eslint = new ESLint({
    overrideConfigFile: true,
    overrideConfig: react.configs.recommended,
  });
  const [result] = await eslint.lintText(
    'export const value = Date.now();\nexport default function Example() { return <div />; }',
    { filePath: 'test/example.jsx' },
  );

  expect(result?.fatalErrorCount).toBe(0);
  expect(result?.errorCount).toBe(1);
  expect(result?.warningCount).toBe(0);
  expect(result?.messages.map((message) => message.ruleId)).toEqual([
    'react-refresh/only-export-components',
  ]);

  const [valid] = await eslint.lintText(
    'export default function Example() { return <div />; }',
    { filePath: 'test/example.jsx' },
  );
  expect(valid?.messages).toEqual([]);
});

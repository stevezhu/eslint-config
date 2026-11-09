import eslintReactKit from '@eslint-react/kit';
import parser from '@typescript-eslint/parser';
import { ESLint } from 'eslint';
import { expect, test } from 'vitest';

import react from '../src/react.js';
import { functionComponentDefinition } from '../src/shared/function-component-definition.js';

const ruleId = '@eslint-react/kit/function-component-definition';
const config = {
  ...eslintReactKit().use(functionComponentDefinition).getConfig(),
  languageOptions: { parser },
};
const eslint = new ESLint({
  overrideConfigFile: true,
  overrideConfig: config,
});
const autofix = new ESLint({
  overrideConfigFile: true,
  overrideConfig: config,
  fix: true,
});
const options = { filePath: 'component.tsx' };

test.each([
  ['named declaration', 'export function Example() { return <div />; }'],
  [
    'default declaration',
    'export default function Example() { return <div />; }',
  ],
  ['anonymous function', 'export default function() { return <div />; }'],
  ['non-component helper', 'const getValue = () => 1;'],
  [
    'render callback',
    'function Example() { return [1, 2].map(value => <div key={value}>{value}</div>); }',
  ],
  ['object method', 'const views = { Example() { return <div />; } };'],
])('accepts %s', async (_, code) => {
  const [result] = await eslint.lintText(code, options);
  expect(result?.messages).toEqual([]);
});

test.each([
  {
    name: 'named arrow with an expression body',
    code: 'export const Example = () => <div />;',
    output: 'export function Example() { return <div />; }',
  },
  {
    name: 'named arrow with a block body',
    code: 'export const Example = () => { return <div />; };',
    output: 'export function Example() { return <div />; }',
  },
  {
    name: 'anonymous function expression bound to a name',
    code: 'export const Example = function() { return <div />; };',
    output: 'export function Example() { return <div />; }',
  },
  {
    name: 'separate default export',
    code: 'const Example = () => <div />;\nexport default Example;',
    output: 'function Example() { return <div />; }\nexport default Example;',
  },
  {
    name: 'anonymous default export',
    code: 'export default () => <div />;',
    output: 'export default function() { return <div />; };',
  },
  {
    name: 'anonymous memo callback',
    code: 'const Example = memo(() => <div />);',
    output: 'const Example = memo(function() { return <div />; });',
  },
  {
    name: 'generic parameters, parameter types, and return type',
    code: 'export const Example = <T,>({ value }: { value: T }): JSX.Element => <div>{String(value)}</div>;',
    output:
      'export function Example<T,>({ value }: { value: T }): JSX.Element { return <div>{String(value)}</div>; }',
  },
  {
    name: 'async signature',
    code: 'export const Example = async ({ value }: { value: number }): Promise<JSX.Element> => { await Promise.resolve(); return <div>{value}</div>; };',
    output:
      'export async function Example({ value }: { value: number }): Promise<JSX.Element> { await Promise.resolve(); return <div>{value}</div>; }',
  },
  {
    name: 'TypeScript suppression comments between parameters',
    code: `export const Example = (
  props: { value: string },
  // @ts-expect-error legacy context
  context
) => <div>{props.value}{String(context)}</div>;`,
    output: `export function Example(props: { value: string },
  // @ts-expect-error legacy context
  context) { return <div>{props.value}{String(context)}</div>; }`,
  },
])('reports and fixes $name', async ({ code, output }) => {
  const [before] = await eslint.lintText(code, options);
  expect(before?.fatalErrorCount).toBe(0);
  expect(before?.errorCount).toBe(1);
  expect(before?.messages).toEqual([
    expect.objectContaining({ ruleId, severity: 2 }),
  ]);

  const suggestions = before?.messages[0]?.suggestions;
  expect(suggestions).toHaveLength(1);
  const fix = suggestions?.[0]?.fix;
  const suggested =
    fix && code.slice(0, fix.range[0]) + fix.text + code.slice(fix.range[1]);
  expect(suggested).toBe(output);

  const [after] = await autofix.lintText(code, options);
  expect(after?.output).toBe(output);
  expect(after?.messages).toEqual([]);
});

test.each([
  ['typed binding', 'const Example: () => JSX.Element = () => <div />;'],
  ['multiple bindings', 'const Example = () => <div />, value = 1;'],
  [
    'named function expression',
    'const Example = function Inner() { return <div />; };',
  ],
  ['generator function', 'const Example = function*() { return <div />; };'],
  ['lexical this', 'const Example = () => <div>{this.value}</div>;'],
  [
    'lexical arguments',
    'function factory() { const Example = () => <div>{arguments[0]}</div>; return Example; }',
  ],
  [
    'lexical new.target',
    'function factory() { const Example = () => <div>{new.target}</div>; return Example; }',
  ],
  [
    'for-loop binding',
    'for (let Example = () => <div />; false;) { void Example; }',
  ],
])('reports %s without an unsafe fix', async (_, code) => {
  const [result] = await autofix.lintText(code, options);
  expect(result?.fatalErrorCount).toBe(0);
  expect(result?.errorCount).toBe(1);
  expect(result?.messages).toEqual([
    expect.objectContaining({ ruleId, severity: 2 }),
  ]);
  expect(result?.messages[0]?.fix).toBeUndefined();
  expect(result?.messages[0]?.suggestions).toBeUndefined();
  expect(result?.output).toBeUndefined();
});

test('react preset enables the rule as an error with an autofix', async () => {
  const reactESLint = new ESLint({
    overrideConfigFile: true,
    overrideConfig: react.configs.recommended,
  });
  const [result] = await reactESLint.lintText(
    'export const Example = () => <div />;',
    { filePath: 'component.jsx' },
  );

  expect(result?.fatalErrorCount).toBe(0);
  expect(result?.errorCount).toBe(1);
  expect(result?.messages).toEqual([
    expect.objectContaining({
      ruleId,
      severity: 2,
      fix: expect.objectContaining({
        text: 'function Example() { return <div />; }',
      }),
    }),
  ]);
});

import {
  merge,
  type RuleFix,
  type RuleFixer,
  type RuleFunction,
} from '@eslint-react/kit';
import { AST_NODE_TYPES, type TSESTree } from '@typescript-eslint/types';

type RuleContext = Parameters<RuleFunction>[0];

// Adapted from https://eslint-react.xyz/docs/recipes/function-component-definition
// to preserve the previous namedComponents: 'function-declaration' configuration.
export function functionComponentDefinition(): RuleFunction {
  return (context, { collect, hint }) => {
    const { query, visitor } = collect.components(context, {
      hint:
        hint.component.Default |
        hint.component.DoNotIncludeFunctionDefinedAsObjectMethod,
    });

    return merge(visitor, {
      'Program:exit'(program) {
        for (const { node } of query.all(program)) {
          if (node.type === AST_NODE_TYPES.FunctionDeclaration) continue;
          const named = node.parent.type === AST_NODE_TYPES.VariableDeclarator;
          if (!named && node.type === AST_NODE_TYPES.FunctionExpression)
            continue;

          const fix = buildFix(context, node);

          context.report({
            node,
            message: named
              ? 'Named function components must be defined with function declarations.'
              : 'Anonymous function components must be defined with function expressions.',
            fix,
            suggest: [
              {
                desc: named
                  ? 'Convert to function declaration.'
                  : 'Convert to function expression.',
                fix,
              },
            ],
          });
        }
      },
    });
  };
}

/** Build the recipe's fix in the direction of the existing function style. */
function buildFix(
  context: RuleContext,
  node: TSESTree.ArrowFunctionExpression | TSESTree.FunctionExpression,
) {
  return (fixer: RuleFixer): RuleFix | null => {
    const src = context.sourceCode;
    // Keep generator behavior and named function-expression bindings intact.
    if (
      node.type === AST_NODE_TYPES.FunctionExpression &&
      (node.generator || node.id != null)
    ) {
      return null;
    }
    // Converting an arrow must not change its lexical this/arguments/super/new.target.
    if (
      node.type === AST_NODE_TYPES.ArrowFunctionExpression &&
      src
        .getTokens(node)
        .some(
          (token, index, tokens) =>
            ['this', 'arguments', 'super'].includes(token.value) ||
            (token.value === 'target' &&
              tokens[index - 1]?.value === '.' &&
              tokens[index - 2]?.value === 'new'),
        )
    ) {
      return null;
    }

    const prefix = node.async ? 'async ' : '';
    const typeParams =
      node.typeParameters != null ? src.getText(node.typeParameters) : '';
    const params = `(${node.params.map((param) => src.getText(param)).join(', ')})`;
    const returnType =
      node.returnType != null ? src.getText(node.returnType) : '';
    const body =
      node.body.type === AST_NODE_TYPES.BlockStatement
        ? src.getText(node.body)
        : `{ return ${src.getText(node.body)}; }`;

    // Replace the declaration, leaving an enclosing `export` in place.
    if (node.parent.type === AST_NODE_TYPES.VariableDeclarator) {
      const declarator = node.parent;
      const declaration = declarator.parent;
      if (
        declarator.id.type !== AST_NODE_TYPES.Identifier ||
        declarator.id.typeAnnotation != null ||
        declaration.declarations.length !== 1 ||
        ![
          AST_NODE_TYPES.Program,
          AST_NODE_TYPES.BlockStatement,
          AST_NODE_TYPES.ExportNamedDeclaration,
        ].includes(declaration.parent.type)
      ) {
        return null;
      }

      return fixer.replaceText(
        declaration,
        `${prefix}function ${declarator.id.name}${typeParams}${params}${returnType} ${body}`,
      );
    }

    // Anonymous callbacks/default exports cannot become named declarations.
    if (node.type === AST_NODE_TYPES.ArrowFunctionExpression) {
      return fixer.replaceText(
        node,
        `${prefix}function${typeParams}${params}${returnType} ${body}`,
      );
    }

    return null;
  };
}

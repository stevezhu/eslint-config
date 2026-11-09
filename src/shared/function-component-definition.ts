import { merge, type RuleFunction } from '@eslint-react/kit';
import { AST_NODE_TYPES } from '@typescript-eslint/types';

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
          const named =
            node.type === AST_NODE_TYPES.FunctionDeclaration ||
            node.parent.type === AST_NODE_TYPES.VariableDeclarator;
          const expectedType = named
            ? AST_NODE_TYPES.FunctionDeclaration
            : AST_NODE_TYPES.FunctionExpression;
          if (node.type === expectedType) continue;

          context.report({
            node,
            message: named
              ? 'Named function components must be defined with function declarations.'
              : 'Anonymous function components must be defined with function expressions.',
          });
        }
      },
    });
  };
}

// @ts-check

import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'eslint/config'
import { includeIgnoreFile } from '@eslint/compat'
import eslint from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import tseslint from 'typescript-eslint'

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url))

export default defineConfig(
  includeIgnoreFile(gitignorePath),
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  stylistic.configs.recommended,
  {
    languageOptions: {
      /** @type {import('@typescript-eslint/parser').ParserOptions} */
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/consistent-type-imports': ['error', {
        disallowTypeAnnotations: true,
        fixStyle: 'inline-type-imports',
        prefer: 'type-imports',
      }],
      '@typescript-eslint/no-empty-object-type': ['off'],
      '@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: true }],
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/no-wrapper-object-types': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/new-parens': 'off',
      '@stylistic/no-extra-semi': 'error',
      '@stylistic/no-extra-parens': ['error', 'all', { conditionalAssign: false }],
      '@stylistic/no-mixed-operators': 'off',
      '@stylistic/generator-star-spacing': ['error', {
        before: false,
        after: true,
        anonymous: 'neither',
        method: { before: true, after: false },
      }],
      '@stylistic/operator-linebreak': ['error', 'before', { overrides: { '=': 'after', '?': 'after', ':': 'after' } }],
      '@stylistic/indent': ['error', 2, { ignoredNodes: ['ConditionalExpression', 'TSConditionalType'] }],
    },
  },
)

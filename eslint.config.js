import js from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import vue from 'eslint-plugin-vue'
import prettier from 'eslint-config-prettier/flat'
import oxlint from 'eslint-plugin-oxlint'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import globals from "globals"

export default [
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '.vite/**',
    ],
  },

  // Browser globals (window, document, etc.)
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  js.configs.recommended,
  ...vue.configs['flat/essential'],
  ...oxlint.configs['flat/recommended'],
  prettier,

  // TypeScript support
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-empty-interface': 'error',
    },
  },

  // Vue + JS/TS parser
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx,vue}'],
    languageOptions: {
      parser: vue.parser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.node, // vervangt jouw oude env: { node: true }
      },
    },
    plugins: {
      vue,
      oxlint,
    },
  },

  // Extra rules (Flat Config style)
  {
    rules: {
      camelcase: ['error', { ignoreDestructuring: true }],
    },
  },
]

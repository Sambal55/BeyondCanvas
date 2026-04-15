import js from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import vue from 'eslint-plugin-vue'
import prettier from 'eslint-config-prettier/flat'
import oxlint from 'eslint-plugin-oxlint'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import globals from "globals"
export default [
  {
    ignores: ['dist/**'],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  js.configs.recommended, // FIXED
  ...vue.configs['flat/essential'], // FIXED
  ...oxlint.configs['flat/recommended'], // FIXED
  prettier, // FIXED

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

  {
    files: ['**/*.{js,mjs,cjs,ts,tsx,vue}'],
    languageOptions: {
      parser: vue.parser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      vue,
      oxlint,
    },
  },

  {
    rules: {
      camelcase: ['error', { ignoreDestructuring: true }],
    },
    env: {
      node: true,
    }
  },

]

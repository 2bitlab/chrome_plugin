/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

// const { resolve } = require('path')
const DOMGlobals = ['window', 'document']
const NodeGlobals = ['module', 'require']

module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
    'vue/setup-compiler-macros': true
  },
  extends: [
    'plugin:markdown/recommended',
    'plugin:json/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    vueFeatures: {
      filter: true,
      interpolationAsNonHTML: false
    }
  },
  plugins: ['vue', 'prettier', '@typescript-eslint'],
  rules: {
    'no-unused-vars': [
      'error',
      // we are only using this rule to check for unused arguments since TS
      // catches unused variables but not args.
      { varsIgnorePattern: '.*', args: 'none' }
    ],
    // most of the codebase are expected to be env agnostic
    'no-restricted-globals': ['error', ...DOMGlobals, ...NodeGlobals],
    // since we target ES2015 for baseline support, we need to forbid object
    // rest spread usage (both assign and destructure)
    'no-restricted-syntax': [
      'error',
      'ObjectExpression > SpreadElement',
      'ObjectPattern > RestElement',
      'AwaitExpression'
    ],
    'no-restricted-imports': [
      'error',
      {
        paths: [
          'vue',
          '@vue/composition-api',
          '..',
          '../..',
          // resolve(__dirname, 'packages/core/index.ts'),
          {
            name: 'vue-demi',
            importNames: ['onMounted', 'onUnmounted'],
            message: 'Use tryOnMounted and tryOnScopeDispose instead.'
          }
        ]
      }
    ]
  }
}

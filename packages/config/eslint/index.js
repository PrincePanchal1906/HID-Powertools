/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended-type-checked',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-explicit-any':           'error',
    '@typescript-eslint/no-unused-vars':            ['error', { 
      argsIgnorePattern: '^_' 
    }],
    '@typescript-eslint/consistent-type-imports':   ['error', {
      prefer: 'type-imports'
    }],
    '@typescript-eslint/no-floating-promises':      'error',
    '@typescript-eslint/no-misused-promises':       'error',
    'no-console':                                   ['warn', { 
      allow: ['warn', 'error'] 
    }],
    'prefer-const':                                 'error',
  },
  ignorePatterns: [
    'node_modules/',
    '.next/',
    'dist/',
    '*.config.js',
    '*.config.ts',
  ],
}

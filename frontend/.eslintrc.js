module.exports = {
  env: {browser: true, es6: true},
  extends: ['plugin:prettier/recommended', 'react-app'],
  globals: {Atomics: 'readonly', SharedArrayBuffer: 'readonly'},
  parserOptions: {
    ecmaFeatures: {jsx: true},
    ecmaVersion: 2018,
    sourceType: 'module',
    warnOnUnsupportedTypeScriptVersion: false,
  },
  plugins: ['react', 'prettier'],
  rules: {
    camelcase: ['error', {properties: 'never'}],
    'max-len': [1, {code: 105, ignoreComments: false}],
    'no-console': 'warn',
    'prettier/prettier': 'error',
    'func-style': ['error', 'declaration'],
    'react/jsx-no-target-blank': 'warn',
  },
};

module.exports = {
  root: true,
  env: {
    es2020: true,
    node: true,
    jest: true,
  },
  extends: ['airbnb-base', 'eslint:recommended', 'prettier'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: ['prettier'],
  rules: {
    /**
     * eslint
     */
    camelcase: 'off',
    'consistent-return': 'off',
    'class-methods-use-this': 'off',
    'no-await-in-loop': 'off',
    'no-console': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'no-restricted-syntax': 'off',
    'no-underscore-dangle': 'off',
    'require-await': 'error',
    'no-use-before-define': 'off',

    /**
     * eslint-plugin-prettier
     */
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],

    /**
     * eslint-plugin-import
     */
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
      },
    ],
    'import/no-unresolved': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', ['sibling', 'parent'], 'index', 'object'],
        'newlines-between': 'always',
      },
    ],
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.test.js', './test/auth.js', './test/nockBack.js'],
      },
    ],
    'import/no-named-as-default': 'off',
  },
  overrides: [
    {
      files: ['*.test.js', '*.spec.js'],
      rules: {
        'no-unused-expressions': 'off',
      },
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.json'],
      },
    },
    'import/extensions': ['.js', '.json'],
  },
};

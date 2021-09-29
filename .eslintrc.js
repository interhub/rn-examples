module.exports = {
  root: true,
  extends: ['@react-native-community', 'prettier/react', 'prettier'],
  plugins: ['import', 'prettier'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        alias: {
          '~': './src',
        },
      },
    },
  },
  rules: {
    'import/order': [
      'warn',
      {
        'newlines-between': 'always',
        groups: ['internal', 'external', 'builtin', 'index', 'sibling', 'parent', 'object'],
      },
    ],
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    semi: 'off',
    'react-hooks/rules-of-hooks': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react-native/no-inline-styles': 'off',
    // 'react/jsx-first-prop-new-line': [1, 'always'],
    // 'react/jsx-max-props-per-line': [1, {maximum: 1}],
  },
}

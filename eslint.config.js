// ESLint 9 flat config (Expo 推奨構成 + Prettier)
const { defineConfig } = require('eslint/config')
const expoConfig = require('eslint-config-expo/flat')
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended')

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    ignores: ['node_modules/*', '.expo/*', 'dist/*'],
  },
  {
    settings: {
      'import/resolver': {
        node: { paths: ['src'] },
      },
    },
    rules: {
      'no-console': 'off',
      'react/prop-types': 'off',
    },
  },
])

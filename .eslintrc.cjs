module.exports = {
  root: true,

  env: {
    node: true,
    browser: true,
  },

  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 13,
  },

  plugins: ['@typescript-eslint'],

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-typescript',
    'plugin:prettier/recommended',
  ],

  overrides: [
    {
      files: ['*.vue'],
      rules: {
        indent: 'off',
      },
    },
  ],

  settings: {
    'vue-i18n': {
      localeDir: './src/locales/*.{json}',
      messageSyntaxVersion: '^9.0.0',
    },
  },
}

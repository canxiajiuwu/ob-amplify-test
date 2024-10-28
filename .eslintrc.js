module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  plugins: [],
  // add your custom rules here
  rules: {
    // 禁止使用分号
    semi: 0,
    // 禁止使用拖尾逗号
    'comma-dangle': 0,
    camelcase: 'off',
    // 关闭组件命名规则
    'vue/multi-word-component-names': 'off',
    'vue/require-prop-types': 'off',
    'vue/require-default-prop': 'off',
    'no-undef': 'off',
    'no-console': 'off',
    'vue/no-side-effects-in-computed-properties': 'off',
    'vue/no-v-html': 'off',
    'vue/no-lone-template': 'off',
    'vue/no-template-shadow': 'off',
    'vue/attributes-order': 'off',
    'vue/prop-name-casing': 'off',
    eqeqeq: 0
  }
}

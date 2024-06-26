module.exports = {
  ignoreDisables: true,
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-scss',
    'stylelint-config-recommended-vue',
    'stylelint-config-rational-order',
    "stylelint-config-tailwindcss"
  ],
  overrides: [
    // 扫描.vue/html文件中的<style>标签内的样式
    {
      files: ['**/*.vue'],
      customSyntax: 'postcss-html'
    }
  ],
  ignore: ['legacy', { ignore: ['with-var-inside'] }],
  rules: {
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global','deep']
      }
    ],
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': [
        true,
        {
            ignoreAtRules: ['tailwind']
        }
    ],
    'color-function-notation': 'legacy',
    'no-missing-end-of-source-newline': null,
    'declaration-block-no-duplicate-properties': true,
    'no-invalid-double-slash-comments': null,
    'block-no-empty': null
  }
}

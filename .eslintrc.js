module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "no-var": 2,
    "no-empty": 2,
    "no-extra-semi": 2,
    "no-spaced-func": 1,
    "semi": [2, "always"],
    "max-len": [2, 150, 2],
    "quotes": [2, "double"],
    "no-inline-comments": 1,
    "no-use-before-define": 2,
    "indent": [2, 2, { SwitchCase: 1 }],
    "no-unused-vars": [2, { args: "none" }],
    "comma-spacing": [1, { before: false, after: true }],
    "semi-spacing": [2, { before: false, after: true }],
    "key-spacing": [1, { beforeColon: false, afterColon: true }],
  },
};

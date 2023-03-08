// @ts-check
// eslint-disable-next-line import/no-extraneous-dependencies
const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
  root: true,
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: { jsx: true },
  },
  env: { browser: true, es6: true, node: true },
  extends: [
    "react-app",
    "react-app/jest",
    "airbnb",
    "prettier",
    "eslint:recommended",
    /**
     * "extends": ["plugin:prettier/recommended"]는 세 가지를 한다고 설명한다.
     * 1. eslint-plugin-prettier를 실행한다.(Enables eslint-plugin-prettier.)
     * 2. prettier/prettier의 규칙을 "error"로 설정한다.(Sets the prettier/prettier rule to "error".)
     * 3. eslint-config-prettier를 적용시킨다.(Extends the eslint-config-prettier configuration.)
     */
    "plugin:prettier/recommended",
  ],
  rules: {
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    "no-console": 0,
    "react/react-in-jsx-scope": "off" /**  import React 생략 */,
  },
  overrides: [
    {
      files: ["**/*.jsx"],
      rules: { "react/forbid-prop-types": "off" } /** PropTypes.object 사용 */,
    },
    {
      files: ["**/*.ts", "**/*.tsx"],
      plugins: ["@typescript-eslint"],
      extends: [
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
      ],
      rules: {
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": ["error"],
      },
    },
    {
      files: ["vite.config.ts"],
      rules: {
        "import/no-extraneous-dependencies": [
          "error",
          { devDependencies: true },
        ],
      },
    },
  ],
  settings: {
    "import/resolver": { node: { paths: ["src"] } },
  },
});

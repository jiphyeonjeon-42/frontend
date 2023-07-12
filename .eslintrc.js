// .eslintrc.js

module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    "airbnb",
    "prettier",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:prettier/recommended",
    "plugin:import/typescript",
  ],
  rules: {
    "import/extensions": "off",
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "react/jsx-filename-extension": [
      "error",
      {
        extensions: [".jsx", ".tsx"],
      },
    ],
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "no-console": 0,
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: true,
      node: true,
    },
  },
  parser: "@typescript-eslint/parser",
};

//   "extends": ["plugin:prettier/recommended"]는 세 가지를 한다고 설명한다.
// 1. eslint-plugin-prettier를 실행한다.(Enables eslint-plugin-prettier.)
// 2. prettier/prettier의 규칙을 "error"로 설정한다.(Sets the prettier/prettier rule to "error".)
// 3. eslint-config-prettier를 적용시킨다.(Extends the eslint-config-prettier configuration.)

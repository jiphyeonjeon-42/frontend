// .eslintrc.js

module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    "airbnb",
    "prettier",
    "eslint:recommended",
    "plugin:prettier/recommended",
  ],
  rules: {
    "react/jsx-filename-extension": [
      "error",
      {
        extensions: [".js", ".jsx"],
      },
    ],
    "no-console": 0,
  },
};

//   "extends": ["plugin:prettier/recommended"]는 세 가지를 한다고 설명한다.
// 1. eslint-plugin-prettier를 실행한다.(Enables eslint-plugin-prettier.)
// 2. prettier/prettier의 규칙을 "error"로 설정한다.(Sets the prettier/prettier rule to "error".)
// 3. eslint-config-prettier를 적용시킨다.(Extends the eslint-config-prettier configuration.)

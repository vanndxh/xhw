module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended"],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    plugins: ["@typescript-eslint"],
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "react/react-in-jsx-scope": 0, // 解决默认react在jsx中错误
    "no-use-before-define": 2,
    "no-console": 2,
    "no-debugger": 2,
  },
};

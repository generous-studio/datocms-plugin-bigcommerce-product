module.exports = {
  parser: "@typescript-eslint/parser/dist/index.js",
  plugins: ["@typescript-eslint", "prettier"],
  env: {
    es6: true,
    mocha: true,
    browser: true,
  },
  parserOptions: {
    sourceType: "module",
  },
  settings: {
    "import/resolver": "webpack",
  },
  rules: {},
  extends: [
    "plugin:react/recommended",
    //"plugin:import/recommended",
    //"plugin:import/typescript",
    "plugin:prettier/recommended",
  ],
};

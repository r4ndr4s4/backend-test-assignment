module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "airbnb-base",
    "eslint:recommended",
    "prettier",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    "arrow-body-style": 0, // not really useful
    "consistent-return": 0,
    "import/extensions": [
      1,
      {
        tsx: "never",
        ts: "never",
        json: "always",
        f: "always",
        mock: "always",
      },
    ],
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          `${__dirname}/src/{,**/}*.spec.ts`,
          `${__dirname}/src/test/**`,
        ],
      },
    ],
    "import/no-unresolved": 0,
    "import/prefer-default-export": 0,
    "lines-between-class-members": 0,
    "max-classes-per-file": 0,
    "no-console": ["warn", { allow: ["warn", "error", "info"] }],
    "no-nested-ternary": 0,
    "no-param-reassign": 0,
    "no-plusplus": 0,
    "no-restricted-imports": [
      "error",
      {
        patterns: ["**/pt-types/src/"],
      },
    ],
    "no-restricted-syntax": 0,
    "no-shadow": 0,
    "no-underscore-dangle": 0,
    yoda: ["error", "never", { exceptRange: true }],
    "@typescript-eslint/ban-ts-ignore": 0,
    "@typescript-eslint/explicit-function-return-type": [
      1,
      {
        allowExpressions: true,
        allowHigherOrderFunctions: true,
      },
    ],
    "@typescript-eslint/no-empty-function": 0,
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        varsIgnorePattern: "^_(1|2|3)?$",
        argsIgnorePattern: "^_(1|2|3)?$",
      },
    ],
    "@typescript-eslint/prefer-optional-chain": 1,
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "interface",
        format: ["PascalCase"],
      },
    ],
    "@typescript-eslint/ban-ts-comment": [
      "warn",
      { "ts-ignore": "allow-with-description" },
    ],
    camelcase: 0,
    "dot-notation": 0,
  },
};

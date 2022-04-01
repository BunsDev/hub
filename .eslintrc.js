module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    mocha: true,
  },
  ignorePatterns: ["**/cypress/**/*.*", "public/**"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "es2019",
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
  plugins: ["eslint-plugin-import", "@typescript-eslint", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "prettier",
  ],
  rules: {
    "prettier/prettier": ["error"],
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/naming-convention": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off", // TODO: set error
    "@typescript-eslint/member-ordering": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-require-imports": "error",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        varsIgnorePattern: "^_",
        argsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/no-floating-promises": "error",
    "import/no-extraneous-dependencies": "off",
    "import/order": "off",
    "react/react-in-jsx-scope": "off",
    // allow jsx syntax in js files (for next.js project)
    "react/jsx-filename-extension": [1, { extensions: [".ts", ".tsx"] }],
  },
  overrides: [
    {
      files: ["**/__tests__/**/*.ts", "*.spec.ts"],
      rules: {
        "import/no-extraneous-dependencies": "off",
      },
    },
    {
      files: ["*.d.ts"],
      rules: {
        "@typescript-eslint/triple-slash-reference": "off",
      },
    },
  ],
  settings: {
    react: {
      pragma: "React",
      version: "detect",
    },
  },
};

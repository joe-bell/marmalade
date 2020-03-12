module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: [
    "jsx-a11y"
  ],
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:jsx-a11y/strict",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true 
    }
  },
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/prefer-interface": "off",
    "@typescript-eslint/no-empty-interface": "off",
    'jsx-a11y/label-has-for': 'off', // Deprecated - https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-for.md
    // "jsx-a11y/anchor-is-valid": ["error", { "components": ["Link"], "specialLink": ["hrefLeft", "hrefRight"], "aspects": ["invalidHref", "preferButton"] }],
    "react/prop-types": "off",
    "react/display-name": "off"
  },
  settings: {
    react: {
      version: "detect"
    }
  },
  overrides: [
    {
      files: ["*.js"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
    {
      files: ["*.d.ts"],
      rules: {
        "@typescript-eslint/no-unused-vars": "off",
      },
    },
  ],
};

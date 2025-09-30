module.exports = {
  extends: ["expo", "@testing-library/react-native"],
  rules: {
    "@typescript-eslint/no-unused-vars": "off",
  },
  overrides: [
    {
      files: ["**/__tests__/**/*", "**/*.test.*", "**/*.spec.*"],
      env: {
        jest: true,
      },
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
      },
    },
  ],
};

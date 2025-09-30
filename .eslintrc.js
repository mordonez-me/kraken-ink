module.exports = {
  extends: ["expo", "@testing-library/react-native"],
  rules: {
    // Deshabilitar reglas que interfieren con testing
    "@typescript-eslint/no-unused-vars": "off",
  },
  overrides: [
    {
      files: ["**/__tests__/**/*", "**/*.test.*", "**/*.spec.*"],
      env: {
        jest: true,
      },
      rules: {
        // Reglas específicas para archivos de test
        "@typescript-eslint/no-explicit-any": "off",
      },
    },
  ],
};

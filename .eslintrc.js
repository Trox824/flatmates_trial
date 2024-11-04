module.exports = {
  extends: ["next/core-web-vitals"],
  overrides: [
    {
      files: ["src/env.js"],
      parser: "espree",
    },
  ],
  rules: {
    "@typescript-eslint/no-unused-vars": "warn",
  },
};

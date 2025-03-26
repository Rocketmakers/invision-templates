// See https://docs.rocketmakers.club/eslint/ for the docs

const { createEslintConfig } = require("@rocketmakers/eslint");

const config = createEslintConfig(
  {
    project: ["tsconfig.json"],
    ignorePatterns: ["**/node_modules/**/*.*", "**/dist/**"],
  },
  {
    "eslint-comments/no-use": ["off"],
    "class-methods-use-this": ["off"],
    "@typescript-eslint/no-namespace": ["off"],
  },
);

module.exports = config;

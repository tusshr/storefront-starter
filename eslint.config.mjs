import tsParser from "@typescript-eslint/parser";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";
import checkFile from "eslint-plugin-check-file";
import n from "eslint-plugin-n";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "**/*.config.{js,cjs,mjs,ts}",
    // Generated test artifacts:
    "playwright-report/**",
    "test-results/**",
    "coverage/**",
  ]),
  {
    plugins: {
      "check-file": checkFile,
      n,
    },
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 5,
      sourceType: "script",
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      "prefer-arrow-callback": ["error"],
      "prefer-template": ["error"],
      semi: ["error"],
      quotes: ["error", "double"],
      "n/no-process-env": ["error"],
      "no-unused-vars": ["error"],
      "check-file/filename-naming-convention": [
        "error",
        {
          "**/*.{ts,tsx}": "KEBAB_CASE|?(_)*",
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],
      "check-file/folder-naming-convention": [
        "error",
        {
          "src/**/!^[.*": "KEBAB_CASE",
        },
      ],
    },
  },
]);

export default eslintConfig;

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".agent/**",
    ".codex/**",
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "*.cjs",
    "search-css.js",
    "*.out",
    "*.log",
    "foo*.txt",
    "*result*.json",
    "css-results*.txt",
    "tsc*.txt",
    "build*.txt",
    "git_diff.txt",
    "curl_out.txt",
  ]),
]);

export default eslintConfig;

import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";

// Common rule sets
const commonReactRules = {
  ...reactPlugin.configs.recommended.rules,
  ...reactHooksPlugin.configs.recommended.rules,
  ...jsxA11yPlugin.configs.recommended.rules,
  "react/react-in-jsx-scope": "off",
  "react/prop-types": "off",
  "react/jsx-uses-react": "off",
  "react/jsx-uses-vars": "error",
  "react/no-unescaped-entities": "off",
};

const commonImportRules = {
  "import/order": ["error", {
    "groups": [
      "builtin",
      "external",
      "internal",
      "parent",
      "sibling",
      "index",
    ],
    "newlines-between": "always",
    "alphabetize": {
      "order": "asc",
      "caseInsensitive": true,
    },
  }],
  "import/no-unresolved": "off",
  "import/no-unused-modules": "warn",
};

const commonFormattingRules = {
  "semi": ["error", "always"],
  "quotes": ["error", "double", { allowTemplateLiterals: true }],
  "comma-dangle": ["error", "always-multiline"],
  "indent": ["error", 2],
  "object-curly-spacing": ["error", "always"],
  "array-bracket-spacing": ["error", "never"],
  "comma-spacing": ["error", { before: false, after: true }],
  "key-spacing": ["error", { beforeColon: false, afterColon: true }],
  "space-before-blocks": ["error", "always"],
  "keyword-spacing": ["error", { before: true, after: true }],
  "space-infix-ops": "error",
  "eol-last": ["error", "always"],
  "no-trailing-spaces": "error",
  "max-len": ["warn", { code: 100, ignoreUrls: true, ignoreStrings: true }],
};

const commonGeneralRules = {
  "no-console": "warn",
  "no-debugger": "error",
  "prefer-const": "error",
  "no-var": "error",
  "no-multiple-empty-lines": ["warn", { max: 1 }],
};

export default [
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: "./tsconfig.json",
      },
      globals: {
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        console: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      "react": reactPlugin,
      "react-hooks": reactHooksPlugin,
      "jsx-a11y": jsxA11yPlugin,
      "import": importPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...tsPlugin.configs["recommended-requiring-type-checking"].rules,
      ...commonReactRules,
      ...commonImportRules,
      ...commonGeneralRules,
      ...commonFormattingRules,

      // TypeScript specific
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "react": reactPlugin,
      "react-hooks": reactHooksPlugin,
      "jsx-a11y": jsxA11yPlugin,
      "import": importPlugin,
    },
    rules: {
      ...commonReactRules,
      ...commonImportRules,
      ...commonGeneralRules,
      ...commonFormattingRules,

      // JavaScript specific
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    files: ["**/*.config.{js,ts}", "vite.config.ts", "react-router.config.ts", "playwright.config.ts"],
    languageOptions: {
      globals: {
        __dirname: "readonly",
        __filename: "readonly",
        process: "readonly",
      },
    },
    rules: {
      "no-console": "off",
    },
  },
  {
    files: ["**/*.{test,spec}.{js,ts,jsx,tsx}", "tests/**/*.{js,ts,jsx,tsx}"],
    languageOptions: {
      globals: {
        vi: "readonly",
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        test: "readonly",
        window: "readonly",
        global: "readonly",
        document: "readonly",
      },
    },
    rules: {
      "no-console": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
    },
  },
  {
    ignores: [
      "node_modules/**",
      "build/**",
      "dist/**",
      ".react-router/**",
      "public/**",
    ],
  },
];

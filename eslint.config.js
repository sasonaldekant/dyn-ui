import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import hooks from "eslint-plugin-react-hooks";
import testing from "eslint-plugin-testing-library";
import jestDom from "eslint-plugin-jest-dom";

export default [
  {
    files: ["**/*.{ts,tsx}"] ,
    ignores: ["dist/**", "build/**", "node_modules/**"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
        project: [
          "./tsconfig.base.json",
          "./packages/dyn-ui-react/tsconfig.json"
        ],
        tsconfigRootDir: new URL(".", import.meta.url).pathname
      }
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      react,
      "react-hooks": hooks,
      "testing-library": testing,
      "jest-dom": jestDom
    },
    settings: { react: { version: "detect" } },
    rules: {
      // core TS/React sanity
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    }
  },
  {
    files: ["**/*.stories.tsx"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off"
    }
  },
  {
    files: ["**/*.test.tsx"],
    plugins: { "testing-library": testing, "jest-dom": jestDom },
    rules: {
      "testing-library/no-node-access": "off",
      "testing-library/prefer-screen-queries": "warn"
    }
  }
];

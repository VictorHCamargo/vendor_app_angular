import tseslint from "typescript-eslint";
import angular from "@angular-eslint/eslint-plugin";
import angularTemplateParser from "@angular-eslint/template-parser";
import angularTemplatePlugin from "@angular-eslint/eslint-plugin-template";
import unicorn from "eslint-plugin-unicorn";

export default tseslint.config(
  {
    files: ["**/*.ts"],
    plugins: {
      "@angular-eslint": angular,
      "@typescript-eslint": tseslint.plugin,
      "unicorn": unicorn,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      "unicorn/filename-case": [
        "error",
        {
          case: "kebabCase"
        }
      ],

      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "interface",
          format: ["PascalCase"],
          custom: {
            regex: "^I[A-Z]",
            match: true
          }
        },
        {
          selector: "typeAlias",
          format: ["PascalCase"],
          custom: {
            regex: "^T[A-Z]",
            match: true
          }
        }
      ],

      "@typescript-eslint/explicit-member-accessibility": [
        "error",
        {
          accessibility: "explicit",
          overrides: { constructors: "no-public" }
        }
      ],

      "@typescript-eslint/member-ordering": [
        "error",
        {
          default: [
            "public-static-field",
            "protected-static-field",
            "private-static-field",
            "public-instance-field",
            "protected-instance-field",
            "private-instance-field",
            "constructor",
            "public-instance-method",
            "protected-instance-method",
            "private-instance-method"
          ]
        }
      ],

      "@typescript-eslint/no-magic-numbers": [
        "warn",
        {
          ignore: [-1, 0, 1],
          ignoreArrayIndexes: true,
          ignoreEnums: true,
          ignoreReadonlyClassProperties: true
        }
      ],
      "@angular-eslint/component-class-suffix": "error",
      "@angular-eslint/directive-class-suffix": "error",
      "@angular-eslint/no-input-rename": "error",
      "@angular-eslint/no-output-rename": "error",
      "@angular-eslint/no-output-native": "error",
    },
  },
  {
    files: ["**/*.html"],
    plugins: {
      "@angular-eslint/template": angularTemplatePlugin,
    },
    languageOptions: {
      parser: angularTemplateParser,
    },
    rules: {
      "@angular-eslint/template/no-negated-async": "error",
      "@angular-eslint/template/attributes-order": "warn",
      "@angular-eslint/template/no-method-invocations": "error",
      "@angular-eslint/template/prefer-control-flow": "error",
      "@angular-eslint/template/no-duplicate-attributes": "error",
    }
  }
);

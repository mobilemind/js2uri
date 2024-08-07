const globals = require("globals");
const js = require("@eslint/js");
const n = require("eslint-plugin-n");

module.exports = [
    {
        files: [".github/linters/eslint.config.js", "Gruntfile.js", "tasks/*.js", "tests/*.js"],
        ignores: ["*.json", "node_modules/*", "web/*.js"],
        languageOptions: {
            ecmaVersion: "latest",
            globals: {
                ...globals.node
            }
        },
        plugins: {
            n
        },
        rules: {
            // Eslint - http://eslint.org/docs/rules/
            ...js.configs.recommended.rules,
            // Possible Problems
            "array-callback-return": "error",
            "no-await-in-loop": "error",
            "no-console": "off",
            "no-template-curly-in-string": "error",
            // Suggestions
            "accessor-pairs": "error",
            "arrow-body-style": "error",
            "block-scoped-var": "error",
            "class-methods-use-this": "error",
            "complexity": ["error", 12],
            "consistent-return": "error",
            "consistent-this": "error",
            "curly": "error",
            "default-case": "error",
            "func-name-matching": "error",
            "guard-for-in": "error",
            "id-denylist": "error",
            "id-match": "error",
            "init-declarations": "error",
            "max-depth": "error",
            "max-nested-callbacks": "error",
            "max-params": ["error", 5],
            "max-statements": ["error", 76],
            "new-cap": "error",
            "no-array-constructor": "error",
            "no-caller": "error",
            "no-continue": "error",
            "no-div-regex": "error",
            "no-duplicate-imports": "error",
            "no-else-return": "error",
            "no-empty-function": "error",
            "no-empty-static-block": "error",
            "no-eq-null": "error",
            "no-eval": "error",
            "no-extend-native": "error",
            "no-extra-bind": "error",
            "no-extra-label": "error",
            "no-implicit-coercion": "error",
            "no-implied-eval": "error",
            "no-inline-comments": "error",
            "no-iterator": "error",
            "no-label-var": "error",
            "no-labels": "error",
            "no-lone-blocks": "error",
            "no-lonely-if": "error",
            "no-loop-func": "error",
            "no-magic-numbers": "off",
            "no-multi-str": "error",
            "no-negated-condition": "error",
            "no-nested-ternary": "error",
            "no-new-func": "error",
            "no-new-wrappers": "error",
            "no-new": "error",
            "no-octal-escape": "error",
            "no-param-reassign": "error",
            "no-plusplus": "error",
            "no-proto": "error",
            "no-restricted-globals": "error",
            "no-restricted-imports": "error",
            "no-restricted-properties": "error",
            "no-restricted-syntax": "error",
            "no-return-assign": "error",
            "no-self-compare": "error",
            "no-sequences": "error",
            "no-shadow": "error",
            "no-throw-literal": "error",
            "no-undef-init": "error",
            "no-undefined": "off",
            "no-underscore-dangle": "error",
            "no-unmodified-loop-condition": "error",
            "no-unneeded-ternary": "error",
            "no-unused-expressions": "error",
            "no-unused-vars": "error",
            "no-use-before-define": "error",
            "no-useless-call": "error",
            "no-useless-computed-key": "error",
            "no-useless-concat": "error",
            "no-useless-constructor": "error",
            "no-useless-rename": "error",
            "no-useless-return": "error",
            "no-void": "error",
            "no-warning-comments": "error",
            "object-shorthand": "error",
            "operator-assignment": "error",
            "prefer-arrow-callback": "error",
            "prefer-const": "warn",
            "prefer-destructuring": "error",
            "prefer-numeric-literals": "error",
            "prefer-promise-reject-errors": "error",
            "prefer-rest-params": "error",
            "prefer-spread": "error",
            "radix": "error",
            "require-await": "error",
            "sort-imports": "error",
            "sort-keys": "off",
            "symbol-description": "error",
            "vars-on-top": "error",
            // Layout & Formatting
            "unicode-bom": "error",
            // n (node) -  https://github.com/eslint-community/eslint-plugin-n
            ...n.configs['flat/recommended-module'].rules,
            "n/no-extraneous-require": "off",
            "n/prefer-global/buffer": "error",
            "n/prefer-global/process": "error",
            "n/prefer-global/url-search-params": "error",
            "n/prefer-global/url": "error"
        }
    }
];

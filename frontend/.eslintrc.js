module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        "plugin:vue/vue3-essential",
        "eslint:recommended",
        "@vue/typescript/recommended",
    ],
    parserOptions: {
        ecmaVersion: 2020,
    },
    plugins: [
        "simple-import-sort"
    ],
    rules: {
        "@typescript-eslint/no-unused-vars": "off",
        "no-unused-labels": "off",
        "semi": ["error", "always"],
        "simple-import-sort/imports": "error",
        "vue/no-unused-components": "off",
        "vue/no-unused-vars": "off",
        "vue/script-indent": [ "error", 4, { "baseIndent": 1 } ],
//        "vue/valid-v-on": "off"
    },
    overrides: [
        {
            "files": [ "*.vue" ],
            "rules": {
                "no-cond-assign": "off",
            }
        },
        {
            files: [
                "**/__tests__/*.{j,t}s?(x)",
                "**/tests/unit/**/*.spec.{j,t}s?(x)",
            ],
            env: {
                jest: true,
            },
        },
    ],
};

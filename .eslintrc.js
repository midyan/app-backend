module.exports = {
    env: {
        es6: true,
        node: true,
    },
    plugins: ['standard', 'promise'],
    extends: 'eslint:recommended',
    globals: {
        module: false,
        describe: false,
        it: false,
        src: false,
        integration: false,
        next: false,
        before: false,
    },
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVerions: 2017,
    },
    rules: {
        indent: [
            'error',
            4,
            {
                SwitchCase: 1,
            },
        ],
        'no-fallthrough': 'error',
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'never'],
        'max-len': [
            'error',
            210,
            {
                ignoreStrings: true,
                ignoreComments: true,
                ignoreTemplateLiterals: true,
                ignoreRegExpLiterals: true,
            },
        ],
        'space-before-function-paren': 0,
        'no-unused-vars': [
            'warn',
            {
                varsIgnorePattern: 'services',
            },
        ],
        'array-bracket-newline': [
            'error',
            {
                multiline: true,
                minItems: 1,
            },
        ],
        'array-element-newline': [
            'error',
            {
                minItems: 1,
            },
        ],
        'object-curly-spacing': ['error', 'always'],
        'no-console': 'off',
        'no-var': 'error',
        'comma-dangle': ['error', 'always-multiline'],
        'object-property-newline': 2,
        'object-curly-newline': ['error', { multiline: true }],
        'arrow-parens': ['error', 'as-needed'],
    },
}

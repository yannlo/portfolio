 
const babelParser = require('@babel/eslint-parser');
const jestPlugin = require('eslint-plugin-jest');
const jestDomPlugin = require('eslint-plugin-jest-dom');
const globals = require('globals');

module.exports = [
    {
        ignores: ['node_modules/', 'vendor/', 'public/build/', 'var/'],
    },
    {
        files: ['**/*.js'],
        languageOptions: {
            parser: babelParser,
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.jest,
            },
        },
        plugins: {
            jest: jestPlugin,
            'jest-dom': jestDomPlugin,
        },
        rules: {
            ...jestDomPlugin.configs['flat/recommended'].rules,
            'jest/no-disabled-tests': 'warn',
            'jest/no-focused-tests': 'error',
            'jest/no-identical-title': 'error',
            'jest/prefer-to-have-length': 'warn',
            'jest/valid-expect': 'error',
            'jest-dom/prefer-checked': 'error',
            'jest-dom/prefer-enabled-disabled': 'error',
            'jest-dom/prefer-required': 'error',
            'jest-dom/prefer-to-have-attribute': 'error',
        },
    },
    {
        files: ['eslint.config.js', 'webpack.config.js', 'babel.config.js', 'postcss.config.js', 'tailwind.config.js', 'jest.config.js', 'setupJest.js'],
        languageOptions: {
            sourceType: 'script',
            globals: globals.node,
        },
    },
];

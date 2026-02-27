module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
        'vue/setup-compiler-macros': true,
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
        'plugin:@typescript-eslint/recommended',
        // Prettier MUSI być na końcu tej listy:
        'plugin:prettier/recommended',
    ],
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
    },
    plugins: [
        'vue',
        '@typescript-eslint'
    ],
    rules: {
        // --- Ogólne zasady JavaScript / Node ---
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

        // --- Zasady Vue ---
        'vue/multi-word-component-names': 'off',
        'vue/component-api-style': ['error', ['script-setup', 'composition']],
        'vue/define-macros-order': ['error', {
            order: ['defineOptions', 'defineProps', 'defineEmits', 'defineSlots']
        }],

        // --- Zasady TypeScript ---
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-unused-vars': ['warn', {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_'
        }],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/consistent-type-imports': ['error', {
            prefer: 'type-imports'
        }],

        // --- Ustawienia Prettiera (opcjonalne nadpisywanie) ---
        // Możesz tu wymusić, aby błędy Prettiera były traktowane jako ostrzeżenia, a nie błędy blokujące budowanie:
        'prettier/prettier': ['warn']
    }
};

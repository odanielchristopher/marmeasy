import js from '@eslint/js'; // Plugin padrão do ESLint para JS
import tsPlugin from '@typescript-eslint/eslint-plugin'; // Plugin do TypeScript
import tsParser from '@typescript-eslint/parser'; // Parser para TypeScript
import react from 'eslint-plugin-react'; // Plugin do React
import globals from 'globals'; // Globais padrão

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'], // Alvo de arquivos para ESLint
    languageOptions: {
      parser: tsParser, // Parser para TypeScript
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true, // Suporte a JSX
        },
      },
      globals: globals.browser, // Globais padrão para navegadores
    },
    plugins: {
      react, // Plugin React
      '@typescript-eslint': tsPlugin, // Plugin TypeScript
    },
    rules: {
      // Regras de JS
      ...js.configs.recommended.rules,
      // Regras do React
      ...react.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off', // Não necessário no React 17+
      // Regras do TypeScript
      ...tsPlugin.configs.recommended.rules,
      '@typescript-eslint/ban-ts-comment': 'off', // Permitir comentários de TS
      semi: ['error', 'always'], // Exigir ponto e vírgula
      quotes: ['error', 'single'], // Exigir aspas simples
      'comma-dangle': ['error', 'always-multiline'], // Virgula em listas multilinha
      'no-console': 'warn', // Avisar sobre console.log
      'no-undef': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];

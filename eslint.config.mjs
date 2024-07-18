import globals from "globals";
import path from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import pluginJs from "@eslint/js";
import babelParser from '@babel/eslint-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({ baseDirectory: __dirname, recommendedConfig: pluginJs.configs.recommended });

export default [
  {
    ignores: ["node_modules/**"], 
  },
  {
    languageOptions: {
      globals: globals.node,
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        ecmaVersion: 2020,
        sourceType: 'module',
      }
    },
    rules: {
      'import/extensions': ['error', 'ignorePackages', {
        'js': 'never',
      }],
      'no-underscore-dangle': 'off',
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off'
    },
  },
  ...compat.extends("airbnb-base"),
];
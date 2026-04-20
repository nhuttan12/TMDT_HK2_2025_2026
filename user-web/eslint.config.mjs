import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import * as tsParser from '@typescript-eslint/parser';

const eslintConfig = defineConfig([
	...nextVitals,
	...nextTs,

	{
		files: ['**/*.ts', '**/*.tsx'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: './tsconfig.json', // Kết nối với TS để check lỗi logic
			},
		},
		plugins: {
			import: importPlugin,
		},
		settings: {
			'import/resolver': {
				// Giải mã các đường dẫn Alias như @/components/...
				typescript: {
					alwaysTryTypes: true,
					project: './tsconfig.json',
				},
			},
		},
		rules: {
			// Quy tắc then chốt: Báo lỗi đỏ nếu không tìm thấy file import
			'import/no-unresolved': 'error',
			'import/no-duplicates': 'error',
			'import/named': 'error',
		},
	},

	eslintConfigPrettier,

	// Override default ignores of eslint-config-next.
	globalIgnores([
		// Default ignores of eslint-config-next:
		'.next/**',
		'out/**',
		'build/**',
		'next-env.d.ts',
		'tailwind.config.ts',
		'tailwind.config.js',
	]),
]);

export default eslintConfig;

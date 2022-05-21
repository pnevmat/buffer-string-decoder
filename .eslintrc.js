module.exports = {
	env: {
		commonjs: true,
		es2021: true,
		node: true,
	},
	extends: ['standard'],
	parserOptions: {
		ecmaVersion: 12,
	},
	rules: {
		'object-curly-spacing': ['error', 'never'],
		indent: ['error', 'tab'],
		semi: ['error', 'always'],
		'no-tabs': ['error', {allowIndentationTabs: true}],
		'comma-dangle': 'off',
		'space-before-function-paren': 'off',
	},
};
// allowIndentationTabs: true

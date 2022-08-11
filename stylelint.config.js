module.exports = {
	extends: [
		'stylelint-config-standard',
		'stylelint-config-prettier',
		'stylelint-config-recommended-vue',
	],
	customSyntax: 'postcss-html',
	rules: {
		indentation: 4,
	},
	ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts'],
	// overrides: [
	// 	{
	// 		files: ['*.html', '**/*.html', '**/*.vue'],
	// 		extends: [],
	// 		customSyntax: 'postcss-html',
	// 	},
	// ],
};

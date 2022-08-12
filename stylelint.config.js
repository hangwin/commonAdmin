module.exports = {
	extends: [
		// 注意stylelint 14的版本里在vue文件中可能会出现Unknown word (CssSyntaxError)这个报错
		// 此时可以使用stylelint-config-standard-scss这个包来解决这个报错
		// 当然你也可以选择降低版本来解决
		'stylelint-config-standard-scss',
		// 'stylelint-config-standard',
		// 下面这个包已经包含了stylelint-config-standard，所以上面就可以注释掉了
		'stylelint-config-recommended-vue',
		// 关闭stylelint中校验格式的规则，以免跟prettier冲突
		'stylelint-config-prettier',
		// 下面是基于stylelint-order的规范css属性书写顺序的包，这样我们就不用自己在rules中手动指定了
		'stylelint-config-rational-order',
	],
	ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts'],
	// plugins: ['stylelint-order'],
	rules: {
		indentation: 'tab',
		// 'order/order': ['custom-properties', 'declarations'],
	},
	overrides: [
		// 上面的extends里的stylelint-config-recommended-vue已经帮我们指定了vue文件的解释器了，所以下面的也可以注释掉了
		// {
		// 	// 针对html和vue文件进行处理
		// 	files: ['*.html', '**/*.html', '**/*.vue'],
		// 	// 在这里配置针对vue文件使用postcss-html作为语法解析器
		// 	customSyntax: 'postcss-html'
		// },
		{
			files: ['**/*.less'],
			customSyntax: 'postcss-less',
		},
	],
};

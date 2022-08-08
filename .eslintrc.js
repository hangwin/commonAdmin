module.exports = {
	root: true, // 让eslint不要往父级去继续查找配置
	parser: 'vue-eslint-parser', // 因为需要校验vue模板文件里面的html，所以这里使用vue-eslint-parser这个parser作为解释器
	parserOptions: {
		// 因为上面使用了vue-eslint-parser，它只会校验模板里面的html，对于script里面的ts，仍然需要其他解释器去处理
		// 所以vue-eslint-parser就预留了parser选项让我们传进去解释器
		parser: '@typescript-eslint/parser',
		ecmaVersion: 2020, // 这里我们使用es2020的语法，所以在这里指定一下
		sourceType: 'module', // 我们的文件都是模块而非script，所以这里指定成module
		jsxPragma: 'React',
		ecmaFeatures: {
			jsx: true, // 项目用到了jsx的写法，所以要开启jsx
		},
	},
	env: {
		browser: true, // 项目运行在浏览器环境，所以指定浏览器相关的全局变量
		node: true, // 因为某些文件，如某些构建脚本之类的运行在node环境，所以这里也指定了node相关的全局变量
		//虽然上面的ecmaVersion指定支持2020的语法，但并不意味着支持es6最新的全局变量和类型，比如Set，所以在这里指定一下。
		//需要注意的是，在这里设置es2020:true，就会自动启用es2020语法，但是上面设置ecmaVersion:2020并不会启用es2020全局变量
		es2020: true,
	},
	extends: [
		'eslint:recommended',
		// 使用eslint-plugin-vue的vue3-recommended规则集校验vue模板
		'plugin:vue/vue3-recommended',
		// 使用@typescript-eslint/eslint-plugin来校验ts，注意需配合@typescript-eslint/parser使用
		'plugin:@typescript-eslint/recommended',
		// 用eslint-plugin-prettier的推荐规则集来解决prettier和eslint的冲突
		// 而eslint-plugin-prettier实际上就是依赖eslint-config-prettier来关闭冲突的
		// eslint-config-prettier作用是关闭eslint中与prettier冲突的规则。
		// eslint-plugin-prettier作用是让eslint用prettier来格式化，相当于当代码格式不符合prettier的配置的时候，也可以报错一个eslint错误
		'plugin:prettier/recommended',
	],
	rules: {
		'vue/multi-word-component-names': 'off',
		'@typescript-eslint/ban-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
	},
};

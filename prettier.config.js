module.exports = {
	printWidth: 100, // 1行最多100个字符
	semi: true, // 要分号结尾
	//vueIndentScriptAndStyle: true, // 配置了这个，vue模板文件里面的script 和 style 内就会缩进
	singleQuote: true, // 使用单引号
	// trailingComma: 'all', // 末尾要有逗号
	proseWrap: 'preserve', // 针对markdown文件，如果超过了最大字符数 always 换行| never 不换行| preserve 原样展示
	htmlWhitespaceSensitivity: 'strict', // html空格敏感
	endOfLine: 'auto', // 行结尾，跟editorConfig的end_of_line一样
};

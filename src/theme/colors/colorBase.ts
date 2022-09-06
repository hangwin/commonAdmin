import { generate } from '@ant-design/colors';
// 基础色，用于生成浅色模式和深色模式的衍生色
export const baseColor = {
	// 主题色
	primary: '#605BFF',
	gray: '#F7F7F8',
	// 警告色 warn
	yellow: '#F29339',
	// 危险色 danger
	red: '#D11A2A',
	// 成功色 success
	green: '#3A974C',

	white: '#FFFFFF',
	black: '#000000',
};

// 基础色，用于生成不同色阶的调色板
export const baseColor2 = {
	// 主色 通常对应主题色
	// 紫色，用作主题色和功能色中的提示色
	purple: '#605BFF',

	// 辅助色 通常就是功能色
	// 绿色，用作成功色
	green: '#00B30F',
	// 黄色 警告色
	yellow: '#FF9500',
	// 红色 错误色
	red: '#FF1500',

	// 中性色  黑白灰 用作背景、文字、边框等颜色
	// 灰色 用作背景色等
	gray: [
		'#fafafa',
		'#f5f5f5',
		'#f0f0f0',
		'#d9d9d9',
		'#bfbfbf',
		'#8c8c8c',
		'#595959',
		'#434343',
		'#262626',
		'#1f1f1f',
		'#141414',
	],
	// 白色，深色背景下的文字颜色
	white: '#FFFFFF',
	black: '#000000',
};

// 通过color衍生出其他过渡色
export const getColors = (mode: 'dark' | 'light' = 'light', color: string = baseColor.primary) => {
	const antMode = mode === 'light' ? 'default' : mode;
	const options: any = { theme: antMode };
	if (antMode === 'dark') {
		options.backgroundColor = '#141414';
	}
	const colors = generate(color, options);
	return colors;
};

export const lightColors2 = {
	purples: getColors('light', baseColor2.purple),

	greens: getColors('light', baseColor2.green),
	yellows: getColors('light', baseColor2.yellow),
	reds: getColors('light', baseColor2.red),
};
export const darkColors2 = {
	purples: getColors('dark', baseColor2.purple),

	greens: getColors('dark', baseColor2.green),
	yellows: getColors('dark', baseColor2.yellow),
	reds: getColors('dark', baseColor2.red),
};

export const lightColors = {
	primarys: getColors(),
	grays: getColors('light', baseColor.gray),
	yellows: getColors('light', baseColor.yellow),
	reds: getColors('light', baseColor.red),
	green: getColors('light', baseColor.green),
	text: getColors('light', baseColor.black),
	bg: getColors('light', baseColor.gray),
	leftLayoutBg: baseColor.white,
};
console.log('lightColors', lightColors);

export const darkColors = {
	primarys: getColors('dark'),
	grays: getColors('dark', baseColor.gray),
	yellows: getColors('dark', baseColor.yellow),
	reds: getColors('dark', baseColor.red),
	green: getColors('dark', baseColor.green),
	text: getColors('dark', baseColor.white),
	bg: getColors('dark', '#1f2327'),
	leftLayoutBg: '#16191c',
};
console.log('darkColors', darkColors);

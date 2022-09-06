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

// 通过color衍生出其他过渡色
export const getColors = (mode: 'dark' | 'light' = 'light', color: string = baseColor.primary) => {
	const antMode = mode === 'light' ? 'default' : mode;
	const colors = generate(color, { theme: antMode });
	return colors;
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

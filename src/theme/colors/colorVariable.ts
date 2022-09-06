import { lightColors, darkColors } from './colorBase';
//  用于生成颜色变量
export const getColorVariables = (theme: 'light' | 'dark' = 'light', primaryColor?: string[]) => {
	const colors = theme === 'light' ? { ...lightColors } : { ...darkColors };
	if (primaryColor) {
		colors.primarys = primaryColor;
	}
	console.log('getColorVariables', colors);
	return {
		// 主题色
		'--h-primary': colors.primarys[5],
		'--h-primary-hover': colors.primarys[4],
		'--h-primary-light-1': colors.primarys[0],
		'--h-primary-light-2': colors.primarys[1],
		'--h-primary-light-3': colors.primarys[2],
		'--h-primary-light-4': colors.primarys[3],
		'--h-primary-light-5': colors.primarys[4],
		'--h-primary-light-6': colors.primarys[5],
		'--h-primary-light-7': colors.primarys[6],
		'--h-primary-light-8': colors.primarys[7],
		'--h-primary-light-9': colors.primarys[8],

		// 功能色
		'--h-info': colors.grays[5],
		'--h-info-hover': colors.grays[3],
		'--h-success': colors.green[5],
		'--h-success-hover': colors.green[3],
		'--h-warn': colors.yellows[5],
		'--h-warn-hover': colors.yellows[3],
		'--h-red': colors.reds[5],
		'--h-red-hover': colors.reds[3],

		// 文字
		'--h-text-color': colors.text[3],
		'--h-text-info-color': colors.grays[5],

		// 背景填充色
		'--h-fill-bg': colors.bg[5],
		'--h-fill-bg-hover': colors.bg[5],
		'--h-fill-form-bg': colors.leftLayoutBg,
		'--h-fill-mdsize-bg': colors.bg[5], // '#293146',
		'--h-fill-input-bg': colors.bg[5],

		// 边框颜色
		'--h-border-color': colors.bg[6],
	};
};

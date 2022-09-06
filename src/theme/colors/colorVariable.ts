import { lightColors, darkColors, lightColors2, darkColors2, baseColor2 } from './colorBase';
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

//  用于生成颜色变量
export const getColorVariables2 = (theme: 'light' | 'dark' = 'light', primaryColor?: string[]) => {
	const colors: any = theme === 'light' ? { ...lightColors2 } : { ...darkColors2 };
	const isDark = theme === 'dark';
	if (primaryColor) {
		colors.primary = primaryColor;
	} else {
		colors.primary = colors.purples;
	}
	console.log('getColorVariables', colors);
	return {
		// 主题色
		'--h-primary': colors.primarys[5],
		'--h-primary-hover': colors.primarys[4],
		'--h-primary-active': colors.primarys[6],
		'--h-primary-disabled': colors.primarys[3],

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
		// 提示
		'--h-info': colors.primarys[5],
		'--h-info-hover': colors.primarys[4],
		'--h-info-active': colors.primarys[6],
		'--h-info-disabled': colors.primarys[3],
		// 成功
		'--h-success': colors.greens[5],
		'--h-success-hover': colors.greens[4],
		'--h-success-active': colors.greens[6],
		'--h-success-disabled': colors.greens[3],
		// 警告
		'--h-warn': colors.yellows[5],
		'--h-warn-hover': colors.yellows[4],
		'--h-warn-active': colors.yellows[6],
		'--h-warn-disabled': colors.yellows[3],
		// 错误
		'--h-danger': colors.reds[5],
		'--h-danger-hover': colors.reds[4],
		'--h-danger-active': colors.reds[6],
		'--h-danger-disabled': colors.reds[3],

		// 文字
		'--h-text-color-title': isDark ? baseColor2.gray[0] : baseColor2.gray[10],
		'--h-text-color-primary': isDark ? baseColor2.gray[1] : baseColor2.gray[9],
		'--h-text-color-secondary': isDark ? baseColor2.gray[2] : baseColor2.gray[8],
		'--h-text-color-disabled': isDark ? baseColor2.gray[3] : baseColor2.gray[7],

		// 边框颜色
		'--h-border-color': isDark ? baseColor2.gray[4] : baseColor2.gray[5],
		// 分割线
		'--h-divider-color': isDark ? baseColor2.gray[6] : baseColor2.gray[4],
		// 背景填充色
		'--h-fill-bg': isDark ? baseColor2.gray[0] : baseColor2.gray[10],
		'--h-fill-bg-hover': isDark ? baseColor2.gray[1] : baseColor2.gray[9],

		'--h-fill-form-bg': isDark ? baseColor2.white : baseColor2.black,

		'--h-fill-input-bg': isDark ? baseColor2.gray[0] : baseColor2.gray[10],
	};
};

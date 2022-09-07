// 颜色相关的主题工具
import { getColorVariables2 } from './colorVariable';
import { getColors } from './colorBase';
import cssVars from 'css-vars-ponyfill';
export const initColorTheme = (mode: 'light' | 'dark' = 'light', primaryColor?: string) => {
	const html = document.documentElement;
	html.setAttribute('app-theme', mode);
	const primaryColors = getColors(mode, primaryColor);
	const cssColors = getColorVariables2(mode, primaryColors);
	cssVars({
		watch: true,
		onlyLegacy: true,
		variables: cssColors,
	});
	return cssColors;
};

export const changeColor = (color: string, mode: 'light' | 'dark' = 'light') => {
	const primaryColors = getColors(mode, color);
	const cssColors = getColorVariables2(mode, primaryColors);
	cssVars({
		watch: true,
		onlyLegacy: true,
		variables: cssColors,
	});
	return cssColors;
};

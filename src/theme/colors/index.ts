// 颜色相关的主题工具
import { getColorVariables } from './colorVariable';
import { getColors } from './colorBase';
import cssVars from 'css-vars-ponyfill';
import { useAppStore } from '@/store/modules/appConfig';
export const initColorTheme = () => {
	const html = document.documentElement;
	const appStore = useAppStore();
	const mode = (appStore.theme.mode as any) || 'light';
	html.setAttribute('app-theme', mode);
	const primaryColors = getColors(mode, appStore.theme.primary);
	const cssColors = getColorVariables(mode, primaryColors);
	cssVars({
		watch: true,
		onlyLegacy: true,
		variables: cssColors,
	});
};

export const changeColor = (color: string) => {
	const appStore = useAppStore();
	const mode = (appStore.theme.mode as any) || 'light';
	const primaryColors = getColors(mode, color);
	const cssColors = getColorVariables(mode, primaryColors);
	cssVars({
		watch: true,
		onlyLegacy: true,
		variables: cssColors,
	});
};

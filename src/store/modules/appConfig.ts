import { changeColor, initColorTheme } from '@/theme/colors';
import { getColorVariables2 } from '@/theme/colors/colorVariable';
import { baseColor } from '@/theme/colors/colorBase';
import { defineStore } from 'pinia';
import type { ThemeType } from '@/types/theme';
import type { ColorVariables } from '@/theme/colors/colorVariable';

// 应用相关的配置，如主题，布局等
export const useAppStore = defineStore('appConfig', {
	state: () => {
		return {
			theme: {
				mode: 'light',
				primary: baseColor.primary,
				colorVariables: getColorVariables2(),
			},
		};
	},
	actions: {
		setThemeMode(mode: ThemeType) {
			this.theme.mode = mode;
			const colors = initColorTheme(mode as any, this.theme.primary);
			console.log('after change theme', colors);
			this.setColorVariables(colors);
		},
		setPrimaryColor(primaryColor: string) {
			this.theme.primary = primaryColor;
			const colors = changeColor(primaryColor);
			this.setColorVariables(colors);
		},
		setColorVariables(colorVariables: ColorVariables) {
			this.theme.colorVariables = colorVariables;
		},
	},
	getters: {
		getThemeColors(state) {
			return state.theme.colorVariables;
		},
	},
	persist: {
		paths: ['theme'],
	},
});

import { changeColor, initColorTheme } from '@/theme/colors';
import { getColorVariables2 } from '@/theme/colors/colorVariable';
import { baseColor } from '@/theme/colors/colorBase';
import { defineStore } from 'pinia';
import type { ThemeType } from '@/types/theme';
import type { ColorVariables } from '@/theme/colors/colorVariable';
import { ThemeMode } from '@/constants/uiConfigConstants';

// 应用相关的配置，如主题，布局等
export const useAppStore = defineStore('appConfig', {
	state: () => {
		return {
			theme: {
				mode: ThemeMode.LIGHT,
				primary: baseColor.primary,
				colorVariables: getColorVariables2(),
			},
		};
	},
	actions: {
		setThemeMode(mode?: ThemeType) {
			console.log('setThememode', this.theme.mode, mode);
			this.theme.mode = mode || (this.theme.mode as any) || ThemeMode.LIGHT;
			const colors = initColorTheme(this.theme.mode as any, this.theme.primary);
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

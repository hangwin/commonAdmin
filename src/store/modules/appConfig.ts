import { changeColor, initColorTheme } from '@/theme/colors';
import { getColorVariables } from '@/theme/colors/colorVariable';
import { baseColor } from '@/theme/colors/colorBase';
import { defineStore } from 'pinia';
import type { ThemeType } from '@/types/theme';

// 应用相关的配置，如主题，布局等
export const useAppStore = defineStore('appConfig', {
	state: () => {
		return {
			theme: {
				mode: 'light',
				primary: baseColor.primary,
			},
		};
	},
	actions: {
		setThemeMode(mode: ThemeType) {
			this.theme.mode = mode;
			initColorTheme();
		},
		setPrimaryColor(primaryColor: string) {
			this.theme.primary = primaryColor;
			changeColor(primaryColor);
		},
	},
	getters: {
		getThemeColors(state) {
			return getColorVariables(state.theme.mode as any);
		},
	},
	persist: {
		paths: ['theme'],
	},
});

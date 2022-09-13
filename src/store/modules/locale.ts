import { LOCALE } from '@/constants/locale';
import { defineStore } from 'pinia';

export const useLocaleStore = defineStore('locale', {
	state: () => {
		return {
			locale: LOCALE.ZH_CN,
			fallback: LOCALE.ZH_CN,
			supportLangs: [LOCALE.EN, LOCALE.ZH_CN],
		};
	},
	actions: {
		setLocale(locale: LOCALE) {
			this.locale = locale;
		},
	},
	persist: {
		paths: ['locale'],
	},
});

import { LOCALE } from '@/constants/locale';
import { useLocaleStore } from '@/store/modules/locale';
import { computed, unref } from 'vue';
import { cacheLocaleModules, setHtmlLangAttrs } from './lang/localeUtil';
import { i18n } from './setupI18n';

const changeI18nLang = (locale: LOCALE) => {
	(i18n.global.locale as any).value = locale;
	useLocaleStore().setLocale(locale);
	setHtmlLangAttrs(locale);
};

export function useLocale() {
	const localeStore = useLocaleStore();
	const currentLocale = computed(() => localeStore.locale);
	const changeLocale = async (locale: LOCALE) => {
		const curLocale = unref(i18n.global.locale);
		if (locale === curLocale) {
			return locale;
		}
		// 之前已经加载过这个语言，就无须重复import
		if (cacheLocaleModules.includes(locale)) {
			changeI18nLang(locale);
			return locale;
		}
		// 未加载过这个语言包的，需要动态import
		const langModule = await import(`./lang/${locale}.ts`);
		if (!langModule.messages) {
			return;
		}
		i18n.global.setLocaleMessage(locale, langModule.messages[locale]);
		changeI18nLang(locale);
		cacheLocaleModules.push(locale);
		return locale;
	};
	return {
		currentLocale,
		changeLocale,
		t: i18n.global.t as any,
	};
}

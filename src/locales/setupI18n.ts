import type { App } from 'vue';
import { createI18n, I18nOptions } from 'vue-i18n';
import { useLocaleStore } from '@/store/modules/locale';
import { cacheLocaleModules, setHtmlLangAttrs } from './lang/localeUtil';
export let i18n: ReturnType<typeof createI18n>;
export const setupI18n = async (app: App) => {
	const localeStore = useLocaleStore();
	// 懒加载，不用一次性把所有的语言包都加载进来，只加载使用到的
	const localeModule = await import(`./lang/${localeStore.locale}.ts`);
	setHtmlLangAttrs(localeStore.locale);
	// 表示这个语言已经加载过了，下次切换的时候无需再加载文件了
	cacheLocaleModules.push(localeStore.locale);
	const options: I18nOptions = {
		// 设置成false才可以使用compositionApi
		legacy: false,
		locale: localeStore.locale,
		messages: {
			...localeModule.messages,
		},
		// 默认的语言
		fallbackLocale: localeStore.fallback,
		availableLocales: localeStore.supportLangs,
	};
	i18n = createI18n(options);
	app.use(i18n);
};

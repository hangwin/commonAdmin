import { LOCALE } from '@/constants/locale';
import { set } from 'lodash-es';
// 根据读取到的语言文件，构造出如下符合vue-i18n的语言配置，如下
// {
// 	messages: {
// 		en: {},
// 		'zh-CN': {}
// 	},
// }
export const loadLang = (langFiles: any) => {
	const localeConfig = Object.keys(langFiles)
		.map((key) => {
			const module = langFiles[key]?.default;
			const pathArr = key.replace('./', '').replace('.ts', '').split('/');
			console.log('en path', pathArr);
			// 拿到是那种语言 en | zh-CN
			const lang = pathArr.shift() as string;
			// 获取键名 比如是lang/en/dashboard/menu.ts这个文件 我们要取它里面的一个字段，就是$t('dashboard.menu.xxx');
			const keyPath = pathArr.join('.');
			console.log(lang, keyPath);
			return {
				lang,
				keyPath,
				module,
			};
		})
		.reduce((pre: any, cur) => {
			const { lang, keyPath, module } = cur;
			if (keyPath) {
				set(pre, lang, pre[lang] || {});
				set(pre[lang], keyPath, module);
			} else {
				set(pre, lang, module || {});
			}
			return pre;
		}, {});
	return localeConfig;
};

// 在html标签上设置lang属性
export const setHtmlLangAttrs = (locale: LOCALE) => {
	document.querySelector('html')?.setAttribute('lang', locale);
};

// 因为是动态加载，为了防止切换语言会重复加载已经加载过的文件，需要把加载过的语言缓存起来
export const cacheLocaleModules: any = [];

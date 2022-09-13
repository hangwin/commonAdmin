import { loadLang } from './localeUtil';
// 读取lang文件夹底下的所有语言包
// eager表示同步加载，默认是异步加载() => import('xxx')
const langFiles: any = import.meta.glob('./en/**/*.ts', { eager: true });

export const messages = loadLang(langFiles);
export default {
	...messages['en'],
};

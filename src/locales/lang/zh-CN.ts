import { loadLang } from './localeUtil';
// 读取lang文件夹底下的所有语言包
// eager表示同步加载，默认是异步加载() => import('xxx')
const langFiles: any = import.meta.glob('./zh-CN/**/*.ts', { eager: true });

export const messages = loadLang(langFiles);
console.log('zh-CN', messages);
export default {
	...messages['zh-CN'],
};

import { App } from 'vue';

export const vueInstall = <T>(component: T): T => {
	const comp: any = component;
	(comp as any).install = (app: App) => {
		app.component(comp.name, component);
	};
	return comp;
};

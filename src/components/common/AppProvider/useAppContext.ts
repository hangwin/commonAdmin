import type { InjectionKey } from 'vue';
import { inject, provide } from 'vue';

export interface AppGlobalProps {
	appPrefix: string;
}

export const key: InjectionKey<AppGlobalProps> = Symbol();

export const createAppContext = (context: AppGlobalProps) => {
	provide(key, context);
};

export const useAppContext = (): AppGlobalProps => {
	return inject(key, { appPrefix: '' });
};

import { GlobalConfig } from '@/types/config';

// 获取全局环境变量的hooks
export const useGlobalEnv = (): GlobalConfig => {
	const { VITE_APP_TITLE, VITE_API_DOMAIN, VITE_API_PREFIX } = import.meta.env;
	return {
		appTitle: VITE_APP_TITLE,
		apiDomain: VITE_API_DOMAIN,
		urlPrefix: VITE_API_PREFIX,
	};
};

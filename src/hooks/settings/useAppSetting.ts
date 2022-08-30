import { useAppContext } from '@/components/common/AppProvider/useAppContext';

export const useAppStyleSettings = (scope: string) => {
	const { appPrefix } = useAppContext();
	return {
		prefixCls: `${appPrefix}-${scope}`,
	};
};

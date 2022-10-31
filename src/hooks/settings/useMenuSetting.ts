import { MenuSetting, useAppStore } from '@/store/modules/appConfig';
import { computed } from 'vue';

export const useMenuSetting = () => {
	const appStore = useAppStore();
	const getCollapse = computed(() => appStore.menuSetting.collapse || false);

	const setMenuSetting = (setting: Partial<MenuSetting>) => {
		appStore.setMenuSetting(setting);
	};
	const toggleCollapse = () => {
		appStore.setMenuSetting({
			collapse: !appStore.menuSetting.collapse,
		});
	};
	return {
		getCollapse,
		setMenuSetting,
		toggleCollapse,
	};
};

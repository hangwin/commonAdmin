import { MenuSetting, useAppStore } from '@/store/modules/appConfig';
import { computed } from 'vue';

export const useMenuSetting = () => {
	const appStore = useAppStore();
	const getCollapse = computed(() => appStore.menuSetting.collapsed || false);

	const setMenuSetting = (setting: Partial<MenuSetting>) => {
		appStore.setMenuSetting(setting);
	};
	const toggleCollapse = () => {
		appStore.setMenuSetting({
			collapsed: !appStore.menuSetting.collapsed,
		});
	};
	return {
		getCollapse,
		setMenuSetting,
		toggleCollapse,
	};
};

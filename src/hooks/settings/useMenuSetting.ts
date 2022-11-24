import { MenuSetting, useAppStore } from '@/store/modules/appConfig';
import { computed } from 'vue';

export const useMenuSetting = () => {
	const appStore = useAppStore();
	const getCollapse = computed(() => appStore.menuSetting.collapse || false);
	const getSiderWidth = computed(() =>
		getCollapse.value ? (appStore.menuSetting.showCollapsedTitle ? '80px' : '48px') : '210px'
	);
	const setMenuSetting = (setting: Partial<MenuSetting>) => {
		appStore.setMenuSetting(setting);
	};
	const toggleCollapse = () => {
		appStore.setMenuSetting({
			collapse: !appStore.menuSetting.collapse,
		});
	};
	const getIsShowCollapsedTitle = computed(() => appStore.menuSetting.showCollapsedTitle);
	return {
		getCollapse,
		setMenuSetting,
		toggleCollapse,
		getSiderWidth,
		getIsShowCollapsedTitle,
	};
};

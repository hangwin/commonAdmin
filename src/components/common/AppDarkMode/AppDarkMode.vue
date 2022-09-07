<template>
	<popver v-model:visiable="visiable">
		<svg-icon
			:name="iconName"
			size="21"
			:color="comonentColorProp.textColor"
			class="cursor-pointer"
		></svg-icon>
		<template #content>
			<div
				v-for="item in themeModes"
				:key="item.type"
				class="flex items-center w-[110px] overflow-hidden p-1 cursor-pointer rounded text-$h-text-color-secondary bg-$h-fill-form-bg hover:bg-$h-fill-bg-hover"
				@click="changeDarkMode(item.type)"
			>
				<svg-icon
					:name="item.icon"
					size="21"
					:color="comonentColorProp.textColor"
				></svg-icon>
				<span class="ml-2">{{ item.name }}</span>
			</div>
		</template>
	</popver>
</template>
<script lang="ts" setup>
import { useAppStore } from '@/store/modules/appConfig';
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue';
import popver from '../popover/popver.vue';
import { computed, ref } from 'vue';
import type { ThemeConfig, ThemeType } from '@/types/theme';
import { ThemeMode } from '@/constants/uiConfigConstants';
const appStore = useAppStore();
const iconName = computed(() => {
	switch (appStore.theme.mode) {
		case ThemeMode.LIGHT:
			return 'sun';
		case ThemeMode.DARK:
			return 'moon';
		default:
			return 'theme';
	}
});
const visiable = ref(false);
const comonentColorProp = computed(() => {
	return {
		textColor: appStore.getThemeColors['--h-text-color-secondary'],
	};
});

const themeModes: ThemeConfig[] = [
	{
		name: '浅色',
		type: ThemeMode.LIGHT,
		icon: 'sun',
	},
	{
		name: '深色',
		type: ThemeMode.DARK,
		icon: 'moon',
	},
];
// 浏览器支持黑暗模式
if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
	themeModes.push({
		name: '跟随系统',
		type: 'system',
		icon: 'theme',
	});
}
const changeDarkMode = (mode: ThemeType) => {
	visiable.value = false;
	if (mode === appStore.theme.mode) {
		return;
	}
	console.log('changeDarkMode', mode);
	if (mode === 'system') {
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			appStore.setThemeMode(ThemeMode.DARK);
			return;
		}
		appStore.setThemeMode(ThemeMode.LIGHT);
		return;
	}
	appStore.setThemeMode(mode);
};
</script>

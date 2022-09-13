<template>
	<popver v-model:visiable="visiable">
		<svg-icon
			name="lang"
			size="23"
			:color="comonentColorProp.textColor"
			class="cursor-pointer"
		></svg-icon>
		<template #content>
			<div
				v-for="item in themeModes"
				:key="item.type"
				class="flex items-center w-[110px] overflow-hidden p-1 cursor-pointer rounded text-$h-text-color-secondary bg-$h-fill-form-bg hover:bg-$h-fill-bg-hover"
				@click="changeLang(item.type)"
			>
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
import { LOCALE } from '@/constants/locale';
import { useLocale } from '@/locales/useLocale';
const { changeLocale } = useLocale();
const appStore = useAppStore();
const visiable = ref(false);
const comonentColorProp = computed(() => {
	return {
		textColor: appStore.getThemeColors['--h-text-color-secondary'],
	};
});

const themeModes = [
	{
		name: '中文',
		type: LOCALE.ZH_CN,
		icon: '',
	},
	{
		name: 'English',
		type: LOCALE.EN,
		icon: '',
	},
];
const changeLang = (lang: LOCALE) => {
	changeLocale(lang);
};
</script>

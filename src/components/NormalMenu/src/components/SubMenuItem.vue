<template>
	<li :class="getSubMenuItemCls">
		<div :class="`${prefixCls}-submenu-title`" :style="getItemStyle" @click.stop="handleClick">
			<slot name="title"></slot>
			<svg-icon
				name="arrow-down"
				size="16"
				:class="`${prefixCls}-submenu-title-icon`"
				:color="comonentColorProp.iconColor"
			/>
		</div>
		<ul v-show="opened">
			<slot></slot>
		</ul>
	</li>
</template>
<script lang="ts" setup>
import { SvgIcon } from '@/components/SvgIcon';
import { useAppStyleSettings } from '@/hooks/settings/useAppSetting';
import { computed, getCurrentInstance, inject, ref } from 'vue';
import { useMenuItem } from './useMenu';
import { useAppStore } from '@/store/modules/appConfig';
import { MenuProvider } from './types';
defineProps({
	level: {
		type: Number,
		required: true,
	},
});
const { prefixCls } = useAppStyleSettings('menu');
const opened = ref(false);
const getSubMenuItemCls = computed(() => {
	return [
		`${prefixCls}-submenu`,
		{
			[`${prefixCls}-opened`]: opened.value,
		},
	];
});
const { getItemStyle } = useMenuItem(getCurrentInstance());
console.log(getCurrentInstance()?.props);
const appStore = useAppStore();
const comonentColorProp = computed(() => {
	return {
		iconColor: appStore.getThemeColors['--h-text-color-disabled'],
	};
});
const { props: parentMenuProps } = inject(`NormalMenu`) as MenuProvider;
const isAccordion = computed(() => parentMenuProps.accordion);
const handleClick = () => {
	// if (isA)
	opened.value = !opened.value;
};
</script>

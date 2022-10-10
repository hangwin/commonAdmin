<template>
	<li :class="getMenuItemClass" :style="getItemStyle" @click.stop="handleMenuItemClick">
		<slot></slot>
		<slot name="title"></slot>
	</li>
</template>
<script lang="ts" setup>
import { useAppStyleSettings } from '@/hooks/settings/useAppSetting';
import { computed, getCurrentInstance, inject, ref, watch } from 'vue';
import { MenuProvider } from './types';
import { useMenuItem, menuEmitter } from './useMenu';
const { prefixCls } = useAppStyleSettings('menu');
const props = defineProps({
	level: {
		type: Number,
		required: true,
	},
	path: {
		type: String,
		required: true,
	},
	disabled: {
		type: Boolean,
		default: false,
	},
});
const instance = getCurrentInstance();
const { getItemStyle, getParentList } = useMenuItem(instance);
const active = ref(false);
const getMenuItemClass = computed(() => {
	return [
		`${prefixCls}-item`,
		{
			[`${prefixCls}-item-active`]: active.value,
			[`${prefixCls}-item-selected`]: active.value,
			[`${prefixCls}-item-disabled`]: props.disabled,
		},
	];
});
const { currentActivePath } = inject<MenuProvider>('NormalMenu') as any;
const handleMenuItemClick = () => {
	if (props.disabled) {
		return;
	}
	menuEmitter.emit('menu-item-select', props.path);
	const { uidList } = getParentList();
	menuEmitter.emit('update-opened', {
		opened: false,
		parent: instance?.parent,
		uidList,
	});
};
watch(
	() => currentActivePath?.value,
	(newPath) => {
		if (newPath === props.path) {
			active.value = true;
			const { uidList } = getParentList();
			menuEmitter.emit('update-submenu-active-item', uidList);
		} else {
			active.value = false;
		}
	},
	{
		immediate: true,
	}
);
</script>

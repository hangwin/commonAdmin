<template>
	<li
		:class="getMenuItemClass"
		:style="rootMenuProps.collapse ? {} : getItemStyle"
		@click.stop="handleMenuItemClick"
	>
		<ElTooltip v-if="showToolTip" placement="right">
			<template #content><slot name="title"></slot></template>
			<div :class="`${prefixCls}-tooltip`">
				<slot></slot>
			</div>
		</ElTooltip>
		<template v-else>
			<slot></slot>
			<slot name="title"></slot>
		</template>
	</li>
</template>
<script lang="ts" setup>
import { useAppStyleSettings } from '@/hooks/settings/useAppSetting';
import { computed, getCurrentInstance, inject, ref, watch } from 'vue';
import { MenuProvider } from './types';
import { useMenuItem, menuEmitter } from './useMenu';
import { ElTooltip } from 'element-plus';
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
const { getItemStyle, getParentList, getParent } = useMenuItem(instance);
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
const { currentActivePath, props: rootMenuProps } = inject<MenuProvider>('NormalMenu') as any;
// 在最顶层的子菜单项才需要tooltip
const showToolTip = computed(() => rootMenuProps.collapse && getParent()?.type.name === 'Menu');
console.log('showToolTip', rootMenuProps.collapse, getParent()?.type.name);
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

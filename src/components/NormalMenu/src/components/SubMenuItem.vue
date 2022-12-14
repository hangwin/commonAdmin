<template>
	<li :class="getSubMenuItemCls">
		<!-- 非折叠状态，展示完整的菜单 -->
		<template v-if="!isCollapse">
			<div
				:class="`${prefixCls}-submenu-title`"
				:style="getItemStyle"
				@click.stop="handleClick"
			>
				<slot name="title" :icon-prop="iconProp"></slot>
				<svg-icon
					name="arrow-down"
					size="13"
					:class="`${prefixCls}-submenu-title-icon`"
					:color="iconProp.iconColor"
				/>
			</div>
			<CollapseTransition>
				<ul v-show="state.opened" :class="prefixCls">
					<slot></slot>
				</ul>
			</CollapseTransition>
		</template>
		<!-- 折叠状态，只展示图标 -->
		<ElPopover
			v-else
			:show-arrow="false"
			:visible="popoverVisible"
			:popper-class="`${prefixCls}-popover`"
			placement="right"
		>
			<template #reference>
				<div :class="getSubMenuPopupCls" v-bind="getEvents()">
					<div
						:class="[
							{
								[`${prefixCls}-submenu-popup`]: level === 1,
								[`${prefixCls}-submenu-collapse-show-title`]: showCollapsedTitle,
							},
						]"
					>
						<slot name="title" :icon-prop="iconProp"></slot>
					</div>
					<svg-icon
						v-if="level !== 1"
						name="arrow-down"
						size="13"
						:class="`${prefixCls}-submenu-title-icon`"
						:color="iconProp.iconColor"
					/>
				</div>
			</template>
			<div>
				<ul
					:class="[prefixCls, `${prefixCls}-popup`, `${prefixCls}-${getTheme}`]"
					v-bind="getEvents()"
				>
					<slot></slot>
				</ul>
			</div>
		</ElPopover>
	</li>
</template>
<script lang="ts" setup>
import { SvgIcon } from '@/components/SvgIcon';
import { useAppStyleSettings } from '@/hooks/settings/useAppSetting';
import { computed, getCurrentInstance, inject, onBeforeMount, ref, onBeforeUnmount } from 'vue';
import { useMenuItem, menuEmitter, useMenuPoperMouseEvent } from './useMenu';
import { useAppStore } from '@/store/modules/appConfig';
import { MenuProvider } from './types';
import { CollapseTransition } from '@/components/Transition';
import { ElPopover } from 'element-plus';
defineOptions({
	name: 'SubMenu',
});
const props = defineProps({
	level: {
		type: Number,
		required: true,
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	path: {
		type: String,
		required: true,
	},
	// 折叠状态下是否展示title,
	showCollapsedTitle: Boolean,
});
const { prefixCls } = useAppStyleSettings('menu');
const state = ref({
	active: false,
	opened: false,
});
const getSubMenuItemCls = computed(() => {
	return [
		`${prefixCls}-submenu`,
		{
			[`${prefixCls}-opened`]: state.value.opened,
			[`${prefixCls}-item-active`]: state.value.active,
			[`${prefixCls}-subitem-active`]: state.value.active,
			[`${prefixCls}-submenu-disabled`]: props.disabled,
		},
	];
});
const getSubMenuPopupCls = computed(() => {
	return [
		`${prefixCls}-submenu-title`,
		{
			[`${prefixCls}-submenu-collapse`]: isCollapse.value && props.level === 1,
		},
	];
});
const instance = getCurrentInstance();
const { getItemStyle, getParentList } = useMenuItem(instance);
const { getEvents } = useMenuPoperMouseEvent(instance);
const appStore = useAppStore();
const iconProp = computed(() => {
	return {
		iconColor: state.value.active
			? appStore.getThemeColors['--h-primary-hover']
			: appStore.getThemeColors['--h-text-color-disabled'],
	};
});
const { props: parentMenuProps } = inject(`NormalMenu`) as MenuProvider;
const isAccordion = computed(() => parentMenuProps.accordion);
const isCollapse = computed(() => parentMenuProps.collapse);
const getTheme = computed(() => parentMenuProps.theme);
const handleClick = () => {
	if (props.disabled) {
		return;
	}
	const curOpened = state.value.opened;
	// 如果是手风琴效果，则需要将其他子菜单折叠起来
	if (isAccordion.value) {
		const { uidList } = getParentList();
		menuEmitter.emit('update-opened', {
			opened: false,
			parent: instance?.parent,
			uidList,
		});
	} else {
		console.log('test');
	}
	state.value.opened = !curOpened;
};

const updateSubmenuActiveItemHandler = (uidList: any) => {
	if (instance?.uid) {
		state.value.active = (uidList as number[]).includes(instance.uid);
	}
};
const popoverVisible = ref(false);
onBeforeMount(() => {
	menuEmitter.on('update-submenu-active-item', updateSubmenuActiveItemHandler);
	menuEmitter.on('update-opened', (data) => {
		if (typeof data === 'string') {
			state.value.opened = data.includes(props.path);
			return;
		}
		// 设置了手风琴效果，则打开一个子菜单的时候，其他的子菜单需要关闭，opened用于显示打开状态下的样式
		if (isAccordion.value) {
			const { opened, parent, uidList } = data as any;
			console.log('--->', uidList, instance?.uid, parent === instance?.parent);
			if (parent === instance?.parent) {
				state.value.opened = opened;
			} else if (!uidList.includes(instance?.uid)) {
				state.value.opened = false;
			}
			return;
		}
	});
	menuEmitter.on('update-popover', (data) => {
		const { path, type } = data as any;
		const pathArr = path.split('');
		const curPathArr = props.path.split('');
		// 子item打开的情况下，父item不能消失
		// 当前的subitem是path这个item的父item，当前这个item就要打开
		if (pathArr.length > curPathArr.length) {
			if (path.includes(props.path)) {
				// if (!isHover) {
				// 	popoverVisible.value = type === 'leave' ? false : true;
				// } else {
				// 	popoverVisible.value = true;
				// }
				popoverVisible.value = type === 'leave' ? false : true;
				console.log('update-popover', path, props.path, popoverVisible.value);
				return;
			}
		} else if (pathArr.length < curPathArr.length) {
			// 鼠标移进父item，父item的下一级子item需要显示
			// 当前的subitem是path这个item的直接子item
			//  则当鼠标进入path这个item时，当前的subitem要打开
			//  当鼠标移出path这个item时，当前的subitem要消失
			if (pathArr.length + 1 === curPathArr.length) {
				if (props.path.includes(path)) {
					popoverVisible.value = type === 'leave' ? false : true;
					console.log('update-popover', path, props.path, popoverVisible.value);
					return;
				}
			}
		} else {
			// 同级item
			if (props.path === path) {
				popoverVisible.value = type === 'leave' ? false : true;
				return;
			}
		}
		popoverVisible.value = false;
		console.log('update-popover', path, props.path, popoverVisible.value);
	});
});
onBeforeUnmount(() => {
	menuEmitter.off('update-submenu-active-item', updateSubmenuActiveItemHandler);
	// menuEmitter.off('update-opened');
	// console.log(`instance.uid: ${instance?.uid}卸载了`);
});
</script>

<template>
	<li :class="getSubMenuItemCls">
		<!-- 非折叠状态，展示完整的菜单 -->
		<template v-if="!isCollapse">
			<div
				:class="`${prefixCls}-submenu-title`"
				:style="getItemStyle"
				@click.stop="handleClick"
			>
				<slot name="title"></slot>
				<svg-icon
					name="arrow-down"
					size="16"
					:class="`${prefixCls}-submenu-title-icon`"
					:color="comonentColorProp.iconColor"
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
			:visible="true"
			:show-arrow="false"
			:popper-class="`${prefixCls}-popover`"
			placement="right"
		>
			<template #reference>
				<div :class="getSubMenuPopupCls">
					<div
						:class="[
							{
								[`${prefixCls}-submenu-popup`]: level === 1,
							},
						]"
					>
						<slot name="title"></slot>
						<svg-icon
							name="arrow-down"
							size="16"
							:class="`${prefixCls}-submenu-title-icon`"
							:color="comonentColorProp.iconColor"
						/>
					</div>
				</div>
			</template>
			<div>
				<ul :class="[prefixCls, `${prefixCls}-popup`, `${prefixCls}-${getTheme}`]">
					<slot></slot>
				</ul>
			</div>
		</ElPopover>
	</li>
</template>
<script lang="ts" setup>
import { SvgIcon } from '@/components/SvgIcon';
import { useAppStyleSettings } from '@/hooks/settings/useAppSetting';
import { computed, getCurrentInstance, inject, onMounted, ref } from 'vue';
import { useMenuItem, menuEmitter } from './useMenu';
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
const appStore = useAppStore();
const comonentColorProp = computed(() => {
	return {
		iconColor: appStore.getThemeColors['--h-text-color-disabled'],
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
onMounted(() => {
	menuEmitter.on('update-submenu-active-item', (uidList) => {
		if (instance?.uid) {
			state.value.active = (uidList as number[]).includes(instance.uid);
		}
	});
	menuEmitter.on('update-opened', (data) => {
		// 设置了手风琴效果，则打开一个子菜单的时候，其他的子菜单需要关闭，opened用于显示打开状态下的样式
		if (isAccordion.value) {
			const { opened, parent, uidList } = data as any;
			if (parent === instance?.parent) {
				state.value.opened = opened;
			} else if (!uidList.includes(instance?.uid)) {
				state.value.opened = false;
			}
			return;
		}
	});
});
</script>

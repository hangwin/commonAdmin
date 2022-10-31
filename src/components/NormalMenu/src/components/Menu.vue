<template>
	<ul :class="getMenuCls">
		<slot></slot>
	</ul>
</template>
<script lang="ts" setup>
import { useAppStyleSettings } from '@/hooks/settings/useAppSetting';
import {
	computed,
	getCurrentInstance,
	onMounted,
	provide,
	ref,
	watchEffect,
	watch,
	unref,
	nextTick,
} from 'vue';
import { MenuProvider } from './types';
import { menuEmitter } from './useMenu';
import { useRoute } from 'vue-router';
defineOptions({
	name: 'Menu',
});
const props = defineProps({
	// 子菜单缩进大小
	indentSize: {
		type: Number,
		default: 16,
	},
	// 手风琴效果，点开一个菜单的时候，其他的菜单收起
	accordion: {
		type: Boolean,
		default: true,
	},
	theme: {
		type: String,
		default: 'light',
	},
	// 是否折叠状态
	collapse: {
		type: Boolean,
		default: false,
	},
	openItems: {
		type: Array<string>,
		default: [],
	},
});
const emit = defineEmits(['select']);
// common-menu
const { prefixCls } = useAppStyleSettings('menu');
const getMenuCls = computed(() => {
	return [
		prefixCls,
		`${prefixCls}-vertical`,
		`${prefixCls}-${props.theme}`,
		{
			[`${prefixCls}-collapse`]: props.collapse,
		},
	];
});
const instance = getCurrentInstance();
const currentActivePath = ref('');
const curOpenItems = ref<string[]>([]);
watchEffect(() => {
	curOpenItems.value = props.openItems;
});
provide<MenuProvider>(`NormalMenu`, {
	props,
	currentActivePath,
	curOpenItems,
});
const route = useRoute();
watch(
	() => props.collapse,
	(cur) => {
		console.log('collapse', cur, route.path);
		nextTick(() => {
			menuEmitter.emit('update-opened', route.path);
		});
	}
);
onMounted(() => {
	menuEmitter.on('menu-item-select', (path) => {
		console.log('rootmenu item select', path);
		currentActivePath.value = path as string;
		emit('select', path);
	});
	menuEmitter.on('update-opened', (data: any) => {
		console.log('rootmenu updateopened', data.uidList);
		if (props.accordion) {
			curOpenItems.value = data.uidList;
		} else {
			curOpenItems.value = Array.from(new Set(...data.uidList));
		}
	});
});
</script>
<style lang="less">
@menu-cls: ~'@{namespace}-menu';
@menu-item-cls: ~'@{menu-cls}-item';
@submenu: ~'@{namespace}-submenu';
@submenu-title: ~'@{submenu}-title';
@light-primary: #605bff;
// 选中了某个菜单项之后，该菜单项后面有一根亮线提示
.light-border {
	&::after {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		display: block;
		width: 2px;
		background-color: var(--h-primary);
		content: '';
	}
}
.@{menu-cls}-popover.el-popover {
	padding: 0;
}
.@{menu-cls}-popover.el-popover.el-popper {
	padding: 0;
}
.@{menu-cls}-popover {
	.@{menu-cls} {
		&-item,
		&-submenu-title {
			position: relative;
			padding: 12px 20px;
			cursor: pointer;
			&-icon {
				position: absolute;
				top: 50%;
				right: 18px;
				transform: translateY(-50%) rotate(-90deg);
			}
		}
		&-light {
			.@{menu-cls}-item,
			.@{menu-cls}-submenu-title {
				opacity: 0.6;
				&:hover {
					color: @light-primary;
				}
				&-selected {
					color: @light-primary;
					/* stylelint-disable-next-line function-no-unknown */
					background-color: fade(@light-primary, 10);
					.light-border();
				}
			}
		}
	}
}
.@{menu-cls} {
	position: relative;
	display: block;
	width: 100%;
	height: 100%;
	margin: 0;
	padding: 0;
	color: var(--h-text-color-primary);
	font-size: 14px;
	list-style: none;
	background-color: var(--h-fill-form-bg);
	outline: none;
	user-select: none;
	&-light {
		background-color: #fff;
		.@{menu-cls}-item-active {
			color: @light-primary !important;
		}
	}
	.@{menu-item-cls} {
		position: relative;
		display: flex;
		align-items: center;
		color: inherit;
		list-style: none;
		outline: none;
		cursor: pointer;
		&:hover,
		&:active {
			color: var(--h-text-color-primary);
		}
	}
	.@{menu-item-cls} > i {
		margin-right: 6px;
	}
	&-item-disabled {
		color: var(--h-text-color-disabled);
	}
	&-vertical:not(&-collapse) &-submenu-title {
		display: flex;
		align-items: center;
	}
	&-vertical &-submenu-collapse {
		.@{menu-cls}-submenu-popup {
			display: flex;
			align-items: center;
			justify-content: center;
		}

	}
	&-vertical &-item,
	&-vertical &-submenu-title {
		position: relative;
		padding: 14px 24px;
		cursor: pointer;
		opacity: 0.6;
		&:hover {
			color: @light-primary;
			.@{menu-cls}-submenu-title-icon, .@{menu-cls}-title-icon {
				fill: @light-primary !important;
			}
		}
		.@{menu-cls}-tooltip {
			width: calc(100% - 0px);
			padding: 12px 0;
			text-align: center;
		}
		.@{menu-cls}-submenu-popup {
			padding: 12px 0;
		}
	}
	&-vertical&-collapse &-item,
	&-vertical&-collapse &-submenu-title {
		padding: 0;
	}
	&-vertical &-submenu-title-icon {
		position: absolute;
		top: 50%;
		right: 18px;
		transform: translateY(-50%);
	}
	&-submenu-title-icon {
		transition: transform 0.3s ease-in-out;
	}
	&-vertical &-opened > * > &-submenu-title-icon {
		transform: translateY(-50%) rotate(180deg);
	}
	&-light&-vertical &-item {
		&-active:not(.@{menu-cls}-subitem-active) {
			color: @light-primary;
			/* stylelint-disable-next-line function-no-unknown */
			background-color: fade(@light-primary, 10);
			.light-border();
		}
		&-active.@{menu-cls}-submenu{
			color: @light-primary;
		}
		&-active {
			.@{menu-cls}-submenu-title-icon, .@{menu-cls}-title-icon {
				fill: @light-primary !important;
			}
		}
	}
	&-light&-vertical&-collapse {
		.@{menu-cls}-item-active {
			position: relative;
			/* stylelint-disable-next-line function-no-unknown */
			background-color: fade(@light-primary, 10);
			// 这里清除掉上面的after
			&::after {
				display: none;
			}
			&::before {
				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				display: block;
				width: 2px;
				background-color: var(--h-primary);
				content: '';
			}
		}
	}
	// &-light&-vertical&-collapse {
	// 	> .@{menu-cls}-item-active {

	// 	}
	// }
}
</style>

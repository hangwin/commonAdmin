<template>
	<ul :class="getMenuCls">
		<slot></slot>
	</ul>
</template>
<script lang="ts" setup>
import { useAppStyleSettings } from '@/hooks/settings/useAppSetting';
import { computed, getCurrentInstance, onMounted, provide, ref } from 'vue';
import { MenuProvider } from './types';
import { menuEmitter } from './useMenu';
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
});
const emit = defineEmits(['select']);
// common-menu
const { prefixCls } = useAppStyleSettings('menu');
const getMenuCls = computed(() => {
	return [prefixCls, `${prefixCls}-vertical`, `${prefixCls}-${props.theme}`];
});
const instance = getCurrentInstance();
const currentActivePath = ref('');
provide<MenuProvider>(`NormalMenu`, {
	props,
	currentActivePath,
});
onMounted(() => {
	menuEmitter.on('menu-item-select', (path) => {
		console.log('rootmenu item select', path);
		currentActivePath.value = path as string;
		emit('select');
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
		.@{submenu}-active {
			color: var(--h-text-color-primary) !important;
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
			color: inherit;
		}
	}
	.@{menu-item-cls} > i {
		margin-right: 6px;
	}
	&-item-disabled {
		color: var(--h-text-color-primary);
	}
	&-vertical &-item,
	&-vertical &-submenu-title {
		position: relative;
		padding: 14px 24px;
		cursor: pointer;
		opacity: 0.6;
		&:hover {
			color: var(--h-text-color-primary);
		}
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
	}
}
</style>

<template>
	<ul :class="getMenuCls">
		<slot></slot>
	</ul>
</template>
<script lang="ts" setup>
import { useAppStyleSettings } from '@/hooks/settings/useAppSetting';
import { computed } from 'vue';
defineProps({
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
});
// common-menu
const { prefixCls } = useAppStyleSettings('menu');
const getMenuCls = computed(() => {
	return [prefixCls, `${prefixCls}-vertical`];
});
</script>
<style lang="less">
@menu-cls: ~'@{namespace}-menu';
@menu-item-cls: ~'@{menu-cls}-item';
@submenu: ~'@{namespace}-submenu';
@submenu-title: ~'@{submenu}-title';
.@{menu-cls} {
	position: relative;
	display: block;
	width: 100%;
	height: 100%;
	margin: 0;
	padding: 0;
	color: var(--h-text-color-disabled);
	font-size: 14px;
	list-style: none;
	background-color: var(--h-fill-form-bg);
	outline: none;
	user-select: none;
	.@{menu-item-cls} {
		position: relative;
		display: flex;
		align-items: center;
		list-style: none;
		outline: none;
		cursor: pointer;
	}
	&-vertical &-item,
	&-vertical &-submenu-title {
		position: relative;
		padding: 14px 24px;
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
}
</style>

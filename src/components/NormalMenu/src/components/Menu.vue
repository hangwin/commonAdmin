<template>
	<ul :class="getMenuCls">
		<slot></slot>
	</ul>
</template>
<script lang="ts" setup>
import { useAppStyleSettings } from '@/hooks/settings/useAppSetting';
import { computed } from 'vue';

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
	color: var(--h-text-color-primary);
	font-size: @font-size-base;
	list-style: none;
	background-color: var(--h-fill-form-bg);
	outline: none;
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
}
</style>

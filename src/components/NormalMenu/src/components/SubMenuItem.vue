<template>
	<li :class="getSubMenuItemCls">
		<div :class="`${prefixCls}-submenu-title`">
			<slot name="title"></slot>
		</div>
		<slot></slot>
	</li>
</template>
<script lang="ts" setup>
import { useAppStyleSettings } from '@/hooks/settings/useAppSetting';
import { computed } from 'vue';
const { prefixCls } = useAppStyleSettings('menu');
const getSubMenuItemCls = computed(() => {
	return [`${prefixCls}-submenu`];
});
</script>

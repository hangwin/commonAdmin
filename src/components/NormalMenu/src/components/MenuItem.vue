<template>
	<li :class="getMenuItemClass">
		<slot></slot>
	</li>
</template>
<script lang="ts" setup>
import { useAppStyleSettings } from '@/hooks/settings/useAppSetting';
import { computed } from 'vue';
const { prefixCls } = useAppStyleSettings('menu');
const getMenuItemClass = computed(() => {
	return [`${prefixCls}-item`];
});
</script>

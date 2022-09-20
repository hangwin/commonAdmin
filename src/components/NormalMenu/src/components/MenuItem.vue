<template>
	<li :class="getMenuItemClass" :style="getItemStyle">
		{{ level }}
		<slot></slot>
	</li>
</template>
<script lang="ts" setup>
import { useAppStyleSettings } from '@/hooks/settings/useAppSetting';
import { computed, getCurrentInstance } from 'vue';
import { useMenuItem } from './useMenu';
const { prefixCls } = useAppStyleSettings('menu');
const props = defineProps({
	level: {
		type: Number,
		required: true,
	},
});
const { getItemStyle } = useMenuItem(getCurrentInstance());
const getMenuItemClass = computed(() => {
	return [`${prefixCls}-item`];
});
</script>

<template>
	<slot></slot>
</template>
<script lang="ts" setup>
// 用于注入全局变量的组件
import { appPrefix } from '@/constants/uiConfigConstants';
import { createAppContext } from './useAppContext';
const props = defineProps({
	appPrefix: {
		type: String,
		default: appPrefix,
	},
});
createAppContext({ appPrefix: props.appPrefix });
</script>

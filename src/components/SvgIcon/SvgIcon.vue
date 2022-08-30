<template>
	<svg :class="[prefixCls]" :style="svgStyle" v-bind="$attrs" aria-hidden="true">
		<use :xlink:href="symbolId" />
	</svg>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { useAppStyleSettings } from '@/hooks/settings/useAppSetting';
const props = defineProps({
	name: {
		type: String,
		required: true,
	},
	size: {
		type: [Number, String],
		default: 16,
	},
	customStyle: {
		type: Object,
		default: () => ({}),
	},
	color: {
		type: String,
		default: '#888',
	},
	hoverColor: {
		type: String,
		default: '',
	},
});
const symbolId = computed(() => `#icon-${props.name}`);
const svgStyle = computed(() => {
	const size = `${props.size}`;
	// 同时兼容16 和 16px两种size的写法，有px就将px去掉，再统一加上px
	const normalizeSize = `${size.replace('px', '')}px`;
	const style: any = {
		...props.customStyle,
		width: normalizeSize,
		height: normalizeSize,
		'--svg-color': props.color,
		'--svg-hover-color': props.hoverColor === '' ? props.color : props.hoverColor,
	};
	return style;
});
const { prefixCls } = useAppStyleSettings('svg-icon');
</script>
<style lang="less" scoped>
// @prefix-cls: ~'@{namespace}-svg-icon';

// .@{prefix-cls} {
// 	display: inline-block;
// 	overflow: hidden;
// 	fill: currentColor;
// }
.common-svg-icon {
	display: inline-block;
	overflow: hidden;
	fill: var(--svg-color);
}

.common-svg-icon:hover {
	fill: var(--svg-hover-color);
}
</style>

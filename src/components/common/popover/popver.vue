<template>
	<div
		class="relative"
		@mouseenter="showContent"
		@mousedown="showContent"
		@mouseleave="hideContent"
	>
		<div ref="mainContent">
			<!-- popover的固定展示内容 -->
			<slot></slot>
		</div>
		<transition name="content">
			<!-- 鼠标移上去才会展示的内容 -->
			<div
				v-show="visiable"
				ref="hoverContent"
				class="absolute p-1 z-30 border bg-$h-fill-form-bg rounded-md mt-2 border-$h-border-color"
				:style="hoverPosition"
			>
				<slot name="content"></slot>
			</div>
		</transition>
	</div>
</template>
<script lang="ts">
const positonEnum = ['top-left', 'bottom-left', 'top-right', 'bottom-right'];
</script>
<script lang="ts" setup>
import { nextTick, ref, watch } from 'vue';
const props = defineProps({
	position: {
		type: String,
		default: 'bottom-left',
		validator(val: string) {
			if (!positonEnum.includes(val)) {
				throw new Error(`position属性仅支持${positonEnum.join('|')}这些值`);
			}
			return true;
		},
	},
	visiable: {
		type: Boolean,
		default: false,
	},
});
const emit = defineEmits(['update:visiable']);
let timer: any = null;
const showContent = () => {
	clearTimeout(timer);
	console.log('showContent');
	emit('update:visiable', true);
};
const hideContent = () => {
	timer = setTimeout(() => {
		emit('update:visiable', false);
	}, 300);
};
const hoverContent = ref(null);
const mainContent = ref(null);
const getElementSize = (elm: HTMLElement) => {
	if (!elm) {
		return { width: 0, height: 0 };
	}
	return {
		width: elm.offsetWidth,
		height: elm.offsetHeight,
	};
};
const hoverPosition = ref({
	left: '0',
	top: '0',
});
watch(
	() => props.visiable,
	(newVal) => {
		if (!newVal) {
			return;
		}
		nextTick(() => {
			const { width, height } = getElementSize(mainContent.value as any);
			const { width: w, height: h } = getElementSize(hoverContent.value as any);
			switch (props.position) {
				case 'top-left':
					hoverPosition.value.top = `${-h}px`;
					hoverPosition.value.left = `${-w}px`;
					return;
				case 'bottom-left':
					hoverPosition.value.top = `${height}px`;
					hoverPosition.value.left = `${-w}px`;
					return;
				case 'top-right':
					hoverPosition.value.top = `${-h}px`;
					hoverPosition.value.left = `${width}px`;
					return;
				case 'bottom-right':
					hoverPosition.value.top = `${height}px`;
					hoverPosition.value.left = `${width}px`;
					return;
				default:
					return;
			}
		});
	}
);
</script>
<style lang="less" scoped>
.content-enter-active,
.content-leave-active {
	transition: opacity 0.3s, transform 0.3s;
}

.content-enter-from,
.conten-leave-to {
	transform: translateY(40px);
	opacity: 0;
}
</style>

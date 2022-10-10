<template>
	<transition mode="out-in" name="collapse" v-on="on">
		<slot></slot>
	</transition>
</template>
<script lang="ts" setup>
import { addClass, removeClass } from '@/utils/domUtils';
defineOptions({
	name: 'CollapseTransition',
});
const on = {
	beforeEnter(el: any) {
		addClass(el, 'collapse-trans');
		if (!el.dataset) {
			el.dataset = {};
		}
		el.dataset.originPaddingTop = el.style.paddingTop;
		el.dataset.originPaddingBottom = el.style.paddingBottom;
		el.dataset.originOverflow = el.style.overflow;
		el.style.height = '0';
		el.style.paddingTop = '0';
		el.style.paddingBottom = '0';
	},
	enter(el: any) {
		el.style.overflow = 'hidden';
		el.style.paddingTop = el.dataset.originPaddingTop;
		el.style.paddingBottom = el.dataset.originPaddingBottom;
		if (el.scrollHeight !== 0) {
			el.style.height = el.scrollHeight + 'px';
		} else {
			el.style.height = '';
		}
	},
	afterEnter(el: any) {
		removeClass(el, 'collapse-trans');
		el.style.height = '';
		el.style.overflow = el.dataset.originOverflow;
	},
	beforeLeave(el: any) {
		if (!el.dataset) el.dataset = {};
		el.dataset.oldPaddingTop = el.style.paddingTop;
		el.dataset.oldPaddingBottom = el.style.paddingBottom;
		el.dataset.oldOverflow = el.style.overflow;

		el.style.height = el.scrollHeight + 'px';
		el.style.overflow = 'hidden';
	},

	leave(el: any) {
		if (el.scrollHeight !== 0) {
			addClass(el, 'collapse-trans');
			el.style.height = 0;
			el.style.paddingTop = 0;
			el.style.paddingBottom = 0;
		}
	},

	afterLeave(el: any) {
		removeClass(el, 'collapse-trans');
		el.style.height = '';
		el.style.overflow = el.dataset.oldOverflow;
		el.style.paddingTop = el.dataset.oldPaddingTop;
		el.style.paddingBottom = el.dataset.oldPaddingBottom;
	},
};
</script>
<style lang="less">
.collapse-trans {
	transition: 0.2s height ease-in-out, 0.2s padding-top ease-in-out,
		0.2s padding-bottom ease-in-out;
}
</style>

<template>
	<div class="login relative w-full h-full full-bg">
		<div class="absolute right-4 top-4 z-50"><AppDarkMode /></div>
		<div class="relative flex flex-wrap h-full w-full m-2">
			<!-- flex布局 with:100% height:100% 大尺寸时 width:50% -->
			<div
				v-for="(color, key) in colors"
				:key="key"
				:style="{ 'background-color': color }"
				class="w-24 h-24 m-2 m-2"
				>{{ `${key}: ${color}` }}
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import AppDarkMode from '@/components/common/AppDarkMode/AppDarkMode.vue';
import { useAppStore } from '@/store/modules/appConfig';
import { computed } from 'vue';
const appStore = useAppStore();
const colors = computed(() => {
	return appStore.getThemeColors;
});
</script>
<style lang="less">
.full-bg {
	background-color: var(--h-fill-bg);
}
</style>

<template>
	<el-container :class="getLayoutCls">
		<el-container>
			<el-aside><normal-menu></normal-menu></el-aside>
			<el-container>
				<el-header>头部</el-header>
				<el-main
					>主要内容区<div>{{ userStore.token }}</div></el-main
				>
				<el-footer>脚部</el-footer>
			</el-container>
		</el-container>
	</el-container>
</template>
<script lang="ts" setup>
import { ElContainer, ElHeader, ElMain, ElFooter, ElAside } from 'element-plus';
import { useUserStore } from '@/store/modules/user';
import { NormalMenu } from '@/components/NormalMenu';
import { useAppStyleSettings } from '@/hooks/settings/useAppSetting';
import { computed } from 'vue';
const userStore = useUserStore();
const { prefixCls } = useAppStyleSettings('layout');
const getLayoutCls = computed(() => {
	return [`${prefixCls}`];
});
</script>
<style lang="less">
@layout-cls: ~'@{namespace}-layout';
.@{layout-cls} {
	display: flex;
	flex-direction: column;
	width: 100%;
	min-height: 100%;
	background-color: var(--h-fill-bg);
}
</style>

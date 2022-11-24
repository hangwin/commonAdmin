<template>
	<el-container :class="getLayoutCls">
		<el-container>
			<el-aside :width="getWidth" style="transition: width 0.1s ease-in-out"
				><normal-menu :collapse="isCollapse"></normal-menu
			></el-aside>
			<el-container>
				<el-header
					>头部 <button @click="menuSetting.toggleCollapse">toggle</button>|
					<button @click="showTitle">collapseShowTitle</button>
				</el-header>
				<el-main>
					<RouterView></RouterView>
				</el-main>
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
import { useMenuSetting } from '@/hooks/settings/useMenuSetting';
const userStore = useUserStore();
const { prefixCls } = useAppStyleSettings('layout');
const getLayoutCls = computed(() => {
	return [`${prefixCls}`];
});
const menuSetting = useMenuSetting();
const isCollapse = computed(() => menuSetting.getCollapse.value);
const getWidth = computed(() => menuSetting.getSiderWidth.value);
const showTitle = () => {
	menuSetting.setMenuSetting({ showCollapsedTitle: true });
};
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

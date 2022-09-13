<template>
	<el-container>
		<el-container>
			<el-aside>侧边菜单</el-aside>
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
const userStore = useUserStore();
</script>

<template>
	<div class="relative w-full h-full full-bg">
		<!-- <div class="xl:hidden">logo 小尺寸才展示</div>
		<div>toolbar</div> -->
		<div class="relative flex h-full w-full">
			<div class="flex h-full w-full">
				<!-- flex布局 with:100% height:100% 大尺寸时 width:50% -->
				<div
					class="flex w-full h-full py-5 xl:h-auto xl:py-0 xl:my-0 xl:w-4/12 max-w-420px min-w-420px"
				>
					<div class="form relative w-full px-4 bg-white">
						<img
							src="@/assets/newlogo.svg"
							alt="CommonAdmin"
							class="w-92px h-92px mx-auto mt-120px"
						/>
						<div class="text-center mx-auto mt-30px text-gray-800 font-semibold text-xl"
							>登 录</div
						>
						<div class="mx-auto text-center mt-30px">
							<el-button type="primary" color="#f7f7f8">
								<span class="other-login-text">google</span>
							</el-button>
							<el-button type="primary" color="#f7f7f8">facebook</el-button>
						</div>
						<el-divider>或</el-divider>
						<div> form表单 </div>
					</div>
				</div>
				<!-- hidden隐藏  -->，
				<div
					class="hidden relative min-h-full pl-4 mr-4 mx-auto xl:flex xl:flex-col xl:w-8/12"
				>
					<img
						src="@/assets/login-img.svg"
						alt="CommonAdmin"
						class="w-1/2 mx-auto my-auto max-h-full"
					/>
					<span
						class="absolute left-0 right-0 top-3/4 text-gray-800 font-medium inline-block text-3xl text-center"
						>通用管理台模板</span
					>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { ElButton, ElDivider } from 'element-plus';
</script>
<style lang="less">
.full-bg {
	background-color: #fafafa;
}

.other-login-text {
	color: #030229;
	font-size: 16px;
	line-height: 22px;
}
</style>

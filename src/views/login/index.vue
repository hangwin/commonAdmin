<template>
	<div class="login relative w-full h-full full-bg duration-300">
		<!-- <div class="xl:hidden">logo 小尺寸才展示</div> -->
		<div class="absolute right-4 top-4 z-50"><AppDarkMode /></div>
		<!--  <lg:bg-[#293146] -->
		<div class="relative flex h-full w-full <lg:bg-$h-fill-mdsize-bg">
			<!-- flex布局 with:100% height:100% 大尺寸时 width:50% -->
			<div
				class="flex w-full h-full <sm:(mx-auto max-w-full) <md:max-w-4/5 <lg:(max-w-1/2 mx-auto) lg:(h-auto py-0 my-0 w-4/12 max-w-420px) min-w-350px"
			>
				<div
					class="form relative w-full px-12 bg-$h-fill-form-bg <sm:h-full <lg:(my-auto rounded-lg shadow-md) duration-300"
				>
					<img
						src="@/assets/newlogo.svg"
						alt="CommonAdmin"
						class="w-92px h-92px mx-auto mt-120px <sm:(mt-20 block) <lg:hidden"
					/>
					<div class="text-center mx-auto mt-30px text-$h-text-color-title text-xl">
						登 录
					</div>
					<div class="mt-30px">
						<PasswordLogin />
					</div>
				</div>
			</div>
			<!-- hidden隐藏  -->
			<div class="relative min-h-full pl-4 mr-4 mx-auto flex flex-col w-8/12 <lg:hidden">
				<img
					src="@/assets/login-img3.svg"
					alt="CommonAdmin"
					class="w-9/20 min-w-560px mx-auto my-auto min-h-670px max-h-full"
				/>
				<span
					class="absolute left-0 right-0 top-3/4 text-gray-600 font-medium inline-block text-3xl text-center"
					>通用管理台模板</span
				>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import PasswordLogin from './PasswordLogin.vue';
import AppDarkMode from '@/components/common/AppDarkMode/AppDarkMode.vue';
</script>
<style lang="less" scoped>
.full-bg {
	background-color: var(--h-fill-bg);
}
</style>

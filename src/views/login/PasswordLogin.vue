<template>
	<div>
		<el-form
			ref="formRef"
			label-position="top"
			:model="userInfo"
			:rules="formRules"
			status-icon
		>
			<el-form-item label="账 户" prop="account">
				<el-input v-model="userInfo.account" class="custom-input" size="large"></el-input>
			</el-form-item>
			<el-form-item label="密 码" prop="password">
				<el-input
					v-model="userInfo.password"
					type="password"
					show-password
					size="large"
				></el-input>
			</el-form-item>
			<el-form-item>
				<div class="w-full flex px-1 justify-between">
					<div class="text-size-12px leading-22px">
						<el-checkbox v-model="userInfo.isRememberMe" label="记住我" />
					</div>
					<el-button link color="#605BFF">重置密码</el-button>
				</div>
			</el-form-item>
			<el-form-item>
				<el-button
					class="w-full"
					color="#605BFF"
					size="large"
					:loading="isLoading"
					@click="login"
					>登 录</el-button
				>
			</el-form-item>
			<el-form-item>
				<div class="flex w-full justify-center">
					<span class="text-size-14px leading-30px">没有账号 ？</span>
					<el-button link color="#605BFF">去注册</el-button>
				</div>
			</el-form-item>
		</el-form>
	</div>
	<el-divider><span class="text-gray-500">其他登录方式</span></el-divider>
	<div class="mx-auto text-center flex justify-evenly mb-5">
		<svg-icon name="github" size="22" hover-color="#605bff" />
		<svg-icon name="weixin" size="22" hover-color="#605bff" />
		<svg-icon name="qq" size="22" hover-color="#605bff" />
		<svg-icon name="google" size="22" hover-color="#605bff" />
	</div>
</template>
<script lang="ts" setup>
import { ElButton, ElDivider, ElForm, ElFormItem, ElInput, ElCheckbox } from 'element-plus';
import { SvgIcon } from '@/components/SvgIcon';
import { ref } from 'vue';
import { useFormRules, useFormValid } from './useLogin';
import { useUserStore } from '@/store/modules/user';
const userInfo = ref({
	account: 'common',
	password: 'common',
	isRememberMe: false,
});
const formRef = ref(null);
const { formRules } = useFormRules();
const { validateForm } = useFormValid(formRef);
const userStore = useUserStore();
const isLoading = ref(false);
const login = async () => {
	try {
		isLoading.value = true;
		if (await validateForm()) {
			console.log('login submit', userInfo.value);
			await userStore.login({
				uid: userInfo.value.account,
				password: userInfo.value.password,
			});
		}
	} catch (error) {
		console.log('login error', error);
	} finally {
		isLoading.value = false;
	}
};
</script>
<style lang="less" scoped>
/* stylelint-disable-next-line selector-class-pattern */
:deep(.el-input__wrapper) {
	background-color: #f7f7f8;
	border: none;
	border-radius: 8px;
	box-shadow: none;
}

:deep(.el-button--text) {
	color: #605bff;

	span {
		font-size: 14px;
	}

	span:hover {
		color: #908cff;
	}
}

:deep(.el-button.is-link) {
	color: #605bff;
	font-size: 14px;

	span:hover {
		color: #908cff;
	}
}

:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
	background-color: #605bff;
}

:deep(.el-checkbox__input.is-checked + .el-checkbox__label) {
	color: #605bff;
}

:deep(.el-button--large) {
	border-radius: 8px;
}
</style>

<template>
	<div>
		<el-form
			ref="formRef"
			label-position="top"
			:model="userInfo"
			:rules="formRules"
			status-icon
		>
			<el-form-item
				label="账 户"
				prop="account"
				class="enter-x"
				@animationend="handleAnimationEnd"
			>
				<el-input
					v-model="userInfo.account"
					:class="[inputCls.account]"
					size="large"
				></el-input>
			</el-form-item>
			<el-form-item
				label="密 码"
				prop="password"
				class="enter-x"
				@animationend="handleAnimationEnd"
			>
				<el-input
					v-model="userInfo.password"
					:class="[inputCls.password]"
					type="password"
					show-password
					size="large"
				></el-input>
			</el-form-item>
			<el-form-item class="enter-x">
				<div class="w-full flex px-1 justify-between">
					<div class="text-size-12px leading-22px">
						<el-checkbox v-model="userInfo.isRememberMe" label="记住我" />
					</div>
					<el-button link :color="comonentColorProp.primaryColor">重置密码</el-button>
				</div>
			</el-form-item>
			<el-form-item class="enter-x">
				<el-button
					class="w-full"
					:color="comonentColorProp.primaryColor"
					size="large"
					:loading="isLoading"
					@click="login"
					>登 录</el-button
				>
			</el-form-item>
			<el-form-item class="enter-x">
				<div class="flex w-full justify-center">
					<span class="text-size-14px leading-30px text-$h-text-color-secondory"
						>没有账号 ？</span
					>
					<el-button link :color="comonentColorProp.primaryColor">去注册</el-button>
				</div>
			</el-form-item>
		</el-form>
	</div>
	<el-divider><span class="text-gray-500">其他登录方式</span></el-divider>
	<div class="mx-auto text-center flex justify-evenly mb-5 enter-x">
		<svg-icon name="github" size="22" :hover-color="comonentColorProp.primaryColor" />
		<svg-icon name="weixin" size="22" :hover-color="comonentColorProp.primaryColor" />
		<svg-icon name="qq" size="22" :hover-color="comonentColorProp.primaryColor" />
		<svg-icon name="google" size="22" :hover-color="comonentColorProp.primaryColor" />
	</div>
</template>
<script lang="ts" setup>
import { ElButton, ElDivider, ElForm, ElFormItem, ElInput, ElCheckbox } from 'element-plus';
import { SvgIcon } from '@/components/SvgIcon';
import { computed, ref } from 'vue';
import { useFormRules, useFormValid } from './useLogin';
import { useUserStore } from '@/store/modules/user';
import { useAppStore } from '@/store/modules/appConfig';
const userInfo = ref({
	account: 'common',
	password: 'common',
	isRememberMe: false,
});
const appStore = useAppStore();
const comonentColorProp = computed(() => {
	return {
		primaryColor: appStore.theme.primary,
	};
});
const inputCls = ref({
	account: '',
	password: '',
});
const cleanInputCls = () => {
	inputCls.value.account = '';
	inputCls.value.password = '';
};
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
	} catch (error: any) {
		console.log('login error', error);
		// 输入错误时给输入框增加抖动动画
		if (error?.account) {
			inputCls.value.account = 'shake-x';
		}
		if (error?.password) {
			inputCls.value.password = 'shake-x';
		}
	} finally {
		isLoading.value = false;
	}
};
const handleAnimationEnd = () => {
	cleanInputCls();
};
</script>
<style lang="less" scoped>
/* stylelint-disable-next-line selector-class-pattern */
:deep(.el-input__wrapper) {
	background-color: var(--h-fill-input-bg);
	border: none;
	border-radius: 8px;
	box-shadow: none;
}

:deep(.el-checkbox__inner) {
	background-color: var(--h-fill-input-bg);
}

:deep(.el-divider__text) {
	background-color: var(--h-fill-form-bg);
}

:deep(.el-button--text) {
	color: var(--h-primary);

	span {
		font-size: 14px;
	}

	span:hover {
		color: var(--h-primary-hover);
	}
}

:deep(.el-form-item__label) {
	color: var(--h-text-color-secondory);
}

:deep(.el-button.is-link) {
	color: var(--h-primary);
	font-size: 14px;

	span:hover {
		color: var(--h-primary-hover);
	}
}

:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
	background-color: var(--h-primary);
}

:deep(.el-checkbox__input.is-checked + .el-checkbox__label) {
	color: var(--h-primary);
}

:deep(.el-button--large) {
	border-radius: 8px;
}
</style>

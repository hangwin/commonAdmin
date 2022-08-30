import { Ref, unref } from 'vue';
import { computed, ref } from 'vue';
import type { FormItemRule } from 'element-plus';
export enum LOGIN_ACTION {
	PASSWORD_LOGIN,
	OTP_LOGIN,
	REGISTER,
}
const loginAction = ref(LOGIN_ACTION.PASSWORD_LOGIN);
const checkAccount = (rule: any, value: any, callback: any) => {
	if (!value) {
		callback('请输入用户名');
		return;
	}
	callback();
};
export const useFormValid = (formRef: Ref<any>) => {
	const validateForm = async () => {
		const form = unref(formRef);
		if (!form) {
			return;
		}
		return await form.validate();
	};
	return {
		validateForm,
	};
};
export const useFormRules = () => {
	const getFormRules = (): { [prop: string]: FormItemRule[] } => {
		switch (loginAction.value) {
			case LOGIN_ACTION.PASSWORD_LOGIN:
				return {
					account: [
						{
							validator: checkAccount,
							trigger: 'blur',
						},
					],
					password: [
						{
							required: true,
							trigger: 'blur',
							message: '请输入密码',
						},
					],
				};
			default:
				return {
					account: [],
					password: [],
				};
		}
	};
	const formRules = computed(() => getFormRules());
	return { formRules };
};

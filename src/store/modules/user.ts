import { defineStore } from 'pinia';
import { login } from '@/api/apiList/user';
import { router } from '@/router';
export const useUserStore = defineStore('user', {
	state: () => {
		return {
			username: 'hangye',
			job: 'engineer',
			token: '',
		};
	},
	actions: {
		setUsername(uname: string) {
			this.username = uname;
		},
		async login(params: { uid: string; password: string }) {
			try {
				const data = await login(params);
				this.token = data.token;
				router.push('/');
			} catch (error) {
				console.log('login error', error);
			}
		},
	},
	getters: {
		getUserName(): string {
			return `${this.username} 666`;
		},
	},
	persist: {
		paths: ['token'],
		storage: sessionStorage,
	},
});

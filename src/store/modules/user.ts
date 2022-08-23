import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
	state: () => {
		return {
			username: 'hangye',
			job: 'engineer',
		};
	},
	actions: {
		setUsername(uname: string) {
			this.username = uname;
		},
	},
	getters: {
		getUserName(): string {
			return `${this.username} 666`;
		},
	},
	persist: {
		paths: ['job'],
	},
});

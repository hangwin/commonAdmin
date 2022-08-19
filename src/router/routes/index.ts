import type { RouteRecordRaw } from 'vue-router';
import { LOGIN, HOME } from '@/constants/routeName';
import Home from '@/views/home/index.vue';

const rootRoute: RouteRecordRaw = {
	path: '/',
	redirect: '/home',
};

const homeRoot: RouteRecordRaw = {
	path: '/home',
	name: HOME.HOME,
	component: Home,
	meta: {
		title: '首页',
	},
};

const loginRoute: RouteRecordRaw = {
	path: '/login',
	name: LOGIN.LOGIN,
	component: () => import('@/views/login/Login.vue'),
	meta: {
		title: '登录',
	},
};

export const routes = [rootRoute, loginRoute, homeRoot];

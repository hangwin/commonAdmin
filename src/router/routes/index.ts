import type { RouteRecordRaw } from 'vue-router';
import { LOGIN, HOME } from '@/constants/routeName';
import Home from '@/views/home/index.vue';
import { dashBoardRoute } from './dashboard';

const rootRoute: RouteRecordRaw = {
	path: '/',
	redirect: '/dashboard',
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
	component: () => import('@/views/login/index.vue'),
	meta: {
		title: '登录',
	},
};

const color: RouteRecordRaw = {
	path: '/colors',
	component: () => import('@/theme/colors/ColorDemo.vue'),
	meta: {
		title: '颜色测试',
	},
};

export const routes = [rootRoute, loginRoute, homeRoot, color, dashBoardRoute];

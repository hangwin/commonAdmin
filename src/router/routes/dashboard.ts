import type { RouteRecordRaw } from 'vue-router';
import { DASHBOARD } from '@/constants/routeName';
export const dashBoardRoute: RouteRecordRaw = {
	path: '/dashboard',
	name: DASHBOARD.DASHBOARD,
	component: () => import('@/layout/default/index.vue'),
	redirect: '/dashboard/summary',
	meta: {
		title: 'Dashboard',
	},
	children: [
		{
			path: 'summary',
			name: DASHBOARD.SUMMARY,
			component: () => import('@/views/dashboard/summary/index.vue'),
		},
		{
			path: 'workbench',
			name: DASHBOARD.WORKBENCH,
			component: () => import('@/views/dashboard/workbench/index.vue'),
		},
	],
};

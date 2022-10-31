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
		{
			path: 'test',
			name: 'test',
			component: () => import('@/views/dashboard/test/index.vue'),
			children: [
				{
					path: 'demo1',
					name: 'demo1',
					component: () => import('@/views/dashboard/test/demo1/index.vue'),
				},
				{
					path: 'demo2',
					name: 'demo2',
					component: () => import('@/views/dashboard/test/demo2/index.vue'),
				},
			],
		},
	],
};

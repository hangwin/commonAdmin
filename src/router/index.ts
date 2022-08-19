import { createRouter, createWebHistory } from 'vue-router';
import type { App } from 'vue';
import { routes } from './routes';
export const router = createRouter({
	// 以VITE_PUBLIC_PATH为根路径创建hash模式的路由
	history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
	routes,
	// 路由切换后，新的页面滚动回顶部
	scrollBehavior: () => ({ left: 0, top: 0 }),
});

export function setRouter(app: App) {
	app.use(router);
}

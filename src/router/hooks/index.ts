import type { Router } from 'vue-router';
// 设置路由钩子
export const setRouteHooks = (router: Router) => {
	setGlobalGard(router);
};
// 设置全局路由守卫
// 在这里可以做一些事情：如取消页面请求，全局loading等
const setGlobalGard = (router: Router) => {
	// 全局前置守卫
	router.beforeEach(async (to) => {
		console.log('全局前置守卫执行，下一跳路由', to);
	});
	// 全局前置守卫
	router.afterEach((to) => {
		console.log('全局后置守卫执行', to);
	});
};

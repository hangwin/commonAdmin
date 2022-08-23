import { createApp } from 'vue';
import './style.less';
import App from './App.vue';
import { setRouter, router } from '@/router';
import { setRouteHooks } from './router/hooks';
import { setupStore } from './store';
import 'virtual:windi.css';
if (import.meta.env.DEV) {
	console.log('这是开发才有的代码，其他环境不应该打包进来');
}
const app = createApp(App);
setRouter(app);
setRouteHooks(router);
setupStore(app);
app.mount('#app');

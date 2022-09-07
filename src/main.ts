import { createApp } from 'vue';
import '@/style/index.less';
import App from './App.vue';
import { setRouter, router } from '@/router';
import { setRouteHooks } from './router/hooks';
import { setupStore } from './store';
import 'virtual:windi.css';
import 'virtual:svg-icons-register';
import { useAppStore } from './store/modules/appConfig';

if (import.meta.env.DEV) {
	console.log('这是开发才有的代码，其他环境不应该打包进来');
}
const app = createApp(App);
setRouter(app);
setRouteHooks(router);
setupStore(app);
useAppStore().setThemeMode();
app.mount('#app');

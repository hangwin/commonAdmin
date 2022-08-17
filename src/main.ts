import { createApp } from 'vue';
import './style.less';
import App from './App.vue';
console.log(
	'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
);
console.log('a');
if (import.meta.env.DEV) {
	console.log('这是开发才有的代码，其他环境不应该打包进来');
}
createApp(App).mount('#app');

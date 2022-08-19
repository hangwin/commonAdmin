import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';
const resolvePath = (path: string) => {
	// 返回相对当前项目根目录下的路径
	console.log(resolve(process.cwd(), '.', path));
	return resolve(process.cwd(), '.', path);
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	// 项目根路径
	const root = process.cwd();
	console.log('mode', mode);
	const { VITE_PUBLIC_PATH } = loadEnv(mode, root);
	return {
		base: VITE_PUBLIC_PATH,
		plugins: [vue(), vueJsx()],
		resolve: {
			alias: [
				// import xxx from '@/path' -> import xxx from 'src/path'
				{
					find: /@\//,
					replacement: resolvePath('src') + '/',
				},
			],
		},
		build: {
			// 我们的构建产物需要兼容到es6
			target: 'es2015',
			// 假如要兼容安卓微信的webview
			cssTarget: 'chrome61',
			// 非生产环境下生成sourcemap
			sourcemap: mode !== 'prod',
			// 禁用gzip 压缩大小报告，因为压缩大型文件可能会很慢
			reportCompressedSize: false,
			// chunk大小超过1500kb是触发警告
			chunkSizeWarningLimit: 1500,
		},
		// server: {
		// 	// 开启https
		// 	https: true,
		// 	// 监听所有ip地址
		// 	// host: true,
		// 	// 端口默认是5173
		// 	port: 6666,
		// 	// 配置代理帮我们转发请求，解决跨域问题
		// 	proxy: {
		// 		// api/开头的请求将被转发到下面的target的地址
		// 		'api/': {
		// 			target: 'https://mock.com',
		// 			// 改变请求头的origin
		// 			changeOrigin: true,
		// 			// 支持代理websocket
		// 			ws: true,
		// 			// 路径重写 相当于把api/去掉
		// 			rewrite: (path) => path.replace(new RegExp(`^api/`), ''),
		// 		},
		// 	},
		// },
	};
});

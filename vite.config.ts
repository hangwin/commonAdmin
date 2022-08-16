import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';
const resolvePath = (path: string) => {
	// 返回相对当前项目根目录下的路径
	return resolve(process.cwd(), '.', path);
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	// 项目根路径
	const root = process.cwd();
	const { VITE_PUBLIC_PATH } = loadEnv(mode, root);
	return {
		base: VITE_PUBLIC_PATH,
		plugins: [vue(), vueJsx()],
		resolve: {
			alias: [
				// import xxx from '@/path' -> import xxx from 'src/path'
				{
					find: /@\//,
					replacement: resolvePath('src/'),
				},
			],
		},
	};
});

import { defineConfig } from 'vite-plugin-windicss';

export default defineConfig({
	theme: {
		extend: {
			colors: {
				pink: {
					600: 'yellow',
				},
			},
		},
	},
});

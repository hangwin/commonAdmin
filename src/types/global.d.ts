interface ImportMetaEnv {
	readonly VITE_APP_TITLE: string;
	readonly VITE_PUBLIC_PATH: string;
	readonly VITE_API_PATH: string;
	readonly VITE_API_DOMAIN?: string;
	readonly VITE_API_PREFIX: string;
	// 更多环境变量...
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
	readonly VITE_PUBLIC_PATH: string;
	readonly VITE_API_PATH: string;
	// 更多环境变量...
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

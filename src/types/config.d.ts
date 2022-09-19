export interface GlobalConfig {
	// 网站标题
	appTitle: string;
	// 接口域名
	apiDomain?: string;
	// 接口前缀
	urlPrefix?: string;
}

export interface MenuData {
	name: string;
	path: string;
	icon?: string;
	children?: MenuData[];
}

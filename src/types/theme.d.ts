export type ThemeType = 'light' | 'dark' | 'system';
export interface ThemeConfig {
	name: string;
	type: ThemeType;
	icon: string;
}

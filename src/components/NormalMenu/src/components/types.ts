import { Ref } from 'vue';

export interface ComponentProps {
	indentSize: number;
	accordion: boolean;
	collapse: boolean;
	theme: string;
}

export interface MenuProvider {
	props: ComponentProps;
	currentActivePath?: Ref<string>;
}

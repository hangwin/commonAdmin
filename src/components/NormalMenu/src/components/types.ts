import { Ref } from 'vue';

export interface ComponentProps {
	indentSize: number;
	accordion: boolean;
}

export interface MenuProvider {
	props: ComponentProps;
	currentActivePath?: Ref<string>;
}

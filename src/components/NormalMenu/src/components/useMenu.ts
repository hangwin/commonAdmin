import { ComponentInternalInstance, computed } from 'vue';

export const useMenuItem = (instance: ComponentInternalInstance | null) => {
	const getItemStyle = computed(() => {
		if (!instance) {
			return {};
		}
		const level = (instance.props.level as number) || 0;
		return {
			paddingLeft: level * 16 + 'px',
		};
	});
	return {
		getItemStyle,
	};
};

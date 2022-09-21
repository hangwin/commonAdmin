import { ComponentInternalInstance, computed } from 'vue';

const findParentByComponent = (
	name: string[] | string,
	instance: ComponentInternalInstance | null
): ComponentInternalInstance | null => {
	if (!instance) {
		return null;
	}
	if (typeof name === 'string') {
		name = [name];
	}
	let parent = instance.parent;
	while (parent) {
		console.log('findParentByComponent', parent);
		if (!name.includes(parent.type.name as string)) {
			parent = parent.parent;
		}
	}
	return parent;
};

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
	const getParentMenu = () => {
		return findParentByComponent('Menu', instance);
	};
	return {
		getItemStyle,
		getParentMenu,
	};
};

import { ComponentInternalInstance, computed } from 'vue';
import mitt from 'mitt';

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
		const rootMenu = getParentMenu();
		const indentSize = (rootMenu?.props.indentSize || 16) as number;
		const level = (instance.props.level as number) || 0;
		return {
			paddingLeft: level * indentSize + 'px',
		};
	});
	const getParentMenu = () => {
		return findParentByComponent('Menu', instance);
	};
	const getParentList = () => {
		let parent = instance;
		if (!parent) {
			return {
				uidList: [],
				list: [],
			};
		}
		const ret: any[] = [];
		while (parent && parent.type.name !== 'Menu') {
			if (parent.type.name === 'SubMenu') {
				ret.push(parent);
			}
			parent = parent.parent;
		}
		return {
			uidList: ret.map((item) => item.uid),
			list: ret,
		};
	};
	return {
		getItemStyle,
		getParentMenu,
		getParentList,
	};
};

export const menuEmitter = mitt();

import { ComponentInternalInstance, computed, inject, ref } from 'vue';
import mitt from 'mitt';
import { MenuProvider } from './types';

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
		} else {
			return parent;
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
	const getParent = () => {
		return findParentByComponent(['SubMenu', 'Menu'], instance);
	};
	return {
		getItemStyle,
		getParentMenu,
		getParentList,
		getParent,
	};
};

export const useMenuPoperMouseEvent = (instance: ComponentInternalInstance | null) => {
	const { props: parentMenuProps } = inject(`NormalMenu`) as MenuProvider;
	const isCollapse = computed(() => parentMenuProps.collapse);

	const timer = ref<any>(null);
	const handleMouseEnter = (e: Event) => {
		e.stopPropagation();
		if (instance?.props.disabled) {
			return;
		}
		clearTimeout(timer.value);
		setTimeout(() => {
			menuEmitter.emit('update-popover', { type: 'enter', path: instance?.props.path });
		}, 100);
	};
	const handleMouseLeave = (e: Event) => {
		e.stopPropagation();
		setTimeout(() => {
			menuEmitter.emit('update-popover', { type: 'leave', path: instance?.props.path });
		}, 100);
	};
	const getEvents = () => {
		if (!instance) {
			return {};
		}
		if (!isCollapse.value) {
			return;
		}
		return {
			onmouseenter: handleMouseEnter,
			onmouseleave: handleMouseLeave,
		};
	};
	return {
		getEvents,
	};
};

export const menuEmitter = mitt();

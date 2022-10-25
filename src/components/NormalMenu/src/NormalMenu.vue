<template>
	<Menu :accordion="true" :collapse="collapsed">
		<template v-for="item in menuData" :key="item.path">
			<SubMenu :item="item" :level="1" :collapse="collapsed"></SubMenu>
		</template>
	</Menu>
</template>
<script lang="ts" setup>
import Menu from './components/Menu.vue';
import SubMenu from './components/SubMenu.vue';
defineProps({
	collapsed: {
		type: Boolean,
		default: false,
	},
});
const menuData = [
	{
		name: 'dashboard',
		icon: 'lang',
		path: '/dashboard',
		children: [
			{
				name: 'summary',
				path: '/dashboard/summary',
			},
			{
				name: '菜单1-1',
				path: 'menu1-1',
				children: [
					{
						name: '菜单1-1-1',
						path: 'menu1-1-1',
					},
				],
			},
			{
				name: '菜单1-2',
				path: 'menu1-2',
				children: [
					{
						name: '菜单1-2-1',
						path: 'menu1-2-1',
					},
				],
			},
		],
	},
	{
		name: '菜单2',
		icon: 'lang',
		path: 'menu2',
	},
];
</script>

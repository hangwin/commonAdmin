<template>
	<Menu :accordion="true">
		<template v-for="item in menuData" :key="item.path">
			<SubMenu :item="item" :level="1"></SubMenu>
		</template>
	</Menu>
</template>
<script lang="ts" setup>
import Menu from './components/Menu.vue';
import SubMenu from './components/SubMenu.vue';
const menuData = [
	{
		name: '菜单1',
		icon: 'icon1',
		path: 'menu1',
		children: [
			{
				name: '菜单1-1',
				icon: 'icon1-1',
				path: 'menu1-1',
				children: [
					{
						name: '菜单1-1-1',
						icon: 'icon1-1-1',
						path: 'menu1-1-1',
					},
				],
			},
			{
				name: '菜单1-2',
				icon: 'icon1-2',
				path: 'menu1-2',
				disabled: true,
				children: [
					{
						name: '菜单1-2-1',
						icon: 'icon1-2-1',
						path: 'menu1-2-1',
					},
				],
			},
		],
	},
	{
		name: '菜单2',
		icon: 'icon2',
		path: 'menu2',
	},
];
</script>

<template>
	<Menu :accordion="true" :collapse="collapse" @select="onItemSelect">
		<template v-for="item in menuData" :key="item.path">
			<SubMenu :item="item" :level="1" :collapse="collapse"></SubMenu>
		</template>
	</Menu>
</template>
<script lang="ts" setup>
import Menu from './components/Menu.vue';
import SubMenu from './components/SubMenu.vue';
import { useRouter } from 'vue-router';
const props = defineProps({
	collapse: {
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
				name: 'workbench',
				path: '/dashboard/workbench',
			},
			{
				name: 'test',
				path: '/dashboard/test',
				children: [
					{
						name: 'demo1',
						path: '/dashboard/test/demo1',
					},
					{
						name: 'demo2',
						path: '/dashboard/test/demo2',
						children: [
							{
								name: 'demo3',
								path: '/dashboard/test/demo2/demo22',
							},
						],
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
		path: '/dashboard/test/demo2',
	},
];

const router = useRouter();
const onItemSelect = (path: string) => {
	router.push(path);
};
</script>

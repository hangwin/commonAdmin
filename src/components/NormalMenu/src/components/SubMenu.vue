<template>
	<!-- 没有子菜单，则直接展示即可 -->
	<MenuItem v-if="!hasChildren" :level="level" :path="item.path">
		{{ item.name }}
	</MenuItem>
	<!-- 有子菜单，需要递归展示子菜单 -->
	<SubMenuItem v-if="hasChildren" :level="level">
		<template #title>
			<div>{{ level }} {{ item.name }} </div>
		</template>
		<template v-for="child in item.children" :key="child.path">
			<SubMenu :item="child" :level="level + 1"></SubMenu>
		</template>
	</SubMenuItem>
</template>
<script lang="ts" setup>
import { computed, PropType } from 'vue';
import type { MenuData } from '@/types/config';
import MenuItem from './MenuItem.vue';
import SubMenuItem from './SubMenuItem.vue';
const props = defineProps({
	item: {
		type: Object as PropType<MenuData>,
		required: true,
	},
	level: {
		type: Number,
		required: true,
	},
});
const hasChildren = computed(() => {
	return props.item.children && props.item.children.length > 0;
});
</script>

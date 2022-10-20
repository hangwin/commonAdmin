<template>
	<!-- 没有子菜单，则直接展示即可 -->
	<MenuItem v-if="!hasChildren" :level="level" :path="item.path">
		<svg-icon v-if="getIcon" :name="getIcon" size="16" class="cursor-pointer"></svg-icon>
		<template #title>
			<span :class="['ml-2', `${prefixCls}-sub-title`]">{{ item.name }}</span>
		</template>
	</MenuItem>
	<!-- 有子菜单，需要递归展示子菜单 -->
	<SubMenuItem v-if="hasChildren" :level="level" :disabled="item.disabled">
		<template #title>
			<svg-icon v-if="getIcon" :name="getIcon" size="16" class="cursor-pointer"></svg-icon>
			<span v-show="showSubTitle" :class="['ml-2', `${prefixCls}-sub-title`]">{{
				item.name
			}}</span>
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
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue';
import { useAppStyleSettings } from '@/hooks/settings/useAppSetting';

const { prefixCls } = useAppStyleSettings('menu');
const props = defineProps({
	item: {
		type: Object as PropType<MenuData>,
		required: true,
	},
	level: {
		type: Number,
		required: true,
	},
	collapse: Boolean,
});
const hasChildren = computed(() => {
	return props.item.children && props.item.children.length > 0;
});
const getIcon = computed(() => props.item.icon);
// 非折叠状态下显示title，或者折叠状态下但是不是第一层的子菜单也展示title
const showSubTitle = computed(() => !props.collapse || props.level !== 1);
</script>

<template>
	<!-- 没有子菜单，则直接展示即可 -->
	<MenuItem v-if="!hasChildren" :level="level" :path="item.path">
		<svg-icon
			v-if="getIcon"
			:name="getIcon"
			size="16"
			class="common-menu-title-icon cursor-pointer"
		></svg-icon>
		<template #title>
			<span :class="['ml-2', `${prefixCls}-sub-title`]">{{ item.name }}</span>
		</template>
	</MenuItem>
	<!-- 有子菜单，需要递归展示子菜单 -->
	<SubMenuItem
		v-if="hasChildren"
		:level="level"
		:disabled="item.disabled"
		:path="item.path"
		:show-collapsed-title="showCollapsedTitle"
	>
		<template #title="{ iconProp }">
			<svg-icon
				v-if="getIcon"
				:name="getIcon"
				size="16"
				class="common-menu-title-icon cursor-pointer"
				:color="iconProp.iconColor"
			></svg-icon>
			<span v-show="showSubTitle" :class="['ml-2', `${prefixCls}-sub-title`]">{{
				item.name
			}}</span>
			<!-- 折叠状态且是第一层菜单，且showCollapsedTitle为true才展示title -->
			<span v-show="showCollapsedTitle && isCollapseParent" class="mt-1 collapse-title">{{
				item.name
			}}</span>
		</template>
		<template v-for="child in item.children" :key="child.path">
			<SubMenu
				:item="child"
				:level="level + 1"
				:show-collapsed-title="showCollapsedTitle"
			></SubMenu>
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
	// 折叠状态下是否展示title,
	showCollapsedTitle: Boolean,
});
const hasChildren = computed(() => {
	return props.item.children && props.item.children.length > 0;
});
const getIcon = computed(() => props.item.icon);
// 非折叠状态下显示title，或者折叠状态下但是不是第一层的子菜单也展示title
const showSubTitle = computed(() => !props.collapse || props.level !== 1);
const isCollapseParent = computed(() => props.collapse && props.level === 1);
</script>

<template>
	<div v-for="item in data" :key="item.path" @click="handleClick(item)">
		{{ item.title }}
		<div v-if="item.children && showSub" class="pl-2">
			<Menu :data="item.children"></Menu>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { PropType, ref } from 'vue';
defineProps({
	data: {
		type: Array as PropType<Array<any>>,
		required: true,
	},
});
const handleClick = (item: any) => {
	console.log('menu item click', item.path);
	showSub.value = !showSub.value;
};
const showSub = ref(false);
</script>

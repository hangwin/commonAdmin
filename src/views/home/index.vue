<template>
	<div>{{ userStore.token }}</div>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/store/modules/user';
const userStore = useUserStore();
</script>

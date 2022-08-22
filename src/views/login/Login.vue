<template>
	<div> 登录页 </div>
	<br />
	<div> username: {{ username }} getUsername: {{ '' }} </div>
	<button
		@click="
			() => {
				userInfo.setUsername('test');
			}
		"
		>点击</button
	>
</template>
<script lang="ts" setup>
import { request } from '@/api/request';
import { getUserInfo } from '@/api/apiList/user';
import { useUserStore } from '@/store/modules/user';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
// https://mock.apifox.cn/m1/716135-0-default/users/getUserInfo
// request.post({ url: '/users/getUserInfo', data: { uid: '12345' } }).then((res) => {
// 	console.log('网络请求测试', res);
// });
getUserInfo({ uid: '12345' }).then((res) => {
	console.log('网络请求测试', res);
});
// request.post('/api/users/getUserInfo', { uid: '12345' }).then((res) => {
// 	console.log('网络请求测试2', res);
// });
const userInfo = useUserStore();
const username = computed(() => useUserStore().username);
</script>

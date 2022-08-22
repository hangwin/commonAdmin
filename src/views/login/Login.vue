<template>
	<div> 登录页 </div>
</template>
<script lang="ts" setup>
import { request } from '@/api/request';
import { getUserInfo } from '@/api/apiList/user';
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
</script>

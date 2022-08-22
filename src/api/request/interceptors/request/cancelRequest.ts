// 取消重复请求
import { AxiosRequestConfig } from 'axios';
import CancelRequest from '../../CancelRequest';

// 取消重复请求的拦截器
const handleCancelRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
	CancelRequest.addPending(config);
	return config;
};

export default handleCancelRequest;

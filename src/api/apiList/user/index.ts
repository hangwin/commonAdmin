import apiConfig from './apiConfig';
import { request } from '@/api/request';
export const getUserInfo = (params: { uid: string }) => {
	return request.post(apiConfig.getUserInfo, params);
};

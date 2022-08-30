import { ResponseResultCode } from '@/constants/httpConstants';
import { AxiosResponse } from 'axios';
import CancelRequest from '../../CancelRequest';
import { CustomOptions } from '../../Request';

// 通用响应处理
export const commonResponseHandler = (
	resp: AxiosResponse<any>,
	customOptions: CustomOptions
): AxiosResponse => {
	CancelRequest.removePending(resp.config);
	const { needOriginResponse } = customOptions;
	// 如果业务层需要原始的响应，则直接返回
	if (needOriginResponse) {
		return resp;
	}
	// 没有报文体
	if (!resp.data) {
		throw new Error('请求错误，请重试');
	}
	const { code, data, errmsg } = resp.data;
	// 业务成功状态码
	if (code === ResponseResultCode.SUCCESS) {
		console.log('data', data);
		return data;
	}
	// 业务失败处理
	throw new Error(errmsg || '系统繁忙');
};

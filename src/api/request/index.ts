// 网络请求主入口文件
import type { RequestOptions } from './Request';
import Request from './Request';
import { merge } from 'lodash-es';
import { useGlobalEnv } from '@/hooks/settings/useGlobalEnv';
import reqInterceptors from './interceptors/request';
import { ContentType } from '@/constants/httpConstants';
import { RequestRetry } from './RetryRequest';
import { commonResponseHandler } from './interceptors/response/commonResponseHandler';
import handleCancelRequest from './interceptors/request/cancelRequest';

const { handleUploadFile, handleUrlencoded } = reqInterceptors;
const getCommonOptions = (): RequestOptions => {
	const { apiDomain, urlPrefix } = useGlobalEnv();
	return {
		// 客户端超时时间20秒
		timeout: 20 * 1000,
		headers: {
			'Content-Type': ContentType.JSON,
		},
		customOptions: {
			apiDomain,
			urlPrefix,
			needToken: true,
		},
		hooks: {
			// 请求拦截器
			requestInterceptors: [
				handleUploadFile,
				handleUrlencoded,
				handleCancelRequest,
				(config, customOptions) => {
					const { apiDomain, urlPrefix } = customOptions;
					config.url = `${apiDomain || ''}${urlPrefix || ''}${config.url}`;
					console.log('请求拦截器:', config.url);
					// 请求需要携带token
					if (customOptions.needToken) {
						config.headers = {
							...config.headers,
							Authorization: `Bearer ${'token'}`,
						};
					}
					return config;
				},
			],
			responseInterceptors: commonResponseHandler,
			responseErrorInterceptors: (axiosInstance, error, customOptions) => {
				// 请求异常拦截器
				console.log('出错了', error);
				RequestRetry.retry(axiosInstance, error, customOptions);
				return Promise.reject(error);
			},
		},
	};
};
export function createRequest(options: RequestOptions = {}) {
	const commonOptions = getCommonOptions();
	// 需要将穿件来的options和公共的options合并
	const realOpts = merge(commonOptions, options);
	return new Request(realOpts);
}

export const request = createRequest();

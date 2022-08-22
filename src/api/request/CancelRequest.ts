import type { AxiosRequestConfig, Canceler } from 'axios';
import axios from 'axios';

// 请求方法，url，和参数相同，则认为是重复的请求
const getFullUrl = (config: AxiosRequestConfig) => {
	const { method, url, data, params } = config;
	let result = `${method}&${url}`;
	if (data) {
		result += `&${JSON.stringify(data)}`;
	}
	if (params) {
		result += `&${JSON.stringify(params)}`;
	}
	return result;
};
const cancelMap = new Map<string, Canceler>();
// 取消重复请求
class CancelRequest {
	static addPending(config: AxiosRequestConfig) {
		this.removePending(config);
		const url = getFullUrl(config);
		config.cancelToken =
			config.cancelToken ||
			new axios.CancelToken((cancel) => {
				if (!cancelMap.has(url)) {
					cancelMap.set(url, cancel);
				}
			});
	}
	static removePending(config: AxiosRequestConfig) {
		const url = getFullUrl(config);
		if (cancelMap.has(url)) {
			const cancel = cancelMap.get(url);
			cancel && cancel();
			cancelMap.delete(url);
		}
	}
}

export default CancelRequest;

import type { AxiosError, AxiosInstance } from 'axios';
import { CustomOptions } from './Request';

export class RequestRetry {
	static retry(axiosInstance: AxiosInstance, error: AxiosError, customOptions: CustomOptions) {
		const config: any = error.config;
		const retryRequest = customOptions.retryRequest;
		if (retryRequest) {
			const { retryTimes, waitTime } = retryRequest;
			config.retryTimes = config.retryTimes || 0;
			if (retryTimes >= retryTimes) {
				return Promise.reject(error);
			}
			config.retryTimes++;
			return new Promise((resolve) => {
				setTimeout(resolve, waitTime);
			}).then(() => {
				return axiosInstance(config);
			});
		}
	}
}

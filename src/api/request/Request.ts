import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
import { isFunction } from '@/utils/is';
import { cloneDeep } from 'lodash-es';
import Loading from './Loading';

export interface ApiConfig {
	url: string;
	name: string;
	showErrorMsg?: boolean;
	showLoading?: boolean;
}

const isApiConfig = (val: any): val is ApiConfig => {
	return val.url && val.name;
};

type RequestInterceptorType = (
	config: AxiosRequestConfig,
	customOptions: CustomOptions
) => AxiosRequestConfig;
type ResponseInterceptorType = (
	data: AxiosResponse<any>,
	customOptions: CustomOptions
) => AxiosResponse<any>;
type RequestErrorInterceptorType = (error: Error, customOptions: CustomOptions) => void;
type ResponseErrorInterceptorType = (
	axiosInstance: AxiosInstance,
	error: AxiosError,
	customOptions: CustomOptions
) => void;
export interface RequestHooks {
	// 请求拦截器
	requestInterceptors?: RequestInterceptorType | RequestInterceptorType[];
	// 响应拦截器
	responseInterceptors?: ResponseInterceptorType | ResponseInterceptorType[];
	// 请求错误拦截器
	requestErrorInterceptors?: RequestErrorInterceptorType | RequestErrorInterceptorType[];
	// 响应错误拦截器
	responseErrorInterceptors?: ResponseErrorInterceptorType | ResponseErrorInterceptorType[];
}

// 除了axios的options以外的自定义options
export interface CustomOptions {
	needToken?: boolean;
	apiDomain?: string;
	urlPrefix?: string;
	needOriginResponse?: boolean;
	showLoading?: boolean;
	retryRequest?: {
		retryTimes: number;
		waitTime?: number;
	};
}

export interface RequestOptions extends AxiosRequestConfig {
	// 存放请求和响应的钩子函数，比如请求/响应拦截器，请求前/响应前的钩子等
	hooks?: RequestHooks;
	customOptions?: CustomOptions;
}

/*
 * 网络请求工具类，对Axios二次封装
 */
export default class Request {
	private axiosInstance: AxiosInstance;
	private readonly options: RequestOptions;
	constructor(options: RequestOptions) {
		this.options = options;
		this.axiosInstance = axios.create(options);
		this.setInterceptors();
	}
	// 提供一个方法可以修改当前保存的axios实例
	setAxios(config: RequestOptions): void {
		this.axiosInstance = axios.create(config);
	}

	getAxios() {
		return this.axiosInstance;
	}
	getCustomOptions(curRequestOtions: CustomOptions): CustomOptions {
		const curOptions = Object.assign({}, this.options.customOptions, curRequestOtions);
		return curOptions;
	}
	// curHooks 如果有传，就表示是当次请求自定义的拦截器
	setInterceptors(curHooks?: RequestHooks, customOptions?: CustomOptions) {
		let hooks: RequestHooks = this.options?.hooks || {};
		if (curHooks) {
			hooks = curHooks;
		}
		if (!hooks) {
			return;
		}
		// 将所有拦截器都规范化为数组
		Object.keys(hooks).forEach((key) => {
			// @ts-ignore
			if (!Array.isArray(hooks[key])) {
				// @ts-ignore
				hooks[key] = [hooks[key]];
			}
		});
		const {
			requestInterceptors,
			responseInterceptors,
			requestErrorInterceptors,
			responseErrorInterceptors,
		} = hooks;
		// 请求拦截器，支持传多个
		if (requestInterceptors) {
			(requestInterceptors as RequestInterceptorType[]).forEach((interceptor) => {
				this.axiosInstance.interceptors.request.use((config) => {
					return interceptor(config, this.getCustomOptions(customOptions || {}));
				});
			});
		}

		if (requestErrorInterceptors) {
			(requestErrorInterceptors as RequestErrorInterceptorType[]).forEach((interceptor) => {
				this.axiosInstance.interceptors.request.use(undefined, (err) => {
					return interceptor(err, this.getCustomOptions(customOptions || {}));
				});
			});
		}

		// 响应拦截器
		if (responseInterceptors) {
			(responseInterceptors as ResponseInterceptorType[]).forEach((interceptor) => {
				this.axiosInstance.interceptors.response.use((resp) => {
					return interceptor(resp, this.getCustomOptions(customOptions || {}));
				});
			});
		}

		if (responseErrorInterceptors) {
			(responseErrorInterceptors as ResponseErrorInterceptorType[]).forEach((interceptor) => {
				this.axiosInstance.interceptors.response.use(undefined, (err) => {
					return interceptor(
						this.axiosInstance,
						err,
						this.getCustomOptions(customOptions || {})
					);
				});
			});
		}
	}
	request<T = any>(config: AxiosRequestConfig, curConfig?: RequestOptions): Promise<T> {
		// 将配置拷贝一份出来，避免污染源头
		config = cloneDeep(config);
		this.setInterceptors(curConfig?.hooks || {}, curConfig?.customOptions);
		const showLoading = curConfig?.customOptions?.showLoading;
		return new Promise((resolve, reject) => {
			if (showLoading) {
				if (Loading.loadingCount <= 0) {
					console.log('showLoading ....');
				}
				Loading.loadingCount++;
			}
			this.axiosInstance
				.request<T>(config)
				.then((res) => {
					resolve(res.data);
				})
				.catch((error) => {
					reject(error);
				})
				.finally(() => {
					if (showLoading) {
						Loading.loadingCount--;
						if (Loading.loadingCount <= 0) {
							console.log('hide Loading....');
						}
					}
				});
		});
	}
	get<T = any>(url: string, data: any): Promise<T>;
	get<T = any>(config: AxiosRequestConfig, curConfig?: RequestOptions): Promise<T>;
	get(config: string | AxiosRequestConfig, data: any = undefined) {
		let conf: AxiosRequestConfig = {};
		let options = undefined;
		if (typeof config === 'string') {
			conf.url = config;
			conf.params = data;
		} else if (isApiConfig(config)) {
			conf = {
				url: config.url,
				params: data,
			};
			options = {
				customOptions: {
					...config,
				},
			};
		} else {
			conf = config;
			if (data) {
				options = data;
			}
		}
		return this.request({ ...conf, method: 'GET' }, options);
	}
	post<T = any>(url: string, data: any): Promise<T>;
	post<T = any>(apiConfig: ApiConfig, data: any): Promise<T>;
	post<T = any>(config: AxiosRequestConfig, curConfig?: RequestOptions): Promise<T>;
	post(config: string | AxiosRequestConfig | ApiConfig, data: any = undefined) {
		let conf: AxiosRequestConfig = {};
		let options = undefined;
		if (typeof config === 'string') {
			conf.url = config;
			conf.data = data;
		} else if (isApiConfig(config)) {
			conf = {
				url: config.url,
				data: data,
			};
			options = {
				customOptions: {
					showLoading: true,
					...config,
				},
			};
		} else {
			conf = config;
			if (data) {
				options = data;
			}
		}
		return this.request({ ...conf, method: 'POST' }, options);
	}
}

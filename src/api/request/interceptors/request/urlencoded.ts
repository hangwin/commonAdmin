import { AxiosRequestConfig } from 'axios';
import { ContentType, RequestMethod } from '@/constants/httpConstants';
import qs from 'qs';
// 处理表单编码的拦截器
const handleUrlencoded = (config: AxiosRequestConfig): AxiosRequestConfig => {
	const headers = config.headers;
	const contentType = headers?.['Content-Type'] || headers?.['content-type'];
	// 如果content-type 不是 urlencode或没有data或者是get请求，则无需编码
	if (
		contentType !== ContentType.FORM_URLENCODED ||
		!config.data ||
		config.method?.toUpperCase() === RequestMethod.GET
	) {
		return config;
	}
	return { ...config, data: qs.stringify(config.data) };
};

export default handleUrlencoded;

import { AxiosRequestConfig } from 'axios';
import { ContentType, RequestMethod } from '@/constants/httpConstants';
// 处理文件上传的拦截器
const handleUploadFile = (config: AxiosRequestConfig): AxiosRequestConfig => {
	const headers = config.headers;
	const contentType = headers?.['Content-Type'] || headers?.['content-type'];
	// 如果content-type 不是 form-data或没有data或者是get请求，则无需编码
	if (
		contentType !== ContentType.FORM_DATA ||
		!config.data ||
		config.method?.toUpperCase() === RequestMethod.GET
	) {
		return config;
	}
	const formData = new FormData();
	const uploadFilename = config.data.filename || 'file';
	if (config.data.filename) {
		formData.append(uploadFilename, config.data.file, config.data.filename);
	} else {
		formData.append(uploadFilename, config.data.file);
	}
	if (config.params) {
		Object.keys(config.params).forEach((key) => {
			formData.append(key, config.params[key]);
		});
		config.params = undefined;
	}
	return {
		...config,
		data: formData,
	};
};

export default handleUploadFile;

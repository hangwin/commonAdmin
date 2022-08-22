export enum RequestMethod {
	GET = 'GET',
	POST = 'POST',
}

export enum ContentType {
	JSON = 'application/json;charset=utf-8;',
	FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=utf-8;',
	FORM_DATA = 'multipart/form-data;charset=utf-8;',
}

export enum ResponseResultCode {
	SUCCESS = '200',
	FAIL = '400',
}

export default {
	RequestMethod,
	ContentType,
	ResponseResultCode,
};

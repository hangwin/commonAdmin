export const is = (val: any, type: string) =>
	Object.prototype.toString.call(val) === `[object ${type}]`;
export const isFunction = (val: any) => typeof val === 'function';
export const isObject = (val: any) => is(val, 'Object');

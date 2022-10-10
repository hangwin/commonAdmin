export function hasClass(el: Element, cls: string) {
	if (cls.includes(' ')) {
		throw new Error('类名不能包含空格');
	}
	if (el.classList) {
		return el.classList.contains(cls);
	} else {
		return ` ${el.className} `.includes(` ${cls} `);
	}
}
export function addClass(el: Element, cls: string) {
	let curCls = el.className;
	const addCls = cls.split(' ');
	for (let i = 0; i < addCls.length; i++) {
		const addName = addCls[i];
		if (!addName) continue;
		if (el.classList) {
			el.classList.add(addName);
		} else if (!hasClass(el, addName)) {
			curCls += ' ' + addName;
		}
	}
	if (!el.classList) {
		el.className = curCls;
	}
}

export function removeClass(el: Element, cls: string) {
	let curCls = ' ' + el.className + ' ';
	const addCls = cls.split(' ');
	for (let i = 0; i < addCls.length; i++) {
		const addName = addCls[i];
		if (!addName) continue;
		if (el.classList) {
			el.classList.remove(addName);
		} else if (hasClass(el, addName)) {
			curCls = curCls.replace(` ${addName} `, ' ');
		}
	}
	if (!el.classList) {
		el.className = curCls.trim();
	}
}

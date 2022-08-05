/// <reference types="vite/client" />
// 上面是三斜线指令，用于告诉编译器在编译的过程中要引用额外的文件
// 如果是types属性，则用于声明对另一个库的依赖，如上面，则是对vite这个库下的cliend.d.ts的引用，具体可见node_modules
// 如果是path属性，则用于声明对另一个文件的依赖
// 因为这是一个全局的声明文件，所以使用了三斜线指令，如果用了import，则文件就会变成了模块声明文件了

// 下面的意思是是，全局定义一个模块，当import xxx from 'xx.vue';的方式引入模板文件的时候，编译器不会报错
// 且引入的类型是DefineComponent类型
declare module '*.vue' {
	import type { DefineComponent } from 'vue';
	const component: DefineComponent<{}, {}, any>;
	export default component;
}

// 类型声明文件具体怎么写：可参考https://ts.xcatliu.com/basics/declaration-files.html#npm-包

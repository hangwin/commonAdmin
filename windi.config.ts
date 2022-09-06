import { defineConfig } from 'vite-plugin-windicss';

export default defineConfig({
	theme: {
		extend: {
			colors: {
				pink: {
					600: 'yellow',
				},
			},
			screens: {
				sm: '576px',
				md: '768px',
				lg: '992px',
				xl: '1200px',
				'2xl': '1600px',
			},
		},
	},
	plugins: [createEnterAnimationPlugin()],
});

function genEnterXCss(index: number) {
	// 任意元素下的.enter-x类，第index个enter-x类
	const xSelector = `* > .enter-x:nth-child(${index})`;
	// 代表方向相反
	const _xSelector = `* > .-enter-x:nth-child(${index})`;
	return {
		// 开始的样式
		[xSelector]: {
			transform: 'translateX(50px)',
		},
		[_xSelector]: {
			transform: 'translateX(-50px)',
		},
		[`${xSelector}, ${_xSelector}`]: {
			opacity: '0',
			// 执行时间 0.5s 由快到慢再到快 延迟0.3s执行
			animation: 'enter-x-animation 0.5s ease-in-out',
			// 动画执行结束后停留在最终状态
			'animation-fill-mode': 'forwards',
			// 延迟执行时间
			'animation-delay': `${index / 10}s`,
		},
	};
}

/**
 * 生成元素显示动画的方法
 * @param childs 元素有多少个子元素，eg: .enter-x下有5个子元素，则会对这5个子元素应用动画
 */
function createEnterAnimationPlugin(childs = 6) {
	let enterxCss = {};
	for (let i = 1; i < childs; i++) {
		enterxCss = { ...enterxCss, ...genEnterXCss(i) };
	}
	const handler = ({ addBase }) => {
		// 通过addBase方法增加基础样式
		addBase({
			...enterxCss,
			[`@keyframes enter-x-animation`]: {
				'100%': {
					opacity: '1',
					transform: 'translateX(0)',
				},
			},
			[`* > .shake-x`]: {
				animation: 'shake-animation 0.4s ease-in-out',
				// 动画执行结束后停留在最终状态
				'animation-fill-mode': 'forwards',
			},
			[`@keyframes shake-animation`]: {
				'10%, 90%': { transform: 'translateX(-1px)' },
				'20%, 80%': { transform: 'translateX(2px)' },
				'30%, 70%': { transform: 'translateX(-4px)' },
				'40%, 60%': { transform: 'translateX(4px)' },
				'50%': { transform: 'translateX(-4px)' },
			},
		});
	};
	return {
		handler,
	};
}

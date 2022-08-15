/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const scopes = fs
	.readdirSync(path.resolve(__dirname, 'src'), { withFileTypes: true })
	.filter((dirent) => dirent.isDirectory())
	.map((dirent) => dirent.name.replace(/s$/, ''));
module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'subject-case': [0],
		'type-enum': [
			2,
			'always',
			[
				'feat',
				'fix',
				'perf',
				'style',
				'docs',
				'test',
				'refactor',
				'build',
				'ci',
				'chore',
				'revert',
				'types',
				'release',
			],
		],
	},
	prompt: {
		useEmoji: true,
		alias: {
			f: 'docs: fix typos',
			r: 'docs: update README',
			s: 'style: update code format',
			b: 'build: bump dependencies',
			c: 'chore: update config',
		},
		scopes: [...scopes, 'mock'],

		types: [
			{ value: 'feat', name: 'feat:     新增功能' },
			{ value: 'fix', name: 'fix:      修复 bug' },
			{ value: 'docs', name: 'docs:     文档变更' },
			{ value: 'style', name: 'style:    代码格式（不影响功能，例如空格、分号等格式修正）' },
			{ value: 'refactor', name: 'refactor: 代码重构（不包括 bug 修复、功能新增）' },
			{ value: 'perf', name: 'perf:     性能优化' },
			{ value: 'test', name: 'test:     添加、修改测试用例' },
			{
				value: 'build',
				name: 'build:    构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）',
			},
			{ value: 'ci', name: 'ci:       修改 CI 配置、脚本' },
			{
				value: 'chore',
				name: 'chore:    对构建过程或辅助工具和库的更改（不影响源文件、测试用例）',
			},
			{ value: 'revert', name: 'revert:   回滚 commit' },
		],
		// 交互提示信息
		messages: {
			type: '请选择提交类型：',
			scope: '请选择修改范围（可选）：',
			// 选择 scope: custom 时会出下面的提示
			customScope: '请输入修改范围（可选）：',
			subject: '请填写简要的变更描述（必填）：',
			body: '填写详细的变更描述（可选）：',
			footer: '请输入可以关闭的issue（可选）：',
			confirmCommit: '确认提交？',
		},
		// 跳过要询问的步骤
		skipQuestions: ['body', 'footer', 'footerPrefix', 'breaking'],

		// subject 限制长度
		subjectLimit: 100,
	},
};

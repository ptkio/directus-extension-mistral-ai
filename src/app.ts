import models from './models';

const config = {
	id: 'ptkio-mistral-ai',
	name: 'Mistral AI',
	icon: 'edit_note',
	description: 'Request the Mistral AI API service',
	overview: ({ model, maxTokens }) => [
		{
			label: 'Model',
			text: model ? model : models[0]?.value,
		},
		{
			label: 'Max Tokens',
			text: maxTokens ? maxTokens : '4096',
		},
	],
	options: (config) => ({
		standard: [
			{
				field: 'apiKey',
				name: 'Mistral AI API Key',
				type: 'string',
				meta: {
					required: true,
					width: 'full',
					interface: 'input',
					note: 'Go to <a href="https://mistral.ai/" target="_blank">https://mistral.ai/</a> to obtain access and create your API Key.',
				},
			},
			{
				field: 'model',
				name: 'Model',
				type: 'string',
				schema: {
					default_value: 'open-mistral-7b',
				},
				meta: {
					required: true,
					width: 'half',
					interface: 'select-dropdown',
					options: {
						choices: models,
						allowOther: false,
					},
				},
			},
			{
				field: 'maxTokens',
				name: 'Max tokens',
				type: 'integer',
				schema: {
					default_value: 4096,
				},
				meta: {
					field: 'maxTokens',
					special: null,
					interface: 'slider',
					options: {
						minValue: 1,
						maxValue: 4096,
						stepInterval: 1,
					},
					width: 'half',
				},
			},
			{
				field: 'messages',
				name: 'Messages',
				type: 'json',
				meta: {
					width: 'full',
					interface: 'list',
					note: "<strong>If you inject custom messages, you need to use this format: </strong><br>[{ role: 'user' | 'assistant', content: string }]<br><strong>In the Mistral AI system, there isn't a role system in place. If you assign a system role, it will be treated as if it were a user role instead.</strong><br>Example : <br>[{ role: 'user', content: 'my content 1' },<br>{ role: 'user', content: 'my content 2' }]",
					required: true,
					options: {
						template: '{{ role }} — {{ content }}',
						fields: [
							{
								field: 'role',
								name: 'Role',
								type: 'string',
								schema: {
									default_value: 'user',
								},
								meta: {
									interface: 'select-dropdown',
									required: true,
									options: {
										choices: [
											{
												text: 'Assistant',
												value: 'assistant',
											},
											{
												text: 'User',
												value: 'user',
											},
										],
									},
									width: 'full',
								},
							},
							{
								field: 'content',
								name: 'Message',
								type: 'string',
								meta: {
									required: true,
									interface: 'input-multiline',
									width: 'full',
								},
							},
						],
					},
				},
			},
		],
	}),
};

export default config;

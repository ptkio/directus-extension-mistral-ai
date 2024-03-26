/// <reference types="@directus/extensions/api.d.ts" />
import { log, request } from 'directus:api';

import models from './models';

type AIMessage = { role: 'user' | 'assistant'; content: string };

type HandlerFnOptions = {
	apiKey: string;
	model: string;
	maxTokens: number;
	messages: AIMessage[];
};

type SandboxOperationHandlerFn = (data: HandlerFnOptions) => any;
interface SandboxOperationConfig {
	id: string;
	handler: SandboxOperationHandlerFn;
}

const operation: SandboxOperationConfig = {
	id: 'ptkio-mistral-ai',
	handler: async ({ apiKey, model = models[0]?.value, maxTokens = 4096, messages }) => {
		// list of all messages
		let aiMessagesFormatted: AIMessage[] = [];

		// add custom messages to list of messages
		if (messages) {
			if (Array.isArray(messages)) {
				aiMessagesFormatted = [...aiMessagesFormatted, ...messages];
			} else if (typeof messages === 'string') {
				try {
					// if it's a string, try to parse json
					messages = JSON.parse(messages);
					if (Array.isArray(messages)) {
						messages.forEach((item) => {
							if (item.content && item.role) {
								aiMessagesFormatted.push({
									role: item.role,
									content: item.content,
								});
							}
						});
					}
				} catch (e) {
					throw new Error('Invalid messages. JSON.parse Error.');
				}
			}
		}

		// force role to be user or assistant (Mistral doesn't support system message)
		aiMessagesFormatted.forEach((msg) => {
			if (msg.role != 'user' && msg.role != 'assistant') {
				msg.role = 'user';
			}
		});

		try {
			log(
				JSON.stringify({
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: `Bearer ${apiKey}`,
					},
					body: JSON.stringify({
						model: model,
						maxTokens: maxTokens,
						messages: aiMessagesFormatted,
					}),
				}),
			);

			const response = await request('https://api.mistral.ai/v1/chat/completions', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: `Bearer ${apiKey}`,
				},
				body: JSON.stringify({
					model: model,
					max_tokens: maxTokens,
					messages: aiMessagesFormatted,
				}),
			});

			if (response.status !== 200) throw new Error('An error occurred when accessing Mistral AI');

			return response.data.choices[0]?.message.content;
		} catch (err) {
			log(err.message);
			throw new Error(err.message);
		}
	},
};

export default operation;

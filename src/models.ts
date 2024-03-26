type Model = {
	text: string;
	value: string;
};
const models: Model[] = [
	{
		text: 'open-mistral-7b (0.25$/1M Tokens)',
		value: 'open-mistral-7b',
	},
	{
		text: 'open-mixtral-8x7b (0.7$/1M Tokens)',
		value: 'open-mixtral-8x7b',
	},
	{
		text: 'mistral-small-latest (2$/1M Tokens)',
		value: 'mistral-small-latest',
	},
	{
		text: 'mistral-medium-latest (2.7$/1M Tokens)',
		value: 'mistral-medium-latest',
	},
	{
		text: 'mistral-large-latest (8$/1M Tokens)',
		value: 'mistral-large-latest',
	},
];
export default models;
export type { Model };

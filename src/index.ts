import type { Coin, RPCResult } from './types';
import { ofetch } from 'ofetch';

interface Env {
	RANDOM_API_KEY: string;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext) {
		const response = await ofetch<RPCResult>(
			'https://api.random.org/json-rpc/4/invoke',
			{
				method: 'POST',
				body: {
					id: 1,
					jsonrpc: '2.0',
					method: 'generateIntegers',
					params: {
						apiKey: env.RANDOM_API_KEY,
						min: 0,
						max: 1,
						n: 9,
					},
				},
			},
		);

		const sequence: Coin[] = response.result.random.data.map((bit) =>
			bit == 1 ? 'heads' : 'tails',
		);

		const heads = sequence.filter((result) => result == 'heads');
		const tails = sequence.filter((result) => result == 'tails');

		const result: Coin = heads.length >= 5 ? 'heads' : 'tails';

		return Response.json({
			result,
			heads: heads.length,
			tails: tails.length,
			sequence,
		});
	},
};

import type { Coin, RPCResult } from './types';

interface Env {
	RANDOM_API_KEY: string;
}

function reply(code: number, data: Record<string, unknown>) {
	return Response.json(data, {
		status: code,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Cache-Control': 'no-store',
		},
	});
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext) {
		const url = new URL(request.url);

		if (url.pathname != '/') {
			return reply(404, { error: 'Not Found', message: 'Not Found' });
		}

		if (request.method != 'GET') {
			return reply(405, {
				error: 'Method not allowed',
				message: 'Method not allowed',
			});
		}

		const response = await fetch(
			'https://api.random.org/json-rpc/4/invoke',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					id: 1,
					jsonrpc: '2.0',
					method: 'generateIntegers',
					params: {
						apiKey: env.RANDOM_API_KEY,
						min: 0,
						max: 1,
						n: 9,
					},
				}),
			},
		);

		if (!response.ok) {
			console.error('Error fetching random data', {
				status: response.status,
				body: await response.text(),
				headers: response.headers,
			});

			return reply(500, { error: 'Error flipping the coin' });
		}

		const data = await response.json<RPCResult>();

		const sequence: Coin[] = data.result.random.data.map((bit) =>
			bit == 1 ? 'heads' : 'tails',
		);

		const heads = sequence.filter((result) => result == 'heads');
		const tails = sequence.filter((result) => result == 'tails');

		const result: Coin = heads.length >= 5 ? 'heads' : 'tails';

		return reply(200, {
			result,
			heads: heads.length,
			tails: tails.length,
			sequence,
		});
	},
};

export type Coin = 'heads' | 'tails';

export interface RPCResult {
	jsonrpc: string;
	result: Result;
	id: number;
}

export interface Result {
	random: Random;
	bitsUsed: number;
	bitsLeft: number;
	requestsLeft: number;
	advisoryDelay: number;
}

export interface Random {
	data: number[];
	completionTime: string;
}

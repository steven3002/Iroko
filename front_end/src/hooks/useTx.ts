import { packageId } from "../lib";
// import { TransactionBlock } from '@mysten/sui.js/transactions';
import { Transaction } from '@mysten/sui/transactions';
// import { useNetworkVariable } from "./config.ts";

interface argument {
    module_name: string;
    method_name: string;
    id: string;
    data?: string;
}


interface argument_sui {
    module_name: string;
    method_name: string;
    id: string;
    data: string;
}


interface argument_ct {
    module_name: string;
    method_name: string;
    id: string;
    data: number;
    packageId: string;
}


const launchPoolPackageId = '0x19e0923529b4f7b6869210f73833f903802b1e67cbc275d3efd44f107e8b4796';

export function useTransactions(): Transactions | null {
	// const packageId = useNetworkVariable('packageId');
	return packageId ? new Transactions(packageId) : null;
}

export class Transactions {
	readonly packageId: string;

	constructor(packageId: string) {
		this.packageId = packageId;
	}

	sendTx(arg: argument): Transaction {
		const tx = new Transaction();
        
		tx.moveCall({
			target: `${packageId}::${arg.module_name}::${arg.method_name}`,
            arguments: [tx.object(arg.id), tx.pure.string(arg.data || '')]
		});

		return tx;
	}

	sendSui(arg: argument_sui): Transaction {
		const tx = new Transaction();

        const coin = tx.splitCoins(tx.gas, [arg.data]);
        
		tx.moveCall({
			target: `${launchPoolPackageId}::${arg.module_name}::${arg.method_name}`,
            arguments: [tx.object(arg.id), coin, tx.object("0x6")]
		});

		return tx;
	}

    getTx(arg: argument): Transaction {
		const tx = new Transaction();
        
		tx.moveCall({
			target: `${packageId}::${arg.module_name}::${arg.method_name}`,
            arguments: [tx.object(arg.id)]
		});

		return tx;
	}

    getCommunity(arg: argument_ct): Transaction {
		const tx = new Transaction();
        
		tx.moveCall({
			target: `${arg.packageId}::${arg.module_name}::${arg.method_name}`,
            arguments: [tx.object(arg.id), tx.pure.u64(arg.data)]
		});

		return tx;
	}

    getViewCommunity(arg: argument_ct): Transaction {
		const tx = new Transaction();
        
		tx.moveCall({
			target: `${arg.packageId}::${arg.module_name}::${arg.method_name}`,
            arguments: [tx.object(arg.id), tx.pure.u64(arg.data)]
		});

		return tx;
	}
}
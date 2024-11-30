import { packageId } from "../lib";
// import { TransactionBlock } from '@mysten/sui.js/transactions';
import { Transaction } from '@mysten/sui/transactions';

export function useTransactions(arg) {

    const tx = new Transaction();
    console.log(arg.id);
    tx.moveCall({
        target: `${packageId}::${arg.module_name}::${arg.method_name}`,
        arguments: [tx.object(arg.id), tx.pure.string(arg.data || '')],
    });

    return tx;

};
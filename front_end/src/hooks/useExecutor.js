
import { useSignAndExecuteTransaction, useSuiClient } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';

export function useExecutor() {

	const rpcurl = getFullnodeUrl("testnet");
	const client = useSuiClient({url : rpcurl});
	const {
		mutate: signAndExecute,
		status,
		isIdle,
		isPending,
		isSuccess,
		isError,
		isPaused,
	} = useSignAndExecuteTransaction();

	const _executor = ({ tx, ...options }, then) => {
		signAndExecute(
			{
				transaction: tx,
				chain: "sui:testnet"
			},
			{
				onSuccess: ({ digest }) => {
					client.waitForTransaction({ digest, ...options }).then(then);
				},

				onError: (error) => {
					console.error('Failed to execute transaction', tx, error);
				},
			},
		);
	};

	return {
		_executor,
		status,
		isIdle,
		isPending,
		isSuccess,
		isError,
		isPaused,
	};
}